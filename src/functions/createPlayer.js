
import loadImages from './loadImages'


const createPlayer = (entityTypes, playerType, id, fill) => {

  return {
    pID: id,
    canMove: true,
    behavior: 'idle',
    energy: 200,
    speed: 6,
    images: loadImages(entityTypes[playerType].actions, entityTypes[playerType].path),
    id: `player-${id}`,
    position: {
      x: 300,
      y:300
    },
    key: `player-${id}-${id}`,
    farAway: false,
    type: entityTypes[playerType],
    draggable: false,
    selected: false,
    actionIndex: 0,
    visible: false,
    xScale: 1,
    yScale: 1,
    fill: fill,
    xSize: entityTypes[playerType].xSize,
    ySize: entityTypes[playerType].ySize,
    internalCount: Math.floor(Math.random() * entityTypes[playerType].actions.length)
  }

}

const createEntities = (ents, entityTypes, playerType) => {
  let allEntities = []
  const player = createPlayer(entityTypes, playerType, allEntities.length, 'lightblue')
  allEntities.push(player)
  const player2 = createPlayer(entityTypes, playerType, allEntities.length, 'lightyellow')
  allEntities.push(player2)
  return allEntities
};
export default createEntities

