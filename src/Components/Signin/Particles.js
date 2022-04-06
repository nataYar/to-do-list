import React, { useRef, useEffect, useState}  from 'react';
import './Particles.css';

function Particles ()  {
    const canvasIntroRef = useRef(null);
    const ctxIntroRef = useRef(null);
    const [width, setWidth]   = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    let particles = [];
    const numOfParticles = 7;
    let fixed = [];

    const updateDimensions = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    }
    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);


    //draw FIXED circles
    useEffect(() => {
        const canvasIntro = canvasIntroRef.current;
        canvasIntro.width = canvasIntro.clientWidth; //width acording to screen size
        canvasIntro.height = canvasIntro.clientHeight;
        const ctxIntro = canvasIntro.getContext('2d'); //context
        ctxIntroRef.current = ctxIntro;

        class Fixed {
            constructor(x, y, radius, color){
                this.x = x;
                this.y = y;
                this.radius = radius;
                this.color= color;
                
            }
            draw(){
                ctxIntroRef.current.beginPath();
                ctxIntroRef.current.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                ctxIntroRef.current.fillStyle = this.color;
                ctxIntroRef.current.fill();
            }
        }

        class Particle {
            constructor(x, y, radius, color, weight){
                this.x = x;
                this.y = y;
                this.radius = radius;
                this.color= color;
                this.weight = weight;
            }
            draw(){
                ctxIntroRef.current.beginPath();
                ctxIntroRef.current.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                if (this.radius > 0 ){
                    ctxIntroRef.current.fillStyle = this.color;
                    ctxIntroRef.current.fill();
                }
            }
    
            //update particle's position so we know where to draw it
            update(particles, fixed){
                this.radius -= .09;
                //when a particle's radius is less than zero, make it reappear again
                if(this.radius <= 5) {
                    this.x = Math.random() * (width) + 5;
                    this.y = 0;
                    this.radius = Math.random() * (50 - 25) + 25;
                    this.weight = this.radius/9
                }
                // if particles are bigger than zero, they start falling down, gaining weight
                this.y += this.weight;
                //the smaller the number the slower particles drop
                this.weight += .02; 

                if(this.y > height - this.radius){
                    this.weight = -1;
                    this.y = height - this.radius;
                }
            
                for (let i = 0; i < particles.length; i++) {
                    if(this === particles[i]) continue;
                    for (let j = 0; j < fixed.length; j++) { 
                        if(distance(this.x, this.y, fixed[j].x, fixed[j].y) - (this.radius+fixed[j].radius) < 0) {
                            let fixedCenter = fixed[j].x
                            if(fixedCenter <= this.x){
                                // falling particle goes rigth
                                this.x += Math.sin(45);
                                this.y -= Math.cos(45);
                            } else if(fixedCenter > this.x){
                                //falling particte goes left
                                this.x += Math.sin(-45); 
                                this.y -= Math.cos(45);
                            }
                        } else {this.color = 'black'}
                    }
                }
            }
        }
        
        function distance (x1, y1, x2, y2) {
            const xDist = x2 - x1
            const yDist = y2 - y1
            return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
        }
      
        function animate() {
            ctxIntroRef.current.clearRect(0, 0, width, height);
            fixed.forEach(el => el.draw())

            for(let i = 0; i < particles.length; i++){
                particles[i].update(particles, fixed);
                particles[i].draw();
            }
            requestAnimationFrame(animate); //to repeatedly call a function
        }

        function init() {
            //set up fixed circles, that don't move
            const color = 'black'
            
            fixed.push(new Fixed(width/1.8, height/4.3, width/6, color))
            const rad2 = width/9
            fixed.push(new Fixed(width-rad2/2, height/2, rad2, color))
            const rad3 = width/12
            fixed.push(new Fixed(width/4.2, height/2, rad3, color)) 
            const rad4 = width/55
            fixed.push(new Fixed(width/3, height/1.5, rad4, color))
           
            //set up particles that move
            for (let i = 0; i < numOfParticles; i++) {
                let x = Math.random() * width; 
                let y = 0;
                let radius = Math.random() * (50 - 25) + 25;//Math.random() * (max - min) + min;
                let color = 'black';
                let weight = radius/4;
                particles.push( new Particle(x, y, radius, color, weight))  
            }
        }
        init();
        animate();
    }, [width]);

    return (
        <canvas id="canvasIntro"
            style={{ 
            visibility: 'visible',
            width: '100%',
            height:'100%' }}
            //reference to the actual canvas DOM element
            ref={canvasIntroRef} 
            ></canvas>
        )


}


export default Particles;