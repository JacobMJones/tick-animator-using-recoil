const backgroundTypes = {


  flowerRed: {
    actions: [
      { id: 1, name: 'idle', length: 2 }
    ],
    path: process.env.PUBLIC_URL + '/images/flowerRed/',
    totalImageCount: 1,
    xSize: 100,
    ySize: 100,
    blocking: false
  },
  birdDead: {
    actions: [
      { id: 1, name: 'idle', length: 2 }
    ],
    path: process.env.PUBLIC_URL + '/images/birdDead/',
    totalImageCount: 1,
    xSize: 100,
    ySize: 100,
    blocking: true
  }
}

export default backgroundTypes
