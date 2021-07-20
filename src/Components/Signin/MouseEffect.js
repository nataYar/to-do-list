
const MouseEffect = () => {
    const canvas = document.getElementById('signInCanva');
    //Create a Drawing Object
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let particleArray = [];
    const numOfParticles = 100;
    const rainbow =  ['#FFFF', '#04ddb9','#f5d300', '#fd43b3']

    //get position of a mouse
    const mouse = {
        x: null,
        y: null
    }
    window.addEventListener('mousemove', function(event){
        mouse.x = event.x;
        mouse.y = event.y;
        
    })
    setInterval(function(){
        mouse.x = undefined;
        mouse.y = undefined;
    }, 200);

    //arc(x,y,r,startangle,endangle)
    class Particle {
        constructor(x, y, size, color, weight){
            this.x = x;
            this.y = y;
            this.size = size;
            this.color= color;
            this.weight = weight;
        }
        draw(){
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        //update particle's position so we know where to draw it
        update(){
            //particles are shrinking until their size is zero
            this.size -= 0.05;
            if(this.size < 0) {
                this.x = (mouse.x +((Math.random() * 20) + 10));
                this.y = (mouse.y +((Math.random() * 20) + 10));
                this.size = (Math.random() * 14) + 2;
                this.weight = (Math.random() * 2) - 1;
            }
            //if particles are bigger than zero, they will start falling down,
            // gaining weight
            this.y += this.weight;
            let randInd = Math.floor(Math.random() * 6)
            this.color = rainbow[randInd]
            //x = x * y
            this.weight += 0.25;

            if(this.y > canvas.height - this.size){
                //this.weight = this.weight * -1
                this.weight *= -1;
            } 
        }
    }
   
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for(let i = 0; i < particleArray.length; i++){
            particleArray[i].update();
            particleArray[i].draw();
        }
        requestAnimationFrame(animate);
    }

    function init() {
        particleArray = [];
        for(let i = 0; i < numOfParticles; i++){
            let x = Math.random() * canvas.width;
            let y = Math.random() * canvas.height;
            let size = (Math.random()* 20);
            let color = 'red';
            let weight = 20;
            particleArray.push( new Particle(x, y, size, color, weight))
        }
    }
    init();
    animate();
}


export default MouseEffect;