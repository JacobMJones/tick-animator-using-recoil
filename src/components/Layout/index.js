import React, { useEffect, useState, useRef } from "react";
import entityTypes from '../../entities/index.js'
import collisionHandler from '../../functions/collisionHandler'
import { useRecoilState, useRecoilValue } from 'recoil';
import {
    playerPosition,
    playerDirection,
    playerAnim,
    countState,
    entities,
    focusedEntity,
    mousePosition
} from '../../recoil/atoms'

import { Stage, Layer } from 'react-konva';
import Sprite from '../Sprite'


function Layout() {

    const count = useRecoilValue(countState)
    const [ents, setEntities] = useRecoilState(entities)
    const [made, setMade] = useState(false)



    const makeEntities = (ents) => {
        setMade(true)
        let allEntities = []
        Object.keys(ents).map((item, index) => {
            for (let i = 0; i < ents[item]; i++) {
                const entity = {
                    id: allEntities.length,
                    position: {
                        x: Math.floor(Math.random() * window.innerWidth / 10),
                        y: Math.floor(Math.random() * window.innerHeight / 10)
                    },
                    key: `entity-${index}-${i}`,

                    type: entityTypes[item],
                    draggable: false,
                    selected: false,
                    actionIndex: 0,
                    xSize: entityTypes[item].xSize,
                    ySize: entityTypes[item].ySize,
                    text: `Action : ${entityTypes[item].actions[0].name}`
                }
                allEntities.push(entity)
            }

        })
        console.log(allEntities, typeof allEntities)
        setEntities(allEntities)
    }

    const updateEntity = (index, key, value) => {
        console.log(index, key, value)
        let p = ents.map(a => { return { ...a } })
        p[index][key] = value
        setEntities(p);
    }





    useEffect(() => {
        !ents && !made && makeEntities({ bird: 1, caterpillar: 1 })
        //     ents && collisionHandler()
    }, [count])

    const handleDragStart = e => {
        console.log('handleDragStart', e)
        const id = e.target.id();
        const items = ents.map(a => { return { ...a } }).slice();
        const item = items.find(i => i.id === id);
        const index = items.indexOf(item);

        console.log(item)

        items.splice(index, 1);

        items.push(item);
        setEntities(items)
    };

    
    const h = e => {
      const id = e.target.id();
        // const items = ents.map(a => { return { ...a } }).slice();
        // const item = items.find(i => i.id === id);



    };

    const handleDragEnd = e => {
        console.log('handleDragStart', e)
        const id = e.target.id();
        const items = ents.map(a => { return { ...a } });
        const item = items[id]

        items[id] = {
            ...item,
            x: e.target.x(),
            y: e.target.y()
        };
        setEntities(items)
    };


    return (
        <Stage width={window.innerWidth} height={window.innerHeight}>
            <Layer

                onDragStart={(e) => {
                    //     var id = e.target.name();
                    //   console.log(id)
                    //   var targetRect = e.target.getClientRect();
                    // console.log(targetRect)
                    //  console.log(target.attrs.id, ents[target.attrs.id].type.actions[ents[target.attrs.id].actionIndex].name)
                    //    updateEntity(target.attrs.id, 'position', e.target._lastPos)
                    //   updateEntity(target.attrs.id, 'selected', false)
                    // shiftEntityToFront(e.target.attrs.id)
                }}
                onDragEnd={(e) => {
                    //     var target = e.target;
                    //    var targetRect = e.target.getClientRect();
                    //   console.log(targetRect)

                    //    updateEntity(target.attrs.id, 'position', e.target._lastPos)
                    //   updateEntity(target.attrs.id, 'selected', false)

                }}
                onDragMove={(e) => {
                    //     const target = e.target;

                    //shows entity state
                    //    console.log(target.attrs.id, ents[target.attrs.id].type.actions[ents[target.attrs.id].actionIndex].name)
                    //      updateEntity(target.attrs.id, 'position', target._lastPos)
                }}
            >

                {ents && ents.map((item, index) => {

                    return <Sprite
                        key={`sprite-${index}`}
                        ents={ents}
                        h={h}
                        handleDragStart={handleDragStart}
                        
                        handleDragEnd={handleDragEnd}
                        count={count}
                        entity={item}
                        updateEntity={updateEntity}
                    />
                })}

            </Layer>
        </Stage>

    );


}


export default Layout;



// var swapArrayElements = function (arr, indexA, indexB) {
//     var temp = arr[indexA];
//     arr[indexA] = arr[indexB];
//     arr[indexB] = temp;
// };