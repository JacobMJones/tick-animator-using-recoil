import React from "react";
import { useRecoilValue } from 'recoil';
import AnimationContainer from '../AnimationContainer'
import { fetchComplete, allImages } from '../../recoil/atoms'
function Layout() {
    const fetched = useRecoilValue(fetchComplete)
    return (
        <div style={{ height: '100%', display: 'grid' }} >
            {fetched ?
                <div style={{ margin: 'auto' }} >
                    <AnimationContainer />
                    <AnimationContainer />
                </div> :
                <div>loading</div>}
        </div>
    );
}

export default Layout;
