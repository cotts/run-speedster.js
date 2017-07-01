let runnerShadow = [];
let size = 0;
let blurSize = 0;
let runSize = 0;
let show = -100;
let traveled = 0;
let last = false;
let textRunning;
var runtext;
function setDetails(config) {
    details = config;

    details.runner = config.runner || 'standard'
    details.howBig = config.howBig || 50;
    details.disappear = config.disappear || false;
    details.speed = config.speed || 1;


    return Promise.resolve(details);
};

var createRunner = async (racePath,runText, config) => {
    let path = document.querySelector(racePath);
    runtext = document.querySelector(runText);
    let sizeOfPath = path.offsetWidth;
    let speedster = document.createElement('span');
    textRunning = path.offsetWidth * -1;
    setDetails(config)
        .then((properties) => {
            details = properties;
            Object.assign(speedster.style, {
                'background': `url(img/${details.runner}.svg) center no-repeat`,
                'background-size': `${details.howBig}px ${details.howBig}px`,
                'width': `${details.howBig}px`,
                'height': `${details.howBig}px`,
                'position': 'absolute',
                'opacity': 0,
                'left': `${path.offsetLeft}px`
            });
            Object.assign(speedster, {
                config: {
                    speed: details.speed,
                    path: path,
                    init: path.offsetLeft,
                    sizeOfPath: sizeOfPath,
                    disappear: details.disappear,
                    howBig: details.howBig
                },

                className: 'speedster'
            });
            Object.assign(runtext.style, {
                'left' : (path.offsetWidth - details.howBig) * -1 +'px',
                'position' : 'absolute'
            });
           
            path.appendChild(speedster);
        });

    return await Promise.resolve(speedster);
};



let insertShadow = (el) => {
    if (size === el.config.sizeOfPath - el.config.howBig) {
        console.log('inseriu as sombras');

        return;
    }
    runnerShadow.push({
        span: el.cloneNode(true),
        config: el.config
    });
    size++;
    insertShadow(el);

    return Promise.resolve(runnerShadow);
}

let createBlur = (shadow) => {
    if (blurSize === shadow.length) {
        console.log('fez o blur');
        return;
    }
    Object.assign(shadow[blurSize].span.style, {
        'left': `${shadow[blurSize].config.init + blurSize}px`,
        'opacity': blurSize * 0.0001,
        'z-index': blurSize * -1
    });
    blurSize++;
    createBlur(shadow);
    // await sleep(200);
    return Promise.resolve(shadow);
}

let run = (el, loop) => {
    let x = loop;
    // speed of the object
    var vel = el[0].config.speed;

    //if the object will disappear in the end of the path
    var disappear = el[0].config.disappear;

    //max distance to run = iniial path + pathsize
    var max =  el[0].config.sizeOfPath;

    //initial position of the path
    var init = el[0].config.init;

    //the object that will be include the object and shadows
    var path = el[0].config.path;

    //actual position of the object
    var posicao = path.firstElementChild.getBoundingClientRect().left;

    //counter of the children objects inside the path way
    var count = path.childElementCount;

    //if get to the end, will make the next check or end
    if (x >= max) {
        console.log('correu');
        return;
    }

    //if the way is in the last loop, change the velocity to not pass trough the path
    if (posicao >= (el.length - vel - 2)) {
        vel = max - posicao - el[0].config.howBig - 1;
        textRunning = textRunning + 2;
        last = true;
    }
    for (let i = 0; i <= vel; i++) {
        if (typeof x === 'undefined') {
            x = 0;
        }
        count = path.childElementCount;

        if (posicao >= (max / 2) && count > vel && disappear) {

            if (count === 1) {
                path.removeChild(path.childNodes[1]);
                console.log('correu e sumiu');
                return;
            } else {
                path.removeChild(path.childNodes[1]);
                path.removeChild(path.childNodes[1]);
            }

        }
        if (posicao >= (max / 2) && count > vel && !disappear) {
            if (count === 2) {
                console.log('correu e ficou');
                path.removeChild(path.childNodes[2]);
                return;
            } else {

                path.removeChild(path.childNodes[2]);
                path.removeChild(path.childNodes[2]);
            }
        }
        path.firstElementChild.style.left = `${posicao + i}px`;
        path.appendChild(runnerShadow[x + i].span);
        runtext.style.left = `${textRunning + x + i +1}px`;
    }
    requestAnimationFrame(() => run(el, posicao - el[0].config.init + vel));
    return Promise.resolve(el);
};

var showRunner = async (el) => {
    if (show === 0) {
        return;
    };
    el.style.opacity = 1 + (show / 100);
    show++;
    requestAnimationFrame(() => showRunner(el));
    await sleep(2000);
    return Promise.resolve(el);
}

async function sleep(long) {
    function timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    await timeout(long);
}


createRunner('.race-path','.run-text', { 'runner': 'standard', 'speed': 60, 'disappear': true }).then(showRunner).then(insertShadow).then(createBlur).then(run);