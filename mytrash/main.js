document.addEventListener('DOMContentLoaded', () => {
    createBlocks(10); 

    let selected = null, x_pos = 0, y_pos = 0, x_elem = 0, y_elem = 0;

    function createBlocks(numberOfBlocks) {
        const container = document.getElementById('block-container');
        const containerWidth = container.offsetWidth;
        const imageUrls = [
            'imgs/taco.jpeg', 
            'imgs/tea.jpeg',
        ];

        for (let i = 0; i < numberOfBlocks; i++) {
            const block = document.createElement('div');
            block.className = 'block';
            block.style.left = `${Math.random() * (containerWidth - 100)}px`; 
            block.style.bottom = '0px';
            block.style.backgroundImage = `url('${imageUrls[i % imageUrls.length]}')`;
            container.appendChild(block);

            block.onmousedown = function (e) {
                selected = this;
                x_elem = x_pos - selected.offsetLeft;
                y_elem = y_pos - selected.offsetTop;
                selected.style.position = 'absolute';
            };
        }

        document.onmousemove = function (e) {
            x_pos = document.all ? window.event.clientX : e.pageX;
            y_pos = document.all ? window.event.clientY : e.pageY;
            if (selected !== null) {
                selected.style.left = (x_pos - x_elem) + 'px';
                selected.style.top = (y_pos - y_elem) + 'px';
            }
        };

        document.onmouseup = function () {
            if (selected !== null) {
                dropBlock(selected);
                selected = null;
            }
        };
    }

    function dropBlock(block) {
        let velocity = 0;
        let acceleration = 0.5;
        let dropInterval = setInterval(() => {
            let currentTop = parseInt(block.style.top, 10) || window.innerHeight - block.offsetHeight;
            velocity += acceleration;
            if (currentTop + velocity + block.offsetHeight < window.innerHeight) {
                block.style.top = currentTop + velocity + 'px';
            } else {
                block.style.top = window.innerHeight - block.offsetHeight + 'px';
                clearInterval(dropInterval);
            }
        }, 20);
    }
});
