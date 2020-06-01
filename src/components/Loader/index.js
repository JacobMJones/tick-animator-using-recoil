import React, { useEffect, useState } from 'react';
import imageLoader from '../../functions/imageLoader'
import { useRecoilState } from 'recoil';
import { fetchComplete, allImages } from '../../recoil/atoms'
let show = false;
let cou = 0;
function Loader() {

    const loadImage = () => {

    }

    const [fetched, setFetchComplete] = useRecoilState(fetchComplete)
    const [images, setImages] = useRecoilState(allImages)
    // const [{ loading }, loadingDispatch] = useStateValue();

    useEffect(() => {
        const fetchData = async (setImages) => {


            console.log('before')
            const data = await imageLoader();


            show = true


            setImages(data.allImages)

            console.log(data.allImages)
            // setFetchComplete(true)


        }


        !images && fetchData(setImages)


    }, [images])
    return <div>{show && Object.keys(images).map((item, index) => {

        return images[item].map((i, sindex) => {
            cou++;
            cou === 30 && setFetchComplete(true)
            return <div style={{ display: 'none' }}>ddd<img src={process.env.PUBLIC_URL + `/images/${item}/${i}`} /></div>
        })
    })}</div>

}

export default Loader;
