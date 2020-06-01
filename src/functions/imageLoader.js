const allImages = {};

let count = 0
console.log(count)
const importImages = (path, type) => {

    path.keys().map((item, index) => {
        count++;
        let img = new Image()

      //  img.src = `../../public/images/${type}/${item.replace('./', '')}`
        allImages[type]
            ? allImages[type].push(item.replace('./', ''))
            : allImages[type] = [item.replace('./', '')]
    });

}

const get = () => {

console.log('midlle')
    importImages(require.context('../../public/images/idle', false, /\.(jpe?g|svg|gif|png)$/), 'idle');
    importImages(require.context('../../public/images/lookSide', false, /\.(jpe?g|svg|gif|png)$/), 'lookSide');
    importImages(require.context('../../public/images/lookSideIdle', false, /\.(jpe?g|svg|gif|png)$/), 'lookSideIdle');
    console.log('midlle')
    return { allImages }
}



export default get

