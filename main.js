document.addEventListener('DOMContentLoaded', () => {
    const blocks = document.querySelectorAll('.block');

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
            // Prevent default drag behavior
            e.preventDefault();

            isDragging = false; // Reset isDragging on each mousedown
            dragStartX = e.clientX;
            dragStartY = e.clientY;

            function handleMouseMove(e) {
                // Calculate the distance moved
                let moveX = e.clientX - dragStartX;
                let moveY = e.clientY - dragStartY;
                if (Math.abs(moveX) > 5 || Math.abs(moveY) > 5) {
                    isDragging = true;
                }

                if (!isDragging) return;

                let newX = e.clientX - dragStartX + block.offsetLeft;
                let newY = e.clientY - dragStartY + block.offsetTop;

                // Ensure the block stays within the bounds of the viewport
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

        // Prevent default drag behavior for images
        block.addEventListener('dragstart', (e) => {
            e.preventDefault();
        });

        // Click event for navigation
        block.parentElement.addEventListener('click', (e) => {
            if (isDragging) {
                e.preventDefault(); // Prevent navigation if the block was dragged
                isDragging = false; // Reset dragging state
            } else {
                // Navigation is allowed here if isDragging is false
            }
        });
    });
});
