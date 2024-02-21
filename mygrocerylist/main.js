document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.clickable');
    items.forEach(item => {
        item.addEventListener('click', () => {
            const imgName = item.id;
            loadImageWithFallback(imgName, ['jpeg', 'png', 'jpg']);
        });
    });

    document.addEventListener('wheel', (e) => {
        e.preventDefault();
        document.querySelector('.scroll-container').scrollLeft += e.deltaY + e.deltaX;
    });

    // Cursor update logic remains the same
    const cursor = document.getElementById('customCursor');
    document.addEventListener('mousemove', function(e) {
        const cursorSizeVw = 5; // Adjust based on your CSS
        const vwInPixels = document.documentElement.clientWidth / 100;
        const cursorSizePixels = cursorSizeVw * vwInPixels;

        const x = e.clientX - cursorSizePixels / 2;
        const y = e.clientY - cursorSizePixels / 2;
        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;
        cursor.style.display = "block";
    });

    document.addEventListener('mouseleave', function() {
        cursor.style.display = "none";
    });
});

function loadImageWithFallback(imgName, formats, index = 0) {
    if (index >= formats.length) return;
    const format = formats[index];
    const imgPath = `imgs/${imgName}.${format}`;
    const img = new Image();
    img.onload = () => {
        showImage(imgPath);
    };
    img.onerror = () => {
        loadImageWithFallback(imgName, formats, index + 1);
    };
    img.src = imgPath;
}

function showImage(src) {
    const img = document.createElement('img');
    img.src = src;
    img.style.position = 'absolute';
    img.style.left = `${randomPosition()}vw`;
    img.style.top = `${randomPosition()}vh`;
    img.style.width = '100px';
    img.style.zIndex = '1'; // Ensures the image is layered appropriately.

    // Add a mouseover event listener to remove the image when the cursor hovers over it
    img.addEventListener('mouseover', function() {
        img.remove(); // This will remove the image from the document
    });

    document.body.appendChild(img);
}

function randomPosition() {
    return Math.floor(Math.random() * 90);
}
