import React from "react";
import { countState } from '../../recoil/atoms'
import {
    useRecoilValue,
} from 'recoil';

function AnimationContainer() {
    const count = useRecoilValue(countState);
    return (
        <img src={process.env.PUBLIC_URL + `/images/pupils/pupils-1-${count}.png`} />
    );
}

export default AnimationContainer;
