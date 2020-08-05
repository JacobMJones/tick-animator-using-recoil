

import loadImages from './loadImages'



const createEntities = (ents, entityTypes, playerType) => {

  let allEntities = []


  const player = createPlayer(entityTypes, playerType, allEntities.length, 'lightblue')
  allEntities.push(player)
  const player2 = createPlayer(entityTypes, playerType, allEntities.length, 'lightyellow')

  allEntities.push(player2)
  console.log(allEntities)
  return allEntities
};

export default createEntities



const createPlayer = (entityTypes, playerType, id, fill) => {
  console.log('in create players')
  return {
    canMove: true,
    energy: 100,
    speed: 6,
    images: loadImages(entityTypes[playerType].actions, entityTypes[playerType].path),
    id: `player-${id}`,
    position: {
      x: 200,
      y: 200
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
    text: `Action : ${entityTypes[playerType].actions[0].name}`,
    internalCount: Math.floor(Math.random() * entityTypes[playerType].actions.length)
  }
  // return player
}





const cP = (entityTypes, playerType, id) => {
  console.log('in create players')
  return {
    canMove: true,
    energy: 100,
    speed: 24,
    images: loadImages(entityTypes[playerType].actions, entityTypes[playerType].path),
    id: id,
    position: {
      x: 200,
      y: 200
    },
    key: `entity-${id}-${id}`,
    farAway: false,
    type: entityTypes[playerType],
    draggable: false,
    selected: false,
    actionIndex: 0,
    visible: false,
    xScale: 1,
    yScale: 1,
    xSize: entityTypes[playerType].xSize,
    ySize: entityTypes[playerType].ySize,
    text: `Action : ${entityTypes[playerType].actions[0].name}`,
    internalCount: Math.floor(Math.random() * entityTypes[playerType].actions.length)
  }
  // return player
}



