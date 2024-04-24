const canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

// obtiene las dimensiones de la pantalla actual
const window_height = window.innerHeight;
const window_width = window.innerWidth;

// el canvas tiene las mismas dimensiones que la pantalla
canvas.height = window_height;
canvas.width = window_width;

canvas.style.background = '#ff8';

class Circle {
    constructor(x, y, radius, color, text) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.color = color;
        this.text = text;
        this.velocityX = Math.random() * 4 - 2; // velocidad aleatoria en el eje X
        this.velocityY = Math.random() * 4 - 2; // velocidad aleatoria en el eje Y
    }

    draw(Context) {
        Context.beginPath();
        Context.fillText(this.text, this.posX, this.posY);
        Context.strokeStyle = this.color; // Establece el color del contorno
        Context.textAlign = 'center'; // Centra el texto en el eje X
        Context.textBaseline = 'middle'; // Centraliza el texto en el eje Y
        Context.font = '20px Arial';
        Context.lineWidth = 2;
        Context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
        Context.stroke();
        Context.closePath();
    }

    update() {
        // actualiza la posición del círculo
        this.posX += this.velocityX;
        this.posY += this.velocityY;
        
        // comprueba colisiones con los bordes del canvas
        if (this.posX + this.radius >= canvas.width || this.posX - this.radius <= 0) {
            this.velocityX *= -1;
        }
        if (this.posY + this.radius >= canvas.height || this.posY - this.radius <= 0) {
            this.velocityY *= -1;
        }
        
        // asegura que el círculo permanezca dentro del canvas
        this.posX = Math.min(Math.max(this.posX, this.radius), canvas.width - this.radius);
        this.posY = Math.min(Math.max(this.posY, this.radius), canvas.height - this.radius);
    }
}


let arrayCircle = [];

for (let i = 0; i < 10; i++) {
    let randomX = Math.random() * window_width; // posicion aleatoria para X
    let randomY = Math.random() * window_height; // posicion aleatoria para Y
    let randomRadius = Math.floor(Math.random() * 100 + 30); // Radio de los círculos va de 1 a 99
    let miCirculo = new Circle(randomX, randomY, randomRadius, 'blue', i + 1);
    arrayCircle.push(miCirculo);
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas en cada frame
    for (let i = 0; i < arrayCircle.length; i++) {
        arrayCircle[i].update(); // Actualiza la posición de los círculos
        arrayCircle[i].draw(ctx); // Dibuja los círculos actualizados
    }
    requestAnimationFrame(animate); // Solicita el próximo frame de animación
}

animate(); // Comienza la animación
