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

    const [show, setShow] = useState(false)
    const [data, setData] = useState()
    // const [{ loading }, loadingDispatch] = useStateValue();

    useEffect(() => {
        const fetchData = async (setImages) => {
            let d;


            d = await imageLoader();
            setData(d)
            setFetchComplete(true)
      

            setShow(true)



            data && setImages(data.allImages)


            // setFetchComplete(true)


        }


        !images && fetchData(setImages)


    }, [data])
    return <div>{show && Object.keys(images).map((item, index) => {

        return images[item].map((i, sindex) => {

            return <div style={{ display: 'none' }}>ddd<img src={process.env.PUBLIC_URL + `/images/${item}/${i}`} /></div>
        })
    })}</div>

}

export default Loader;
