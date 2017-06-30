var corpo = document.querySelector('.flash-run');
var flash = document.createElement('span');
let tam = corpo.offsetWidth;


//Faz o elemento sumir ou não
//1 = true, 2 = false
let vanish = 2;


flash.className = 'flash';

Object.assign(flash.style, {
    'background': 'url(https://cotts.tech/flash.svg) center no-repeat',
    'background-size': '50px 50px',
    'width': '50px',
    'height': '50px',
    'position': 'absolute'
   

});


corpo.appendChild(flash);
var flasharr = [];
tam = tam * 0.80;
var count;

var path = 0;
var i = 0;

function createShadow(size) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i <= size; i++) flasharr.push(flash.cloneNode(true));
    });
};
function createMotion(shadow) {
    return new Promise((resolve, reject) => {
        shadow.forEach((element, index, ar) => {
            
            element.style.left = index * 1.4 + 'px';
            element.style.opacity = (index * 0.0001);
        });
    })
}

function moveSpeedster(speedster, position) {
    return new Promise((resolve, reject) =>{
        speedster.style.left = position * 1.4 + 'px';
    });
};

function addShadow(element) {
    corpo.appendChild(element);
}

function removeShadow(element, position, vanish){
    return new Promise((resolve, reject)=>{
        setTimeout(() => element.removeChild(element.childNodes[vanish]), position * 0.8);
    })
}

function runSpeedster(element) {
    return new Promise((resolve,reject)=>{
        element.forEach((element, index, arr) =>{
            moveSpeedster(flash, index)
                .then(addShadow(element))
                .then(removeShadow(corpo, index, vanish));
        });
    })
}


setTimeout(() => {
    createShadow(tam)
        .then(createMotion(flasharr))
        .then(runSpeedster(flasharr));
}, 3000);

            
