const entityTypes = {
  bird: {
    actions: [
      { id: 1, name: 'idle', length: 8 },
      { id: 2, name: 'walking', length: 8 },
      { id: 3, name: 'subdued', length: 2 }
    ],
    clickable: true,
    path: process.env.PUBLIC_URL + '/images/bird/',
    totalImageCount: 18,
    xSize: 100,
    ySize: 100,
    speed: 2,
    fearDistance: 200,
    scaredOf: 1
  },
  black: {
    scaredOf: 0,
    actions: [
      { id: 1, name: 'idle', length: 12 },
      { id: 2, name: 'walking', length: 12 },
      { id: 3, name: 'subdued', length: 3 }
    ],
    clickable: true,
    path: process.env.PUBLIC_URL + '/images/black/',
    totalImageCount: 27,
    xSize: 100,
    ySize: 100,
    speed: 5,
    fearDistance: 200
  },
  kid: {
    scaredOf: 'adult',
    actions: [
      { id: 1, name: 'idle', length: 12 },
      { id: 1, name: 'walking', length: 12 },
      { id: 1, name: 'sitting', length: 4 }
    ],
    clickable: true,
    path: process.env.PUBLIC_URL + '/images/kid/',
    totalImageCount: 28,
    xSize: 100,
    ySize: 100
  }
}

export default entityTypes
