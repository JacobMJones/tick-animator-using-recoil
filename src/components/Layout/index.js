import React, { useEffect} from "react";
import AnimationContainer from '../AnimationContainer'
import { creatures } from '../../animations/animations'
function Layout() {
    useEffect(() => {
    }, [])
    return (
        <div style={{ height: '100%', display: 'grid' }} >

            <div style={{ margin: 'auto' }} >
      
                <div>  <AnimationContainer cr={creatures.background} size={500} /></div>
                <div style={{ marginTop: -500 }}>
                    <AnimationContainer cr={creatures.bird} size={500} />
                </div>
                <AnimationContainer cr={creatures.ella} size={500} />
                <AnimationContainer cr={creatures.eye} size={500} />
                <AnimationContainer cr={creatures.plantEye} size={500} />
            </div>
        </div>
    );
}

export default Layout;

