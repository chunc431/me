document.addEventListener('DOMContentLoaded', () => {
    const blocks = document.querySelectorAll('.block');
    const centerText = document.getElementById('center-text');

    blocks.forEach(block => {
        const maxX = window.innerWidth - block.offsetWidth;
        const maxY = window.innerHeight - block.offsetHeight;
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        block.style.left = `${randomX}px`;
        block.style.top = `${randomY}px`;

        let isDragging = false;
        let dragStartX = 0;
        let dragStartY = 0;

        block.addEventListener('mousedown', (e) => {
            e.preventDefault();

            isDragging = false; 
            dragStartX = e.clientX;
            dragStartY = e.clientY;

            function handleMouseMove(e) {
                let moveX = e.clientX - dragStartX;
                let moveY = e.clientY - dragStartY;
                if (!isDragging && (Math.abs(moveX) > 5 || Math.abs(moveY) > 5)) {
                    isDragging = true;
                    const content = block.parentElement.getAttribute('data-content');
                    centerText.textContent = `${content}`;
                }

                if (!isDragging) return;

                let newX = e.clientX - dragStartX + block.offsetLeft;
                let newY = e.clientY - dragStartY + block.offsetTop;

                newX = Math.min(Math.max(0, newX), maxX);
                newY = Math.min(Math.max(0, newY), maxY);

                block.style.left = `${newX}px`;
                block.style.top = `${newY}px`;
                dragStartX = e.clientX;
                dragStartY = e.clientY;
            }

            function handleMouseUp() {
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseup', handleMouseUp);
            }

            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        });

        block.addEventListener('dragstart', (e) => {
            e.preventDefault();
        });

        block.parentElement.addEventListener('click', (e) => {
            if (isDragging) {
                e.preventDefault(); 
                isDragging = false; 
            } else {
            }
        });
    });
});
