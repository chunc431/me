function openPopup(element) {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('popup').style.display = 'flex';
    document.getElementById('popup-image').src = element.querySelector('img').src;
    document.getElementById('popup-desc').textContent = element.getAttribute('data-desc');
}

// Close popup functionality
let closeDraggable = document.getElementById('close-draggable');
let trashCan = document.getElementById('trash-can');

closeDraggable.addEventListener('dragstart', function(event) {
    event.dataTransfer.setData('text/plain', 'close');
});

trashCan.addEventListener('dragover', function(event) {
    event.preventDefault();
});

trashCan.addEventListener('drop', function(event) {
    event.preventDefault();
    if (event.dataTransfer.getData('text') === 'close') {
        document.getElementById('overlay').style.display = 'none';
        document.getElementById('popup').style.display = 'none';
    }
});

// You can add more JavaScript here for other functionalities as needed.
