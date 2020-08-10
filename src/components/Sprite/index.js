import React, { useEffect } from "react";
import { Image, Group, Text, Rect } from 'react-konva';
import Konva from 'konva'
function Sprite({
  entity
}) {
  Sprite.displayName = "Sprite"

  return <Group>
        <Rect
      onMouseEnter={() => { console.log(entity) }}
      fill={entity.fill}
      id={entity.id}
      kaleidoscopePower={200}
      key={`${entity.key}-image`}
      name={entity.key}
      scaleX={entity.xScale}
      scaleY={entity.yScale}
      filters={[Konva.Filters.Noise]}
      noise={1}
      x={entity.position.x}
      y={entity.position.y}
      offsetX={entity.xSize}
      offsetY={entity.ySize}
      height={entity.ySize}
      width={entity.xSize}
      image={entity.images[entity.actionIndex][entity.internalCount - 1]}
    />

    {/* <Text
      x={entity.position.x - entity.xSize / 2}
      y={entity.position.y + 20 - entity.ySize / 2}
      text={`x: ${entity.position.x} y: ${entity.position.y} \n Energy: ${entity.energy} \n State: ${entity.behavior}`}
      fontSize={18} /> */}
  </Group>
}
export default Sprite;
