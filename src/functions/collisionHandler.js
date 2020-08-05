//no longer used

function checkIntersection(r1, r2) {
  return !(
    r2.x > r1.x + r1.width ||
    r2.x + r2.width < r1.x ||
    r2.y > r1.y + r1.height ||
    r2.y + r2.height < r1.y
  );
}

const collisionHandler = (player, arr, isEnt) => {

  let ind;
  let x = player.position.x
  let y = player.position.y

  arr.map((item, index) => {
    let hasIntersection =
      checkIntersection(
        { x: item.position.x, y: item.position.y, width: item.xSize, height: item.ySize },
        { x: x, y: y, width: player.xSize, height: player.ySize })

    if (hasIntersection && index !== player.id && isEnt) {
      ind = index
    }
    if (hasIntersection && !isEnt) {

      ind = index
    }

  })

  return ind
}

export default collisionHandler
