const idle = (ent, playerIndex) => {
  //  console.log(ent.energy)
  ent.actionIndex = 0
  ent.energy = ent.energy < 200 ? ent.energy + 1 : ent.energy
  return ent
}

const resting = () => {

}

const moving = (ent, playerIndex) => {
  ent.actionIndex = 1
  ent.energy = ent.energy > 0 ? ent.energy - 1 : ent.energy
  return ent
}

export {
  idle,
  resting,
  moving
}
