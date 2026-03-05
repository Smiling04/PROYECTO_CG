// 1. Creamos el lienzo y el pincel

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Ajustamos el canvas al tamaño de la pantalla
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Aquí guardaremos todas las manchas creadas
let manchas = [];


//Colores aleatoriamente con transparencia de 0.5
function randomColor(){

let r = Math.floor(Math.random()*255);
let g = Math.floor(Math.random()*255);
let b = Math.floor(Math.random()*255);

return `rgba(${r},${g},${b},0.5)`;

}


//Clicquear para interactuar el usuario
canvas.addEventListener("click", function(e){

const rect = canvas.getBoundingClientRect();

const x = e.clientX - rect.left;
const y = e.clientY - rect.top;


//Creamos una nueva mancha
let nuevaMancha = {

x: x,
y: y,

size: Math.random()*60 + 20,

color: randomColor(),

rotation: Math.random()*Math.PI,

scale: Math.random()*1.5 + 0.5,

type: Math.random() > 0.5 ? "circle" : "square"

};

//Guardamos la mancha en la lista
manchas.push(nuevaMancha);

});


//Dibujar manchas
function drawMancha(m){

ctx.save(); //Guardamos estado del canvas

ctx.translate(m.x, m.y); //Traslación
ctx.rotate(m.rotation); //Rotación
ctx.scale(m.scale, m.scale); //Escala

ctx.fillStyle = m.color;


//Si es círculo
if(m.type === "circle"){

ctx.beginPath();
ctx.arc(0, 0, m.size, 0, Math.PI*2);
ctx.fill();

}   

//Si es cuadrado
else{

ctx.fillRect(
-m.size/2,
-m.size/2,
m.size,
m.size
);

}

ctx.restore(); //Restauramos estado

}


//Animación
function animate(){

ctx.clearRect(0, 0, canvas.width, canvas.height); //Limpiar el lienzo

manchas.forEach(function(m){

drawMancha(m);

});

requestAnimationFrame(animate);

}

animate();
