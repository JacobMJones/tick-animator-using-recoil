import loadImages from './loadImages'


function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

const createBackground = (backgroundToCreate, backgroundTypes, background, startPoint) => {
  console.log('background')
  let allBackground = background



  Object.keys(backgroundToCreate).map((item, index) => {
    for (let i = 0; i < backgroundToCreate[item]; i++) {
      let s = Math.random() * 1 + (.6)

      let sq = s > 1 ? 1 : s
      //console.log(backgroundTypes, item)
      const backgroundObject = {
        images: loadImages(backgroundTypes[item].actions, backgroundTypes[item].path, console.log('po')),
        fearDistance: Math.floor(Math.random() * 280) + 200,
        actionIndex: 0,
        id: allBackground.length,
        position: {

          //  x: Math.floor(Math.random() * window.innerWidth )/500 * 1000,
          x: (Math.floor(Math.random() * (window.innerWidth/25)) * 100),
          y: (Math.floor(Math.random() * (window.innerHeight/100)) * 100)
          + (window.innerHeight * startPoint)
        },
        key: `backgroundObject-${index}-${i}`,
        //   type: backgroundTypes[item],
        xSize: 100,
        ySize: 100
      }
      allBackground.push(backgroundObject)
    }
  })
  console.log('in create back', allBackground)

  return allBackground
};

export default createBackground


// const loadImages = (actions, path) => {

//   const imageArray = actions.map((item, index) => {
//     return Array.from({ length: item.length }, (x, i) => i + 1).map((x, i) => {
//       var im = new window.Image()
//       im.src = path + actions[index].name + `/${i + 1}.png`
//       return im
//     })

//   })
//   //  setInternalCount(Math.floor(Math.random() * entity.type.actions[0].length))
//   return imageArray
// }

