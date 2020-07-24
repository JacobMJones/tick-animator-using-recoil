const entityTypes = {

    ella: {
        clickable: true,
        random: true,
        path: process.env.PUBLIC_URL + '/images/ella/',
        totalImageCount: 29,
        idle: { name: 'idle', length: 2, transition: false },
        lookSide: {
            name: 'lookSide', length: 24, transition: true,
            forwardAnimation: 'lookSideIdle', backwardAnimation: 'idle'
        },
        lookSideIdle: { name: 'lookSideIdle', length: 3, transition: false }
    },

    thumb: {

        clickable: true,
        random: false,
        path: process.env.PUBLIC_URL + '/images/thumb/',
        totalImageCount: 25,
        idle: { name: 'idle', length: 9, transition: false },
        lookSide: { name: 'lookSide', length: 10, transition: true, forwardAnimation: 'lookSideIdle', backwardAnimation: 'idle' },
        lookSideIdle: { name: 'lookSideIdle', length: 6, transition: false }
    },
    plantEye: {
        actions: [
            { id: 1, name: 'idle', length: 10, isTransition: false }
        ],
        clickable: true,
        random: false,
        path: process.env.PUBLIC_URL + '/images/plantEye/',
        totalImageCount: 10
    },
    bird: {
        actions: [
            { id: 1, name: 'idle', length: 3 },
            { id: 2, name: 'walking', length: 5 },
            { id: 3, name: 'flying', length: 8 }
        ],
        clickable: true,
        path: process.env.PUBLIC_URL + '/images/bird/',
        totalImageCount: 16,
        xSize:100,
        ySize:100
    },
   caterpillar: {
        actions: [
            { id: 1, name: 'idle', length: 4 },
            { id: 2, name: 'moving', length: 8 }
        ],
        clickable: true,
        path: process.env.PUBLIC_URL + '/images/caterpillar/',
        totalImageCount:12,
        xSize:90,
        ySize:30
    },
    worm: {
        actions: [
            { id: 1, name: 'idle', length: 8 },
            { id: 2, name: 'moving', length: 14 }
        ],
        clickable: true,
        path: process.env.PUBLIC_URL + '/images/worm/',
        totalImageCount: 22,
    },
    eye: {


        actions: [
            { id: 1, name: 'open', length: 1, isTransition: false },
            {
                id: 2, name: 'blink', length: 4, isTransition: true,
                forwardAnimation: 'flyingHigh', backwardAnimation: 'flying'
            },
            { id: 3, name: 'open', length: 1, isTransition: false }],


        path: process.env.PUBLIC_URL + '/images/eye/',
        clickable: true,
        random: true,


        totalImageCount: 6

    },
    background: {
        clickable: false,
        totalImageCount: 6,
        random: false,
        path: process.env.PUBLIC_URL + '/images/background/',
        idle: { name: 'idle', length: 6, transition: false }
        // lookSide: {name: 'lookSide', length: 4, transition: true, 
        // forwardAnimation: 'lookSideIdle', backwardAnimation: 'idle'},
        // lookSideIdle: { name: 'lookSideIdle', length: 1, transition: false }
    },
    walk: {
        clickable: false,
        totalImageCount: 12,
        random: false,
        path: process.env.PUBLIC_URL + '/images/walk/',
        idle: { name: 'idle', length: 12, transition: false }
        // lookSide: {name: 'lookSide', length: 4, transition: true, 
        // forwardAnimation: 'lookSideIdle', backwardAnimation: 'idle'},
        // lookSideIdle: { name: 'lookSideIdle', length: 1, transition: false }
    }
}

export default entityTypes