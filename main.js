document.addEventListener('DOMContentLoaded', () => {
    const blocks = document.querySelectorAll('.block');
    blocks.forEach(block => {
        const maxX = window.innerWidth - 300; // Adjusted for 300px block width
        const maxY = window.innerHeight - 300; // Adjusted for 300px block height
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        block.style.left = `${randomX}px`;
        block.style.top = `${randomY}px`;
    });
});
