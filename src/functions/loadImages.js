const loadImages = (actions, path, incrementLoadCount) => {
  const imageArray = actions.map((item, index) => {

    return Array.from({ length: item.length }, (x, i) => i + 1).map((x, i) => {

      var im = new window.Image()
      im.src = path + actions[index].name + `/${i + 1}.png`
      im.onload =  () => {incrementLoadCount && incrementLoadCount()}

      return im
    })
  })
  return imageArray
}


export default loadImages
