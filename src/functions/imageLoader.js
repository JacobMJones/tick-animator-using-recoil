
import React, { useEffect, useState } from "react";
const allImages = [];

let count = 0
console.log(count)
const importImages = (path, type, anim) => {

    path.keys().map((item, index) => {
        count++;
        let img = new Image()
        img.onload = function () {
            console.log('loaded')
        };
        img.src = `../../public/images/${type}/${anim}/${anim}-${index}`
      allImages.push(process.env.PUBLIC_URL + `images/${type}/${anim}/${anim}-${index}.png`)
    });

}

const get = () => {

    console.log('midlle')
    importImages(require.context('../../public/images/plantEye/idle', false, /\.(jpe?g|svg|gif|png)$/), 'plantEye', 'idle');
    importImages(require.context('../../public/images/plantEye/lookSide', false, /\.(jpe?g|svg|gif|png)$/), 'plantEye', 'lookSide');
    importImages(require.context('../../public/images/plantEye/lookSideIdle', false, /\.(jpe?g|svg|gif|png)$/), 'plantEye', 'lookSideIdle');

    importImages(require.context('../../public/images/thumb/idle', false, /\.(jpe?g|svg|gif|png)$/), 'thumb', 'idle');
    importImages(require.context('../../public/images/thumb/lookSide', false, /\.(jpe?g|svg|gif|png)$/), 'thumb', 'lookSide');
    importImages(require.context('../../public/images/thumb/lookSideIdle', false, /\.(jpe?g|svg|gif|png)$/), 'thumb', 'lookSideIdle')

    importImages(require.context('../../public/images/eye/idle', false, /\.(jpe?g|svg|gif|png)$/), 'eye', 'idle');
    importImages(require.context('../../public/images/eye/lookSide', false, /\.(jpe?g|svg|gif|png)$/), 'eye', 'lookSide');
    importImages(require.context('../../public/images/eye/lookSideIdle', false, /\.(jpe?g|svg|gif|png)$/), 'eye', 'lookSideIdle');
    return { allImages }
}



export default get

