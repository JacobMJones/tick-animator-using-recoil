import React, { useEffect, useState } from "react";
import entityTypes from '../../entities/index.js'
import { useRecoilValue } from 'recoil';
import { idle, resting, moving } from '../../functions/playerBehaviors'
import {
  countState,
  joystickSensitivity
} from '../../recoil/atoms'
import createEntities from '../../functions/createEntities'
import createPlayer from '../../functions/createPlayer'
import { Stage, Layer, Image } from 'react-konva'
import Sprite from '../Sprite'
import loadImages from '../../functions/loadImages'

function Layout2() {
  const [imagesLoaded, setImagesLoaded] = useState(false)

  const count = useRecoilValue(countState)
  const joySensitivity = useRecoilValue(joystickSensitivity)
  const [ents, setEntities] = useState()
  const [player, setPlayer] = useState()
  const [background, setBackground] = useState()
  const [screenPlayer, setScreenPlayer] = useState(0)
  const [buttonPressed, setButtonPressed] = useState(false)
  const onUnload = (event) => {
    window.scroll(0, 0)
  }


  //oncomponent
  useEffect(() => {
    window.addEventListener("beforeunload", onUnload)
    !imagesLoaded && preloadImages()
    !player && setPlayer(createPlayer({ bird: 0 }, entityTypes, 'kid'))
    !ents && setEntities(createEntities({ black: 2, bird: 0 }, entityTypes, 'kid'))
    return () => {
      window.removeEventListener("beforeunload", onUnload);
    };
  }, [])
  // game loop/
  useEffect(() => {

    player && updatePlayer()
    ents && updateEnts()
  }, [count])
  let loadCount = 0
  const incrementLoadCount = () => {
    loadCount = loadCount + 1
    loadCount === 73 && setImagesLoaded(true)

  }
  const preloadImages = () => {
    Object.keys(entityTypes).map((item, index) => {
      loadImages(entityTypes[item].actions, entityTypes[item].path, incrementLoadCount)
    })
  }





  const newEntPosition = (ent, data, multiplier) => {

    let x = Math.abs(data[0].axes[0 + multiplier]) > joySensitivity
      ? data[0].axes[0 + multiplier]
      : 0

    let y = Math.abs(data[0].axes[1 + multiplier]) > joySensitivity
      ? data[0].axes[1 + multiplier]
      : 0

    x = ent.position.x + x * (ent.speed * (ent.energy / 100))
    y = ent.position.y + y * (ent.speed * (ent.energy / 100))

    return { x, y }
  }

  const newEntDirection = (ent, data, multiplier) => {
    return data[0].axes[0 + multiplier] > .4 ? -1 : data[0].axes[0 + multiplier] < -.4 ? 1 : ent.xScale
  }
  const incrementFrameAnimation = (ent) => {
    if (ent.internalCount >= ent.images[ent.actionIndex].length) {
      return ent.internalCount = 1
    } else {
      return ent.internalCount = ent.internalCount + 1
    }
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
      ent.internalCount = incrementFrameAnimation(ent)
      ent = checkInputs(ent, playerIndex)
      switch (ent.behavior) {
        case 'idle': ent = idle(ent, playerIndex)
          break;
        case 'moving': ent = moving(ent, playerIndex)
          break;
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

      //if the entity doesn't have a special situation it defaults to 0 (idle)
      ent.actionIndex = 0
      //advance the sprite image
      if (ent.internalCount >= ent.images[ent.actionIndex].length) {
        ent.internalCount = 1
      } else {
        ent.internalCount = ent.internalCount + 1
      }



      //ent.scaredOf is which player, the one at index 0 or 1 of the player array, the entity fears (runs from and can be killed/acted on by)
      //this checks the distance from that player, the other player is currently ignored
      let xDif = Math.abs(player[0].position.x - ent.position.x)
      let yDif = Math.abs(player[0].position.y - ent.position.y)
      //is the entity being hit
      if (xDif < 20 && yDif < 20) {
        ent.internalCount = 1
        ent.actionIndex = 2
        ent.energy = 0
        toDelete = index
      }

      //is the bad guy entity close enough to run away? then run.
      if (xDif < ent.fearDistance
        && yDif < ent.fearDistance
      ) {
        if (ent.energy > 20) {
          ent.actionIndex = 1
          ent.behavior = 'afraid'
          if (player[0].position.x > ent.position.x) {
            ent.position.x = ent.position.x - ent.speed
            ent.xScale = 1
          } else {
            ent.position.x = ent.position.x + ent.speed
            ent.xScale = -1
          }
          ent.position.y = player[0].position.y > ent.position.y
            ? ent.position.y = ent.position.y - ent.speed
            : ent.position.y = ent.position.y + ent.speed
          ent.internalCount = ent.actionIndex === 0 ? 1 : ent.internalCount
        }
      } else if (ent.behavior === 'moving') {

      }


      //*** nEDX */
      let xDif2 = Math.abs(player[1].position.x - ent.position.x)
      let yDif2 = Math.abs(player[1].position.y - ent.position.y)
      //is the entity being hit
      if (xDif2 < 20 && yDif2 < 20) {
        ent.internalCount = 1
        ent.actionIndex = 2
        ent.energy = 0
        toDelete = index
      }

      //is the bad guy entity close enough to run away? then run.
      if (xDif2 < ent.fearDistance
        && yDif2 < ent.fearDistance
      ) {
        if (ent.energy > 20) {
          ent.actionIndex = 1
          ent.behavior = 'afraid'
          if (player[1].position.x > ent.position.x) {
            ent.position.x = ent.position.x - ent.speed
            ent.xScale = 1
          } else {
            ent.position.x = ent.position.x + ent.speed
            ent.xScale = -1
          }
          ent.position.y = player[1].position.y > ent.position.y
            ? ent.position.y = ent.position.y - ent.speed
            : ent.position.y = ent.position.y + ent.speed
          ent.internalCount = ent.actionIndex === 0 ? 1 : ent.internalCount
        }
      }

      //entity regenerates energy from resting
      if (ent.actionIndex !== 1 && ent.energy < 100) {
        ent.energy = ent.energy + 1
      }
      //should random behavior occur
      if (ent.actionIndex === 1) {
        ent.energy = ent.energy - 1
        const rand = Math.floor(Math.random() * 100)
        if (ent.behavior !== 'moving' && rand === 8) {
          ent.movingDirection = Math.random() > .5
            ? 'left'
            : 'right'
          ent.behavior = 'moving'
        } else if (ent.behavior !== 'moving' && rand === 12) {
          ent.movingDirection = Math.random() > .5
            ? 'up'
            : 'down'
        }
        else if (ent.behavior === 'moving' && rand === 8) {
          //   console.log('moving back to idle')
          ent.behavior = rand === 8 ? 'idle' : ent.behavior
        } else if (ent.behavior === 'moving' && rand !== 8) {
          ent.actionIndex = 1

          ent.movingDirection === 'left'
            ? ent.position.x = ent.position.x - ent.speed
            : ent.position.x = ent.position.x + ent.speed
        }

        //  console.log(rand)
      }
      return ent
    })
    toDelete && p.splice(toDelete, 1)
    //check to see if anything should be deleted


    setEntities(p)
  }

  return (
    <div style={{ width: 4000, height: 4000, overflow: 'hidden' }}>
      {!imagesLoaded && <div>Loading</div>}
      {imagesLoaded && <div >
        <Stage
          width={4000}
          height={4000}
        >
          <Layer>
            {background && background.map((item, index) => {

              return <Image

                key={`background-${index}`}
                image={item.images[0][1]}
                height={item.ySize}
                width={item.xSize}
                x={item.position.x}
                y={item.position.y}
                offsetX={item.xSize / 2}
                offsetY={item.ySize / 2}

              />
            })}

            {ents && ents.map((item) => {
              return <Sprite
                key={item.key}
                entity={item}
              >
              </Sprite>
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



