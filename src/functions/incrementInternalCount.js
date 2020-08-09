const incrementInternalCount = (ent) => {
  return ent.internalCount >= ent.images[ent.actionIndex].length ?
    ent.internalCount = 1
    : ent.internalCount + 1
}

export {
  incrementInternalCount
}
