import React, { useEffect, useState, useRef } from "react";
import { Image, Group } from 'react-konva';
import Konva from 'konva';


let imageArray;
function Sprite({
    onDragMove,
    count,
    entity,
    updateEntity,
    handleDragStart,
    handleDragEnd,
    handleMouseDown,
    handleMouseUp,
    onGround,
    draggedId }) {

    const [boundingBox, setBoundingBox] = useState()
    const [images, setImages] = useState()
    const [isDragged, setIsDragged] = useState(false)
    const [internalCount, setInternalCount] = useState(1)
    const [animationIndex, setAnimationIndex] = useState(0)

    const imageRef = useRef()

    const skyY = 500
    const loadImages = () => {
        imageArray = entity.type.actions.map((item, index) => {
            return Array.from({ length: item.length }, (x, i) => i + 1).map((x, i) => {
                var im = new window.Image()
                im.src = entity.type.path + entity.type.actions[index].name + `/${i + 1}.png`
                return im
            })

        })
        setInternalCount(Math.floor(Math.random() * entity.type.actions[0].length))
        return imageArray
    }

    useEffect(() => {
        !images && setImages(loadImages())
        if (images) {
            if (internalCount >= images[0].length) {
                images && setInternalCount(1)

            } else {
                images && setInternalCount(internalCount + 1)
            }
        }
        // console.log(entity.position)
        isDragged && entity.position.y < 450
            ? setAnimationIndex(2)
            : !isDragged
                ? setAnimationIndex(0)
                : setAnimationIndex(1)


        //    console.log(entity.position)
    }, [count, images])


    useEffect(() => {
        // entity.farAway && imageRef && imageRef.current.to({
        //     duration: .4,
        //     easing: Konva.Easings.Linear,
        //     scaleX: .6,
        //     scaleY: .6,


        // })
        // entity.farAway === 'return' && imageRef && imageRef.current.to({
        //     duration: .4,
        //     easing: Konva.Easings.Linear,
        //     scaleX: 1,
        //     scaleY: 1,


        // })
    }, [entity.farAway])
    return <>
        {images &&
            <Group>
                <Image

                    onMouseDown={() => {
                        console.log('down')
                      //  handleMouseDown(entity.key)
                    }}
                    onMouseUp={() => {
                        console.log('up')
                       // handleMouseUp(entity.key)

                    }}
                    onMouseEnter={(e) => { }}
                    // onMouseUp={(e) => { handleLanding(e) }}
                    onDragMove={(e) => {
                        console.log(entity.position)
                        //   onDragMove(e)

                    }}
                    onDragStart={(e) => {
                        // e.target.to({
                        //     duration: .2,
                        //     easing: Konva.Easings.EaseOut,
                        //   //  scaleX: entity.position.y < 450 ? 1.3 : 1,
                        //  //   scaleY: entity.position.y < 450 ? 1.3 : 1,
                        //     //shadowBlur: 100,


                        // });
                        //setAnimationIndex(2)
                  //      setIsDragged(true)
                      //  handleDragStart(e)
                    }}

                    onDragEnd={(e) => {

                   //     setIsDragged(false)
                        // e.target.to({
                        //     duration: .2,
                        //     easing: Konva.Easings.EaseIn,
                        //    // scaleX: 1,
                        //    // scaleY: 1,
                        //   //  shadowBlur: 0,
                        //    // y: 500
                        // });

                   //WS     handleDragEnd(e)
                        //   setIsDragged(false)
                        setTimeout(() => {
                            setAnimationIndex(0)

                        }, 600)

                    }}
                    onMouseOut={() => setIsDragged(false)}
                    id={entity.id}
                    ref={imageRef}
                    key={entity.key}
                    name={entity.key}
                    scaleX={entity.xScale}
                    scaleY={entity.yScale}
                    x={entity.position.x}
                    y={entity.position.y}
                    offsetX={entity.xSize / 2}
                    offsetY={entity.ySize / 2}
                    //  draggable
                    //   shadowColor={isDragged && 'black'}
                    // shadowBlur={isDragged ? 0: 1}
                    //  shadowOffset={isDragged && { x: 0, y: 64 }}
                    //  shadowOpacity={isDragged ? 0.11 : 0}
                    height={entity.ySize}
                    width={entity.xSize}
                    // height={isDragged ? entity.ySize * 1.4 : entity.ySize}
                    // width={isDragged ? entity.xSize * 1.4 : entity.xSize}
                    image={images[animationIndex][internalCount - 1]}
                />
            </Group>}
    </>


}

export default Sprite;
