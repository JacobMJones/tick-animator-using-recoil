
import loadImages from './loadImages'



const createEntities = (ents, entityTypes, playerType) => {

  let allEntities = []

  Object.keys(ents).map((item, index) => {
    for (let i = 0; i < ents[item]; i++) {
      let s = Math.random() * 1 + (.6)


      let sq = s > 1 ? 1 : s

      const entity = {
        canMove: true,
        scaredOf: entityTypes[item].scaredOf,
        images: loadImages(entityTypes[item].actions, entityTypes[item].path),
        energy: 100,
        speed: entityTypes[item].speed + Math.floor(Math.random() * 3),
        fearDistance: entityTypes[item].fearDistance,
        //id: allEntities.length,
        position: {
          x: Math.floor(Math.random() * (window.innerWidth)),
          y: Math.floor(Math.random() * (window.innerHeight))
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
        text: `Action : ${entityTypes[item].actions[0].name}`,
        internalCount: Math.floor(Math.random() * 12),
        behavior: 'idle'
      }

      // console.log(entity)
      allEntities.push(entity)
    }

  })
  /// const player = createPlayer(entityTypes, playerType, allEntities.length)

  //allEntities.push(player)
  console.log(allEntities)
  return allEntities
};

export default createEntities



const createPlayer = (entityTypes, playerType, id) => {
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



