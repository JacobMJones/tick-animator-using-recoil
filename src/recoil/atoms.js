import { atom } from "recoil";

export const countState = atom({
  key: "countState",
  default: 0,
});

export const currentlyPlaying = atom({
  key: "animationState",
  default: 'idle'
})

export const loopLength = atom({
  key:"loopLength",
  default:10
})

export const animationSpeed = atom({
  key:"animationSpeed",
  default:32
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