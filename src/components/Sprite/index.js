import React, {useEffect} from "react";
import { Image, Group, Filter } from 'react-konva';
import Konva from 'konva'
function Sprite({
  entity
}) {
 Sprite.displayName = "Sprite"
  // const imageRef = useRef()

//console.log(entity)



  return <Group>
    <Image
      onMouseEnter={()=>{console.log(entity)}}
//fill = 'lightblue'
      id={entity.id}
      kaleidoscopePower={200}
      // ref={imageRef}
      key={`${entity.key}-image`}
      name={entity.key}
      scaleX={entity.xScale}
      scaleY={entity.yScale}
    //  fill={entity.fill}
    filters={[Konva.Filters.Noise]}
    noise={1}
      x={entity.position.x}
      y={entity.position.y}
      offsetX={entity.xSize / 2}
      offsetY={entity.ySize / 2}
      height={entity.ySize}
      width={entity.xSize}
      image={entity.images[entity.actionIndex][entity.internalCount - 1]}
    />
  </Group>
}
export default Sprite;
