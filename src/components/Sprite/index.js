import React, { useEffect } from "react";
import { Image, Group, Text } from 'react-konva';
import Konva from 'konva'
function Sprite({
  entity
}) {
  Sprite.displayName = "Sprite"

  return <Group>
    <Image
      onMouseEnter={() => { console.log(entity) }}
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
      offsetX={entity.xSize / 2}
      offsetY={entity.ySize / 2}
      height={entity.ySize}
      width={entity.xSize}
      image={entity.images[entity.actionIndex][entity.internalCount - 1]}
    />
    <Text
      x={entity.position.x - entity.xSize / 2}
      y={entity.position.y - 20 - entity.ySize / 2}
      text={`Energy: ${entity.energy} \n State: ${entity.behavior}`}
      fontSize={14} />
  </Group>
}
export default Sprite;
