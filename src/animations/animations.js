export const creatures = {

    plantEye: {
       clickable:true,
        random:false,
        path: process.env.PUBLIC_URL + '/images/plantEye/',
        totalImageCount:28,
        idle: { name: 'idle', length: 10, transition: false },
        lookSide: { name: 'lookSide', length: 14, transition: true, forwardAnimation: 'lookSideIdle', backwardAnimation: 'idle' },
        lookSideIdle: { name: 'lookSideIdle', length: 4, transition: false }
    },

        ella:{
            clickable:true,
            random:true,
        path: process.env.PUBLIC_URL + '/images/ella/',
        totalImageCount:29,
        idle: { name: 'idle', length: 2, transition: false },
        lookSide: {name: 'lookSide', length: 24, transition: true, 
        forwardAnimation: 'lookSideIdle', backwardAnimation: 'idle'},
        lookSideIdle: { name: 'lookSideIdle', length: 3, transition: false }
    }
    
    ,

    thumb: {
    
        clickable:true,
        random:false,
        path: process.env.PUBLIC_URL + '/images/thumb/',
        totalImageCount:25,
        idle: { name: 'idle', length: 9, transition: false },
        lookSide: { name: 'lookSide', length: 10, transition: true, forwardAnimation: 'lookSideIdle', backwardAnimation: 'idle' },
        lookSideIdle: { name: 'lookSideIdle', length: 6, transition: false }
    },
    bird:{
        clickable:true,
        random:false,
        path: process.env.PUBLIC_URL + '/images/bird/',
        totalImageCount:13,
        idle: { name: 'idle', length: 5, transition: false },
        lookSide: {name: 'lookSide', length: 4, transition: true, 
        forwardAnimation: 'lookSideIdle', backwardAnimation: 'idle'},
        lookSideIdle: { name: 'lookSideIdle', length: 4, transition: false }
    },
    eye:{
        clickable:true,
        random:true,
        name:'eye',
        path: process.env.PUBLIC_URL + '/images/eye/',
        totalImageCount:6,
        idle: { name: 'idle', length: 1, transition: false },
        lookSide: {name: 'lookSide', length: 4, transition: true, 
        forwardAnimation: 'lookSideIdle', backwardAnimation: 'idle'},
        lookSideIdle: { name: 'lookSideIdle', length: 1, transition: false }
    },
    background:{
        clickable:false,
        totalImageCount:6,
        random:false,
        path: process.env.PUBLIC_URL + '/images/background/',
        idle: { name: 'idle', length:6, transition: false }
        // lookSide: {name: 'lookSide', length: 4, transition: true, 
        // forwardAnimation: 'lookSideIdle', backwardAnimation: 'idle'},
        // lookSideIdle: { name: 'lookSideIdle', length: 1, transition: false }
    },
    walk:{
        clickable:false,
        totalImageCount:11 ,
        random:false,
        path: process.env.PUBLIC_URL + '/images/walk/',
        idle: { name: 'idle', length:11 , transition: false }
        // lookSide: {name: 'lookSide', length: 4, transition: true, 
        // forwardAnimation: 'lookSideIdle', backwardAnimation: 'idle'},
        // lookSideIdle: { name: 'lookSideIdle', length: 1, transition: false }
    }
}