  var corpo = document.querySelector('.flash-run');
        var flash = document.createElement('div');
        flash.className = 'flash';
        corpo.appendChild(flash);
        var flasharr = [];
        var tam = window.innerWidth;
        tam = tam * 0.96;
        setTimeout(() => {
            for (var i = 0; i <= tam; i++) {
                ((i) => {
                    setTimeout(() => {

                        flasharr.push(flash.cloneNode(true));
                        flash.style.left = i + 'px';
                        corpo.appendChild(flasharr[i]);
                        flasharr[i].style.left = i + 'px';

                        if (i * 0.00004 <= 0.04) {
                            flasharr[i].style.opacity = i * 0.00004;
                        } else {
                        flasharr[i].style.opacity = 0.04;
                        }
                        flasharr[i].style.zIndex = -i;
                    },
                        100 + (i));
                })(i);

            }
            
            var remove = tam + 1;
            for (var i = 0; i <= tam; i++) {
                ((i) => {
                    setTimeout(() => corpo.removeChild(corpo.firstElementChild), 200 + (i));
                })(i);
            }
        }, 3000);