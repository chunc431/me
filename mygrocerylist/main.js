document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.clickable');
    items.forEach(item => {
        item.addEventListener('click', () => {
            const imgName = item.id; // Assuming the id matches an image name
            const imgPath = `images/${imgName}.jpg`; // Path to your images
            showImage(imgPath);
        });
    });

    document.addEventListener('wheel', (e) => {
        e.preventDefault(); // Prevent default scrolling
        document.querySelector('.scroll-container').scrollLeft += e.deltaY + e.deltaX;
    });

    document.body.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG') {
            const rotation = parseInt(e.target.getAttribute('data-rotation') || '0') + 90;
            e.target.style.transform = `rotate(${rotation}deg)`;
            e.target.setAttribute('data-rotation', rotation.toString());
        }
    });
});

function showImage(src) {
    const img = document.createElement('img');
    img.src = src;
    img.style.position = 'absolute';
    img.style.left = `${randomPosition()}%`;
    img.style.top = `${randomPosition()}%`;
    img.style.width = '100px'; // Adjust size as needed
    document.body.appendChild(img);
}

function randomPosition() {
    return Math.floor(Math.random() * 90); // Random position between 0 and 90%
}
