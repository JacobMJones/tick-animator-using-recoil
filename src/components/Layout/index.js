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
let sectionsMade = -1
function Layout2() {
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const count = useRecoilValue(countState)

  const joySensitivity = useRecoilValue(joystickSensitivity)
  const [ents, setEntities] = useState([])
  const [player, setPlayer] = useState()
  const [background, setBackground] = useState([])
  const [screenPlayer, setScreenPlayer] = useState(0)
  const [buttonPressed, setButtonPressed] = useState(false)
  let loadCount = 0

  //oncomponent
  useEffect(() => {
    window.addEventListener("beforeunload", onUnload)
    !imagesLoaded && preloadImages()
    !player && setPlayer(createPlayer({ bird: 0 }, entityTypes, 'kid'))

    //**** Commented out because instead of making the world right away, make it as needed */
    //** world and ents are generated in the player update */

    //  !ents && setEntities(createEntities({ black: 60, bird: 2 }, entityTypes, 0))
   // setBackground(
  //    createBackground({ flowerRed: 1 }, backgroundTypes, background, 0))
    // )
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

  const newEntPosition = (ent, data, multiplier) => {
    let x
    let y



    x = Math.abs(data[0].axes[0 + multiplier]) > joySensitivity
      ? data[0].axes[0 + multiplier]
      : 0

    x = ent.position.x + x * (ent.speed * (ent.energy / 50))

    y = Math.abs(data[0].axes[1 + multiplier]) > joySensitivity
      ? data[0].axes[1 + multiplier]
      : 0


    y = ent.position.y + y * (ent.speed * (ent.energy / 50))









    return { x, y }
  }
  const newEntDirection = (ent, data, multiplier) => {
    return data[0].axes[0 + multiplier] > .4 ? -1 : data[0].axes[0 + multiplier] < -.4 ? 1 : ent.xScale
  }
  const checkInputs = (ent, playerIndex) => {
    const data = navigator.getGamepads();
    if (data
      && data[0]) {

      //the multiplier is used to get the correct joystick
      // 0 , 1 are x and y left joystick
      // 2 , 3 are x and y right joystick
      const multiplier = playerIndex === 0 ? 0 : 2

      if (Math.abs(data[0].axes[0 + multiplier]) > joySensitivity
        || Math.abs(data[0].axes[1 + multiplier]) > joySensitivity) {


        ent.position = newEntPosition(ent, data, multiplier)
        ent.xScale = newEntDirection(ent, data, multiplier)
        ent.behavior = 'moving'
      } else {
        ent.behavior = 'idle'
      }

      if (data[0].buttons[0].pressed && !buttonPressed) {
        setScreenPlayer(screenPlayer === 1 ? 0 : 1)
        setButtonPressed(true)
        setTimeout(() => setButtonPressed(false), 1200)
      }

    }


    return ent

    //if the a button is pressed which player the camera follows changes

  }
  const updatePlayer = () => {
    let p = player.map((ent, playerIndex) => {
      let oldX = ent.position.x
      let oldY = ent.position.y
      ent.internalCount = incrementInternalCount(ent)
      ent = checkInputs(ent, playerIndex)

      switch (ent.behavior) {
        case 'idle': ent = idle(ent, playerIndex)
          break;
        case 'moving': ent = moving(ent, playerIndex)
          break;
      }

      background && background.map((item, index) => {
        let xDif = Math.abs(ent.position.x - item.position.x)
        let yDif = Math.abs(ent.position.y - item.position.y)

        if (xDif < ent.xSize && yDif < ent.ySize) {
          if (item.position.x < ent.position.x) {
            ent.position.x = oldX
          }
          else if (item.position.x > ent.position.x) {
            ent.position.x = oldX
          }
          if (item.position.y < ent.position.y) {
            ent.position.y = oldY
          }
          else if (item.position.y > ent.position.y) {
            ent.position.y = oldY
          }
        }
      })

      //keep from going off the board
      if (ent.position.x <= 10) {
        ent.position.x = 10
      } if (ent.position.y <= 10) {
        ent.position.y = 10
      }

      //check if new shit needs to be made
      if (ent.position.y > (window.innerHeight / 2) + (sectionsMade * window.innerHeight)) {
        console.log('make somethin')
        sectionsMade = sectionsMade + 1
        createBackground({ flowerRed: 23 }, backgroundTypes, background, sectionsMade)
        setEntities(createEntities({ black: 12, bird: 2 }, entityTypes, ents, sectionsMade))
      }
      return ent
    })

    window.scroll(p[screenPlayer].position.x - window.innerWidth / 2, p[screenPlayer].position.y - window.innerHeight / 2)

    setPlayer(p)
  }
  const updateEnts = () => {
    let toDelete;
    let p = ents.map(a => { return { ...a } })

    p.map((ent, index) => {

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
        // console.log(rand)
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


      }



      //keeps ent from going off screen
      if (ent.position.x <= 10) {
        ent.behavior = 'moving'
        ent.movingDirection = 'right'
      } if (ent.position.y <= 10) {
        ent.position.y = 10
      }

      //check background collisions
      background && background.map((item, index) => {
        let xDif = Math.abs(ent.position.x - item.position.x)
        let yDif = Math.abs(ent.position.y - item.position.y)

        if (xDif < item.xSize / 2 && yDif < item.ySize / 2) {
          //  console.log('you close dog')
          if (xDif > yDif) {

            //  console.log(item.position.x, ent.position.x)
            if (item.position.x < ent.position.x) {
              ent.position.x = item.position.x + item.xSize / 2

              //       console.log('right')
            }
            else if (item.position.x + item.xSize / 2 > ent.position.x) {
              ent.position.x = item.position.x - item.xSize / 2
              //      console.log('left')
            }

          } else {
            if (item.position.y < ent.position.y) {
              ent.position.y = item.position.y + item.ySize / 2
              //     console.log('right')
            }
            else if (item.position.y + item.ySize / 2 > ent.position.y) {
              ent.position.y = item.position.y - item.ySize / 2
              //     console.log('left')
            }
          }


        }
        // console.log(xDif, yDif)
      })

      //check other ent collisions
      count % ent.socialAwareness === 0 && ents.map((item, i) => {
        //console.log(item.key, ent.key)
        if (item.key !== ent.key) {

          let xDif = Math.abs(ent.position.x - item.position.x)
          let yDif = Math.abs(ent.position.y - item.position.y)

          //  console.log(xDif)

          if (xDif < 100 && yDif < 100) {
            console.log('you close dog')
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
              ent.xScale = 1
            } else {
              ent.position.x = ent.position.x + ent.speed
              ent.movingDirection = 'right'
              ent.xScale = -1
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
                return <Rect
                  onMouseEnter={() => { console.log(item) }}
                  key={`background-${index}`}
                  image={item.images[0][1]}
                  height={item.ySize}
                  width={item.xSize}
                  x={item.position.x}
                  fill={'green'}
                  y={item.position.y}
                  offsetX={item.xSize / 2}
                  offsetY={item.ySize / 2}

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



