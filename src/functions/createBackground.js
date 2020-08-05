import loadImages from './loadImages'



const createBackground = (background, backgroundTypes) => {

  let allBackground = []



  Object.keys(background).map((item, index) => {
    for (let i = 0; i < background[item]; i++) {
      let s = Math.random() * 1 + (.6)

      let sq = s > 1 ? 1 : s
      //console.log(backgroundTypes, item)
      const backgroundObject = {
        images: loadImages(backgroundTypes[item].actions, backgroundTypes[item].path),
        fearDistance: Math.floor(Math.random() * 280) + 200,
        actionIndex:0,
        id: allBackground.length,
        position: {
          x: Math.floor(Math.random() * (window.innerWidth*2)),
          y: i * 100
        },
        key: `backgroundObject-${index}-${i}`,

        type: backgroundTypes[item],

        xSize: 50,
        ySize: 50,

      }

      allBackground.push(backgroundObject)
    }

  })
  console.log('in create back')
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

