import React, { useRef, useEffect, useState}  from 'react';

function Canvas ({ color, brushWidth, eraser, setDisplayColorPicker }) {
    // canvasRef must be declared here so the ref can refer to it
    //null is initail value
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const [drawing, setDrawing] = useState(false);

    const hue = useRef(0);

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

    useEffect(() => {ctxRef.current.strokeStyle = color.hex;}, [color]);
    useEffect(() => {ctxRef.current.lineWidth = brushWidth;}, [brushWidth]);
    

    const startDrawing = ({ nativeEvent }) => { 
        const {offsetX, offsetY} = nativeEvent;
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(offsetX, offsetY)
        setDrawing(true)
        draw(nativeEvent)
        // document.getElementById('new-task-button-id').disabled = false;
        setDisplayColorPicker(false);
    }

    const finishDrawing = () => {
        ctxRef.current.beginPath();
        setDrawing(false)
    }

    const draw = ( { nativeEvent }) => {
        if(!drawing){return; }
        const {offsetX, offsetY} = nativeEvent;
        ctxRef.current.lineTo(offsetX, offsetY);
        ctxRef.current.stroke();
        if(eraser){
            ctxRef.current.globalCompositeOperation = "destination-out";
        } else {
            ctxRef.current.globalCompositeOperation = "source-over" 
        }
    }

    
    

    return (
    <canvas id='canvas' 
        style={{ 
        visibility: 'visible',
        borderRadius: '1rem', 
        backgroundColor: '#fbfbfb',
        width: '95%',
        height:'100%',
        border: 'black'
        }}
        
        //reference to the actual canvas DOM element
        ref={canvasRef} 
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw} ></canvas>
      
    )
}

export default Canvas;