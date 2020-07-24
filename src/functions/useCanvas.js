import React, { useRef, useEffect } from "react";

 function useCanvas(draw, context = "2d") {
    const canvasRef = useRef(null);
  
    useEffect(() => {
   //   let ctx = canvasRef.current.getContext(context);
      let can = canvasRef
      let ctx = can.getContext('2d')
   let   im = new Image()
      im.src=(process.env.PUBLIC_URL + '/images/bird/idle/1.png')
  ctx.drawImage(im,100,100)
      let animationFrameId = requestAnimationFrame(renderFrame);
  
      function renderFrame() {
        animationFrameId = requestAnimationFrame(renderFrame);
      //  draw(ctx);
      }
  
      return () => cancelAnimationFrame(animationFrameId);
    }, []);
  
    return canvasRef;
  }

  export default useCanvas