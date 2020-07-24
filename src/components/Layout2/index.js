import React, { useEffect, useState, useRef } from "react";
import entityTypes from '../../entities/index.js'
import collisionHandler from '../../functions/collisionHandler'
import { useRecoilState, useRecoilValue } from 'recoil';
import {
    countState,
    entities,
} from '../../recoil/atoms'

import { Stage, Layer, Line } from 'react-konva';
import Sprite from '../Sprite2'
Object.size = function (obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

const getGamepadsData = () => navigator.getGamepads();


function Layout2() {
    const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)  

    const w = useRef(null)
    const count = useRecoilValue(countState)
    const [ents, setEntities] = useRecoilState(entities)
    const [made, setMade] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const [mousePosition, setMousePosition] = useState()
    const [direction, setDirection] = useState()
    const [draggedId, setDraggedId] = useState()

    const [windowPos, setWindowPos] = useState({x:2000, y:2000})
    const stageRef = useRef()

    const [readGamepads, setGamepads] = useState()
    const [input, setInput] = useState()
    const [player, setPlayerPosition] = useState({ x: window.innerWidth/2, y:window.innerHeight/2})

    const makeEntities = (ents) => {
        setMade(true)
        let allEntities = []

        Object.keys(ents).map((item, index) => {
            for (let i = 0; i < ents[item]; i++) {
                const entity = {
                    id: allEntities.length,
                    position: {
                        x: 2000,
                        y: 2000
                    },
                    key: `entity-${index}-${i}`,
                    farAway: false,
                    type: entityTypes[item],
                    draggable: false,
                    selected: false,
                    actionIndex: 0,
                    xScale: 1,
                    yScale: 1,
                    xSize: entityTypes[item].xSize,
                    ySize: entityTypes[item].ySize,
                    text: `Action : ${entityTypes[item].actions[0].name}`
                }
                allEntities.push(entity)
            }

        })
        console.log('make')
        setEntities(allEntities)
    };
    const onDragMove = e => {
        console.log('in drage movce')
        let items = ents.map(a => { return { ...a } });
        setEntities(items)
    };
    const updateEntity = (index, key, value) => {

        let p = ents.map(a => { return { ...a } })
        p[index][key] = value
        setEntities(p);
    }

    const updateEntityMulti = (arr) => {
        //  console.log(arr)
        let p = ents.map(a => { return { ...a } })
        let keys = Object.keys(arr[0])
        let length = Object.size(arr[0])
        // console.log(keys, length)

        for (let i = 0; i < length; i++) {
            p[0][keys[i]] = arr[0][keys[i]]
            //    console.log(i)
        }

        setEntities(p);
        //         arr.map((item, index) => {

        //           //  p[0][keys[index]]
        // //console.log(item)
        //         })

        // p[index][key] = value
        //   setEntities(p);
    }

    useEffect(() => {
        !ents && !made && makeEntities({ bird: 1 })
        handleMouseMove()
        const data = navigator.getGamepads();
        if (data && data[0]) {
            let x = data[0].axes[0] > .4 ? data[0].axes[0] : data[0].axes[0] < -.4 ? data[0].axes[0] : 0
            let y = data[0].axes[1] > .4 ? data[0].axes[1] : data[0].axes[1] < -.4 ? data[0].axes[1] : 0

            updateEntityMulti([{
                position: { x: ents[0].position.x + x * 40, y: ents[0].position.y + y * 40 },
                xScale: data[0].axes[0] > .4 ? -1 : data[0].axes[0] < -.4 ? 1 : ents[0].xScale
            }])
window.scroll(ents[0].position.x - window.innerWidth/2,ents[0].position.y - window.innerHeight/2)
        }

    }, [count])





    const handleMouseDown = (key) => {
        let items = ents.map(a => { return { ...a } }).slice();
        const item = items.find(i => i.key === key);
        const index = items.indexOf(item);
        items.splice(index, 1);
        items.push(item)
        setEntities(items)
        setIsDragging(true)
    }
    const handleMouseUp = (id) => {
        let items = ents.map(a => { return { ...a } });
        items[items.length - 1].position = {
            x: mousePosition.x,
            y: mousePosition.y,

        }
        setEntities(items)
        setIsDragging(false)
    }


    const handleDragStart = e => {
        console.log('s')
        setIsDragging(true)

    };
    const handleDragEnd = e => {
        setIsDragging(false)
        stageRef.current.container().style.cursor = 'default'
        let items = ents.map(a => { return { ...a } });
        items = items.map((i, index) => {
            i.farAway = 'return'

            return i
        })

    };



    const handleMouseMove = (e) => {

        if (e && isDragging) {

            let items = ents.map(a => { return { ...a } });
            items[items.length - 1].position = {
                x: e.clientX,
                y: e.clientY,

            }
            setEntities(items)
            if (e) {
                const x = e.clientX
                const y = e.clientY
                const pos = { x: x, y: y }
                setMousePosition(pos)
            }
        }

    }
    return (
        <div style={{ width: 4000, height:4000, overflowY: 'hidden' }}
            onMouseMove={(e) => { e && handleMouseMove(e)}}
            ref={w}
        >

            <Stage
                width={4000}
                height={4000}
                ref={stageRef}
            >
                <Layer>
                    <Line
                        y={window.innerHeight / 2}
                        points={[0, 0, 0, 0, 0, 0, 3000, 0]}
                        stroke={'red'}
                        strokeWidth={1}
                        lineCap={'round'}
                        lineJoin={'round'}>
                    </Line>
                </Layer>
                <Layer>
                    {ents && ents.map((item, index) => {
                        return <Sprite
                            handleDragStart={handleDragStart}
                            handleDragEnd={handleDragEnd}
                            handleMouseDown={handleMouseDown}
                            handleMouseUp={handleMouseUp}
                            updateEntity={updateEntity}
                            onDragMove={(e) => { onDragMove(e) }}
                            count={count}
                            entity={item}
                            draggedId={draggedId}
                            key={item.id + 'sprite'}
                        />
                    })}
                </Layer>
            </Stage>
        </div >
    );
}

export default Layout2;
