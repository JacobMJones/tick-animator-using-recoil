
import loadImages from './loadImages'

const createEntities = (ents, entityTypes, playerType) => {
  let allEntities = []
  Object.keys(ents).map((item, index) => {
    for (let i = 0; i < ents[item]; i++) {
      const entity = {
        canMove: true,
        scaredOf: entityTypes[item].scaredOf,
        images: loadImages(entityTypes[item].actions, entityTypes[item].path),
        energy: 100,
        speed: entityTypes[item].speed + Math.floor(Math.random() * 3),
        fearDistance: entityTypes[item].fearDistance,
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
      allEntities.push(entity)
    }
  })
  return allEntities
};
export default createEntities

