import React, { useEffect, useState } from "react";
import entityTypes from '../../entities/index.js'
import { useRecoilValue } from 'recoil';
import {
  countState,
  joystickSensitivity
} from '../../recoil/atoms'
import createEntities from '../../functions/createEntities'
import createPlayer from '../../functions/createPlayer'
import { Stage, Layer, Image} from 'react-konva';
import Sprite from '../Sprite'




function Layout2() {

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
    !player && setPlayer(createPlayer({ bird: 0 }, entityTypes, 'kid'))
    !ents && setEntities(createEntities({ black: 3, bird: 12 }, entityTypes, 'kid'))
    return () => {
      window.removeEventListener("beforeunload", onUnload);
    };
  }, [])
  // game loop/
  useEffect(() => {
    player && updatePlayer()
    ents && updateEnts()
  }, [count])

  const updatePlayer = () => {

    const data = navigator.getGamepads();

    //there are two players
    let p = player.map((ent, index) => {


      //advance the sprite image
      if (ent.internalCount >= ent.images[ent.actionIndex].length) {
        ent.internalCount = 1
      } else {
        ent.internalCount = ent.internalCount + 1
      }


      if (ent.energy > 10) {
        //check controller input
        if (data
          && data[0]) {

          //the multiplier is used to get the correct joystick
          // 0 , 1 are x and y left joystick
          // 2 , 3 are x and y right joystick
          const multiplier = index === 0 ? 0 : 2

          if (Math.abs(data[0].axes[0 + multiplier]) > joySensitivity
            || Math.abs(data[0].axes[1 + multiplier]) > joySensitivity) {

            let x = Math.abs(data[0].axes[0 + multiplier]) > joySensitivity
              ? data[0].axes[0 + multiplier]
              : 0

            let y = Math.abs(data[0].axes[1 + multiplier]) > joySensitivity
              ? data[0].axes[1 + multiplier]
              : 0

            x = ent.position.x + x * ent.speed
            y = ent.position.y + y * ent.speed

            ent.position = { x, y }
            ent.actionIndex = 1
          } else {
            ent.actionIndex = 0
          }

          //xScale is used to flip the image horizontally so it is facing the direction it is moving
          ent.xScale = data[0].axes[0 + multiplier] > .4 ? -1 : data[0].axes[0 + multiplier] < -.4 ? 1 : ent.xScale

          //if the a button is pressed which player the camera follows changes
          if (data[0].buttons[0].pressed && !buttonPressed) {
            setScreenPlayer(screenPlayer === 1 ? 0 : 1)
            setButtonPressed(true)
            setTimeout(() => setButtonPressed(false), 1200)
          }
        }
      }
      //player regenerates energy from resting
      if (ent.actionIndex === 0 && ent.energy < 100) {
        ent.energy = ent.energy + 1
      }

      //this shows the distance between the player and the entities
      let p = ents.map(a => { return { ...a } })
      p.map((item, index) => {
        let xDif = Math.abs(ent.position.x - item.position.x)
        let yDif = Math.abs(ent.position.y - item.position.y)
        if (xDif < 20 && yDif < 20) {
          console.log(item.scaredOf)
        }
      })
      return ent
    })
    window.scroll(p[screenPlayer].position.x - window.innerWidth / 2, p[screenPlayer].position.y - window.innerHeight / 2)
    setPlayer(p)
  }
  const updateEnts = () => {

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
      let xDif = Math.abs(player[ent.scaredOf].position.x - ent.position.x)
      let yDif = Math.abs(player[ent.scaredOf].position.y - ent.position.y)

      //is the entity being hit
      if (xDif < 20 && yDif < 20) {
        ent.internalCount = 1
        ent.actionIndex = 2
        ent.energy = 0
      }

      //is the entity close enough to run away? then run.
      if (xDif < ent.fearDistance
        && yDif < ent.fearDistance
      ) {
        if (ent.energy > 20) {
          ent.actionIndex = 1
          if (player[ent.scaredOf].position.x > ent.position.x) {
            ent.position.x = ent.position.x - ent.speed
            ent.xScale = 1
          } else {
            ent.position.x = ent.position.x + ent.speed
            ent.xScale = -1
          }
          ent.position.y = player[ent.scaredOf].position.y > ent.position.y
            ? ent.position.y = ent.position.y - ent.speed
            : ent.position.y = ent.position.y + ent.speed
          ent.internalCount = ent.actionIndex === 0 ? 1 : ent.internalCount
        }
      }

      //entity regenerates energy from resting
      if (ent.actionIndex !== 1 && ent.energy < 100) {
        ent.energy = ent.energy + 1
      }
      return ent
    })
    setEntities(p)
  }

  return (
    <div style={{ width: 4000, height: 4000, overflow: 'hidden' }}>
      <div >
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
                key={`sprite-${item.id}`}
                entity={item}
              >
              </Sprite>
            })
            }

            {player && player.map((item) => {
              //  console.log(item)
              return <Sprite
                key={`sprite-${item.id}`}
                entity={item}
              >
              </Sprite>
            })
            }
          </Layer>
        </Stage>
      </div >
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



    //   setBackground(createBackground({ flowerRed: 1 }, backgroundTypes))
    //  makeBackground()
    //import backgroundTypes from '../../backgroundObjects/index.js'
   // import createBackground from '../../functions/createBackground'
