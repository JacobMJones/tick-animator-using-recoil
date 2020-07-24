import { atom } from "recoil";

export const countState = atom({
  key: "countState",
  default: 0,
});

export const currentlyPlaying = atom({
  key: "animationState",
  default: ''
})

export const loopLength = atom({
  key:"loopLength",
  default:10
})

export const animationSpeed = atom({
  key:"animationSpeed",
  default:12
})

export const switchAnimation = atom({
  key:"switchAnimation",
  default:false
})

export const fetchComplete = atom({
  key:"fetchComplete",
  default:false
})

export const allImages = atom({
  key:"allImages",
  default:false
})
export const mousePosition = atom({
  key:"mousePosition",
  default:{x:0,y:0}
})

export const playerPosition = atom({
  key:"playerPosition",
  default:[{x:300, y:700}, {x:500, y:700}]
})

export const playerDirection = atom({
  key:"playerDirection",
  default:{x:1, y:1}
})


export const playerAnim = atom({
  key:"playerAnim",
  default:null
})
export const focusedEntity = atom({
  key:"focusedEntity",
  default:null
})

export const entities = atom({
  key:"entities",
  default:null
})

export const entityTypes = atom({
  key:"entityTypes",
  default:null
})