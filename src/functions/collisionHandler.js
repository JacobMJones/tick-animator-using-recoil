//no longer used




function newCheck(r1, r2) {

  let xIntersectionHitting = r2.x > r1.x && r2.x < r1.x + r1.width + r2.width
  let xSide = r2.x - r2.width < r1.x ? 'left' : 'right'
  let yIntersectionHitting = r2.y > r1.y && r2.y < r1.y + r1.height + r2.height
  let ySide = r2.y - r2.height < r1.y ? 'top' : 'bottom'

  let xDif = xSide === 'left' ? Math.abs(r2.x - r1.x) : Math.abs(r2.x - r1.x - r2.width - r1.width)
  let yDif = ySide === 'top' ? Math.abs(r2.y - r1.y) : Math.abs(r2.y - r1.y - r2.height - r1.height)

  //console.log(xDif, yDif, r1.width, r2.width)

  let xIntersection = { xIntersectionHitting, xSide, xDif }
  let yIntersection = { yIntersectionHitting, ySide, yDif }
  return { xIntersection, yIntersection }

}

const collisionHandler = (player, arr) => {
  //console.log(player, arr)
  let ind = []
  let x = player.position.x
  let y = player.position.y

  arr.map((item, index) => {

    let intersecting = newCheck(
      { x: item.position.x, y: item.position.y, width: item.xSize, height: item.ySize },
      { x: x, y: y, width: player.xSize, height: player.ySize })

    // console.log(intersecting)

    if (intersecting.xIntersection.xIntersectionHitting &&
      intersecting.yIntersection.yIntersectionHitting) {
      ind.push({ ...intersecting, item })
    }


  })

  return ind
}

export default collisionHandler
