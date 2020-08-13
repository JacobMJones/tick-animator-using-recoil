
import loadImages from './loadImages'

const createEntities = (ents, entityTypes, allEnts, sectionsMade) => {
  let allEntities = allEnts

  Object.keys(ents).map((item, index) => {
    for (let i = 0; i < ents[item]; i++) {
      const entity = {
        canMove: true,
        scaredOf: entityTypes[item].scaredOf,
        images: loadImages(entityTypes[item].actions, entityTypes[item].path),
        energy: 200,
        speed: entityTypes[item].speed + Math.floor(Math.random() * 6),
        fearDistance: entityTypes[item].fearDistance + Math.floor(Math.random() * 60),
        position: {
          x: Math.floor(Math.random() * 400)+ 400,
          y: Math.floor(Math.random() * window.innerHeight) + (sectionsMade * window.innerHeight)
        },
        socialAwareness: Math.floor(Math.random() * 100) + 3,
        key: `entity-${index + allEnts.length}-${i}`,
        farAway: false,
        type: entityTypes[item],
        fill: 'sienna',
        draggable: false,
        selected: false,
        actionIndex: 0,
        xScale: 1,
        yScale: 1,
        xSize: entityTypes[item].xSize,
        ySize: entityTypes[item].ySize,
        text: `Action : ${entityTypes[item].actions[0].name}`,
        internalCount: Math.floor(Math.random() * 12),
        behavior: 'idle',
        movingDirection: 'left'
      }
      allEntities.push(entity)
    }
  })
  return allEntities
};
export default createEntities

