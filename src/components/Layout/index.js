import React, { useEffect, useState } from "react";
import entityTypes from '../../entities/index.js'
import backgroundTypes from '../../backgroundObjects/index.js'
import { useRecoilValue } from 'recoil';
import { idle, resting, moving } from '../../functions/playerBehaviors'
import {
  countState,
  joystickSensitivity
} from '../../recoil/atoms'
import { incrementInternalCount } from '../../functions/incrementInternalCount'
import createEntities from '../../functions/createEntities'
import createPlayer from '../../functions/createPlayer'
import createBackground from '../../functions/createBackground'
import { Stage, Layer, Image, Rect } from 'react-konva'
import Sprite from '../Sprite'
import loadImages from '../../functions/loadImages'
import collisionHandler from '../../functions/collisionHandler'
let sectionsMade = 1
let canSetScreenPlayer = true
const sticks = ['leftStick', 'rightStick']
function Layout2() {
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const count = useRecoilValue(countState)

  const joySensitivity = useRecoilValue(joystickSensitivity)
  const [ents, setEntities] = useState()
  const [player, setPlayer] = useState()
  const [background, setBackground] = useState([])
  const [screenPlayer, setScreenPlayer] = useState(0)
  const [buttonPressed, setButtonPressed] = useState(false)
  let loadCount = 0

  //let screenPlayer = 0
  //oncomponent
  useEffect(() => {
    window.addEventListener("beforeunload", onUnload)
    !imagesLoaded && preloadImages()

    //!ents && setEntities(createEntities({ black: 12, bird: 2 }, entityTypes, ents, sectionsMade))
    !player && setPlayer(createPlayer({ bird: 0 }, entityTypes, 'kid'))
    //**** Commented out because instead of making the world right away, make it assneeded */
    //** world and ents are generated in the player update */

    !ents && setEntities(createEntities({ black: 20 }, entityTypes, [], 0))

    // !ents && setEntities(createEntities({ black: 60, bird: 2 }, entityTypes, 0))
    setBackground(
      createBackground({ flowerRed: 22 }, backgroundTypes, background, 0))
    //  sectionsMade = 2

    return () => {
      window.removeEventListener("beforeunload", onUnload);
    };
  }, [])
  // game loop/
  useEffect(() => {
    player && updatePlayer()
     ents && updateEnts()


  }, [count])

  const incrementLoadCount = () => {
    loadCount = loadCount + 1
    loadCount === 73 && setImagesLoaded(true)
  }
  const preloadImages = () => {
    Object.keys(entityTypes).map((item, index) => {
      loadImages(entityTypes[item].actions, entityTypes[item].path, incrementLoadCount)
    })
  }
  const onUnload = (event) => {
    window.scroll(0, 0)
  }

  const checkInputs = (ent, playerIndex) => {
    let controllerInput = {}
    let leftStick = {}
    let rightStick = {}
    let aButton = {}

    const data = navigator.getGamepads();
    if (data
      && data[0]) {
      //left stick
      if (Math.abs(data[0].axes[0]) > joySensitivity
        || Math.abs(data[0].axes[1]) > joySensitivity) {
        leftStick.x = data[0].axes[0]
        leftStick.y = data[0].axes[1]
      }
      //right stick
      if (Math.abs(data[0].axes[2]) > joySensitivity
        || Math.abs(data[0].axes[3]) > joySensitivity) {
        rightStick.x = data[0].axes[2]
        rightStick.y = data[0].axes[3]

      }
      //A Button
      if (data[0].buttons[0].pressed && !buttonPressed) {
        aButton.pressed = true
      }
    }


    return {
      leftStick,
      rightStick,
      aButton
    }

    //if the a button is pressed which player the camera follows changes

  }
  const up = (setScreenPlayer, screenPlayer, canSetScreenPlayer, player) => {

  }
  const playerCheckBackgroundHits = (e, controllerX, controllerY) => {
    let temp = e
    temp.position = e && {
      x: e.position.x + controllerX * (e.speed * (e.energy / 50))
      , y: e.position.y + controllerY * (e.speed * (e.energy / 50))
    }
    let col = temp && collisionHandler(temp, background)
    if (!col) {
      e.position = temp.position
    } else {

      col.map((item, index) => {
        if (item.xIntersection.xDif < item.yIntersection.yDif) {

          e.position.x = item.item.position && item.xIntersection.xSide === 'left'
            ? item.item.position.x
            : item.xIntersection.xSide === 'right'
              ? item.item.position.x + item.item.xSize + e.xSize
              : item.item.position.x
        }
        else {
          console.log('y')
          e.position.y = item.item.position && item.yIntersection.ySide === 'top'
            ? item.item.position.y
            : item.yIntersection.ySide === 'bottom'
              ? item.item.position.y + item.item.ySize + e.ySize
              : item.item.position.y
        }
      })
    }
    return e
  }

  const updatePlayer = () => {
    const controllerInput = checkInputs()
    // player[0].position.x !== undefined && console.log(player)
    if (controllerInput.aButton.pressed) {
      if (canSetScreenPlayer) {
        setScreenPlayer(screenPlayer === 0 ? 1 : 0)
        canSetScreenPlayer = false
        setTimeout(() => { canSetScreenPlayer = true }, 200)
      }
    }
    let p = player.map((ent, playerIndex) => {
      ent.internalCount = incrementInternalCount(ent)
      switch (ent.behavior) {
        case 'idle': ent = idle(ent, playerIndex)
          break;
        case 'moving': ent = moving(ent, playerIndex)
          break;
      }
      //...make into a single function...
      if (controllerInput[sticks[playerIndex]].x && playerIndex === 0) {
        ent = playerCheckBackgroundHits(ent, controllerInput.leftStick.x, controllerInput.leftStick.y)
      }
      else if (controllerInput[sticks[playerIndex]].x && playerIndex === 1) {
        ent = playerCheckBackgroundHits(ent, controllerInput.rightStick.x, controllerInput.rightStick.y)
      }
      //   check if new shit needs to be made
      if (ent.position.y > (window.innerHeight / 2) + (sectionsMade * window.innerHeight)) {
        sectionsMade = sectionsMade + 1
        setBackground(createBackground({ flowerRed: 40 }, backgroundTypes, background, sectionsMade))
        sectionsMade > 1 && setEntities(createEntities({ bird: 5 }, entityTypes, ents, sectionsMade))
      }

      return ent
    })
    window.scroll(p[screenPlayer].position.x - window.innerWidth / 2, p[screenPlayer].position.y - window.innerHeight / 2)
    setPlayer(p)
  }

  const updateEnts = () => {
    let toDelete;
    let p = ents.map(a => { return { ...a } })

    p.map(ent => {
      ent.internalCount = incrementInternalCount(ent)
      if (ent.behavior === 'idle') {
        if (ent.energy < 200) {
          ent.energy = ent.energy + 1
        }
        ent.actionIndex = 0

        //should the ent randomly move
        const rand = Math.floor(Math.random() * 20)
        if (rand === 1666 && ent.energy >= 20) {
          ent.movingDirection = Math.random() > .5
            ? 'left'
            : 'right'
          ent.behavior = 'moving'
        } else if (rand === 2) {
          ent.movingDirection = Math.random() > .5
            ? 'up'
            : 'down'
          ent.behavior = 'moving'
        }
      }

      else if (ent.behavior === 'moving') {
        ent.actionIndex = 1
        // ent.energy = ent.energy - 1
        const rand = Math.floor(Math.random() * 10)
        if (rand === 1) {
          ent.behavior = 'idle'
          ent.actionIndex = 0
        }
        if (ent.energy < 20) {
          ent.energy = 0
          ent.behavior = 'idle'
        }
        switch (ent.movingDirection) {
          case 'left': ent.position.x = ent.position.x - ent.speed

            break;
          case 'right': ent.position.x = ent.position.x + ent.speed
            break;
          case 'up': ent.position.y = ent.position.y - ent.speed
            break;
          case 'down': ent.position.y = ent.position.y + ent.speed
            break;
        }


        //keeps ent from going off screen
        if (ent.position.x <= 10) {
          ent.behavior = 'moving'
          ent.movingDirection = 'right'
        } if (ent.position.y <= 10) {
          ent.position.y = 10
        }

      }
      let col = collisionHandler(ent, background)
      if (!col) {
        ent.position = ent.position
      } else {

        col.map((item, index) => {
          if (item.xIntersection.xDif < item.yIntersection.yDif) {
            ent.position.x = item.item.position && item.xIntersection.xSide === 'left'
              ? item.item.position.x
              : item.xIntersection.xSide === 'right'
                ? item.item.position.x + item.item.xSize + ent.xSize
                : item.item.position.x
          }
          else {
            ent.position.y = item.item.position && item.yIntersection.ySide === 'top'
              ? item.item.position.y
              : item.yIntersection.ySide === 'bottom'
                ? item.item.position.y + item.item.ySize + ent.ySize
                : item.item.position.y
          }
        })
      }

      //check other ent collisions
      count % ent.socialAwareness === 0 && ents.map((item, i) => {
        //console.log(item.key, ent.key)
        if (item.key !== ent.key) {

          let xDif = Math.abs(ent.position.x - item.position.x)
          let yDif = Math.abs(ent.position.y - item.position.y)

          //  console.log(xDif)

          if (xDif < 100 && yDif < 100) {

            ent.behavior = 'moving'
            if (xDif > yDif) {

              //console.log(item.position.x, ent.position.x)
              if (item.position.x + item.xSize / 2 < ent.position.x + item.xSize / 2) {
                // ent.position.x = ent.position.x + 2

                ent.movingDirection = 'right'
                //     console.log('right')
              }
              else if (item.position.x + item.xSize / 2 > ent.position.x) {
                ent.movingDirection = 'left'
                // ent.position.x = item.position.x - item.xSize / 2
                //  ent.position.x = ent.position.x - 2
                //    console.log('left')
              }

            } else {
              if (item.position.y < ent.position.y) {
                ent.movingDirection = 'down'
                //     console.log('right')
              }
              else if (item.position.y + item.ySize / 2 > ent.position.y) {
                ent.movingDirection = 'up'
                //   ent.position.y = item.position.y - item.ySize / 2
                //     console.log('left')
              }
            }


          }
        }

      })

      //check proximity to players
      let xDif = Math.abs(player[0].position.x - ent.position.x)
      let yDif = Math.abs(player[0].position.y - ent.position.y)
      let xDif2 = Math.abs(player[1].position.x - ent.position.x)
      let yDif2 = Math.abs(player[1].position.y - ent.position.y)
      let closestPlayerIndex = xDif + yDif > xDif2 + yDif2 ? 1 : 0
      let xDif1 = Math.abs(player[closestPlayerIndex].position.x - ent.position.x)
      let yDif1 = Math.abs(player[closestPlayerIndex].position.y - ent.position.y)

      // Is closest player hitting the entity
      if (xDif1 < 20 && yDif1 < 20) {
        ent.internalCount = 1
        ent.actionIndex = 2
        ent.energy = 0
        // toDelete = index
        ent.behavior = 'subdued'
      }
      //Is the closest player close enough to scare the entity.
      if (xDif1 < ent.fearDistance
        && yDif1 < ent.fearDistance
      ) {
        if (ent.energy > 20) {
          ent.fearDistance = ent.fearDistance + 1
          ent.behavior = 'moving'
          if (Math.abs((xDif + yDif) - (xDif2 + yDif2)) > 20) {

            if (player[closestPlayerIndex].position.x > ent.position.x) {
              ent.position.x = ent.position.x - ent.speed
              ent.movingDirection = 'left'
              //    ent.xScale = 1
            } else {
              ent.position.x = ent.position.x + ent.speed
              ent.movingDirection = 'right'
              //    ent.xScale = -1
            }

            if (player[closestPlayerIndex].position.y > ent.position.y) {
              ent.position.y = ent.position.y - ent.speed
              ent.movingDirection = 'up'

            } else {
              ent.position.y = ent.position.y + ent.speed
              ent.movingDirection = 'down'

            }

          }
          else {
            ent.behavior = 'moving'
            //  make the escape from being between two players smoother
            if (Math.abs(player[0].position.x - player[1].position.x) <= Math.abs(player[0].position.y - player[1].position.y)) {
              // console.log('escape x')
              if (Math.abs(player[0].position.x - ent.position.x) > Math.abs(player[1].position.x - ent.position.x)) {
                //   console.log('player 0 closer')
                ent.position.x = ent.position.x > player[0].position.x ? ent.position.x + ent.speed * 3 : ent.position.x - ent.speed * 2
                // ent.movingDirection = ent.position.x > player[0].position.x ? 'left' : 'right'

              } else {
                //    console.log('player 1 closer')
                ent.position.x = ent.position.x > player[1].position.x ? ent.position.x + ent.speed * 3 : ent.position.x - ent.speed * 2
                // ent.movingDirection = ent.position.x > player[1].position.x ? 'left' : 'right'
              }

            }
            else {
              //  console.log('escape y')
              if (Math.abs(player[0].position.y - ent.position.y) > Math.abs(player[1].position.y - ent.position.y)) {
                //   console.log('player 0 closer')
                ent.position.y = ent.position.y > player[0].position.y ? ent.position.y + ent.speed * 2 : ent.position.y - ent.speed * 2
                //  ent.movingDirection = ent.position.x > player[0].position.x ? 'left' : 'right'

              } else {
                //  console.log('player 1 closer')
                ent.position.y = ent.position.y > player[1].position.y ? ent.position.y + ent.speed * 2 : ent.position.y - ent.speed * 2
              }
            }
          }


        }
      }
      return ent
    })
    toDelete && p.splice(toDelete, 1)
    setEntities(p)
  }
  return (
    <div style={{ width: 4000, height: window.innerHeight * (sectionsMade + 1), overflow: 'hidden' }}>
      {!imagesLoaded && <div>Loading</div>}
      {imagesLoaded && <div >
        <Stage
          width={4000}
          height={window.innerHeight * (sectionsMade + 1)}
        >
          <Layer>
            {background && background.map((item, index) => {

              //only render if close to player
              let yDif = Math.abs(player[0].position.y - item.position.y)
              let xDif = Math.abs(player[0].position.x - item.position.x)
              let yDif2 = Math.abs(player[1].position.y - item.position.y)
              let xDif2 = Math.abs(player[1].position.x - item.position.x)
              if ((yDif < window.innerHeight * .6 && xDif < window.innerWidth * .6)
                || (yDif2 < window.innerHeight * .6 && xDif2 < window.innerWidth * .6)) {
                return <Image
                  onMouseEnter={() => { console.log(item) }}
                  key={`background-${index}`}
                  image={item.images[0][1]}
                  height={item.ySize}
                  width={item.xSize}
                  x={item.position.x}
                  // fill={'green'}
                  y={item.position.y}
                //     offsetX={item.xSize / 2}
                // offsetY={item.ySize / 2}

                />
              }

            })}

            {ents && ents.map((item) => {
              //only render if close to player
              let yDif = Math.abs(player[0].position.y - item.position.y)
              let xDif = Math.abs(player[0].position.x - item.position.x)
              let yDif2 = Math.abs(player[1].position.y - item.position.y)
              let xDif2 = Math.abs(player[1].position.x - item.position.x)
              if ((yDif < window.innerHeight * .7 && xDif < window.innerWidth * .65)
                || (yDif2 < window.innerHeight * .65 && xDif2 < window.innerWidth * .65)) {
                return <Sprite
                  key={item.key}
                  entity={item}
                >
                </Sprite>
              }
            })
            }

            {player && player.map((item) => {
              //  console.log(item)
              return <Sprite
                key={item.key}
                entity={item}
              >
              </Sprite>
            })
            }
          </Layer>
        </Stage>
      </div>}

    </div>
  );
}

export default Layout2;






Object.size = function (obj) {
  var size = 0, key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};
Number.prototype.clamp = function (min, max) {
  return Math.min(Math.max(this, min), max);
};



