import React, { useRef, useEffect, useState}  from 'react';

function Canvas ({ color, brushWidth, eraser, setDisplayColorPicker }) {
    // canvasRef must be declared here so the ref can refer to it
    // null is initail value
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const [drawing, setDrawing] = useState(false);
    
    useEffect(() => {
    // accessing "current" to get the DOM node without re-rendering
    // `current` points to the mounted canvas element
    const canvas = canvasRef.current;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    const ctx = canvas.getContext('2d');
    ctxRef.current = ctx;
    ctxRef.current.lineCap = 'round';
    }, [])


    useEffect(() => {ctxRef.current.lineWidth = brushWidth;}, [brushWidth]);
    useEffect(() => {ctxRef.current.strokeStyle = color.hex;}, [color]);

    let x, y;
    const startDrawing = ({nativeEvent}) => { 
        
        if (nativeEvent.type === 'touchstart'){
            x = nativeEvent.touches[0].clientX;
            y = nativeEvent.touches[0].clientY;
          } else if (nativeEvent.type === 'mousedown'){
            x = nativeEvent.offsetX;
            y = nativeEvent.offsetY;
          }
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(x, y)
        setDrawing(true)
        draw(nativeEvent)
        setDisplayColorPicker(false);
    }

    const finishDrawing = () => {
        ctxRef.current.beginPath();
        setDrawing(false)
    }

    const draw = ( {nativeEvent} ) => {
        if(!drawing){return; }
        if (nativeEvent.type === 'touchmove'){
            x = nativeEvent.touches[0].clientX;
            y = nativeEvent.touches[0].clientY;
        } else if (nativeEvent.type === 'mousemove'){
            x = nativeEvent.offsetX;
            y = nativeEvent.offsetY;
        }
        ctxRef.current.lineTo(x, y);
        ctxRef.current.stroke();
        
        if(eraser){
            ctxRef.current.globalCompositeOperation = "destination-out";
        } else {
            ctxRef.current.globalCompositeOperation = "source-over";
        }
    }

    return (
    <canvas id='canvas' 
        style={{ 
        visibility: 'visible',
        borderRadius: '1rem', 
        backgroundColor: '#fbfbfb',
        width: '100%',
        height:'100%',
        border: 'black',
        overflow: 'hidden',
        }}
        
        //reference to the actual canvas DOM element
        ref={canvasRef} 
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseOut={finishDrawing}
        onMouseMove={draw} 
        onTouchMove={draw}
        onTouchStart={startDrawing}
        onTouchEnd={finishDrawing}
        ></canvas>
    )
}

export default Canvas;