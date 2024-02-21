document.addEventListener('DOMContentLoaded', function() {
    // Convert each paragraph's text into draggable words
    document.querySelectorAll('p').forEach(p => {
        let words = p.innerText.split(/\s+/).map(word => {
            let span = document.createElement('span');
            span.innerText = word;
            span.className = 'draggable';
            span.setAttribute('draggable', true);
            return span.outerHTML; // Keep words separate without adding extra spaces here
        }).join(' '); // Add a space between spans to maintain natural text spacing
        p.innerHTML = words;
    });

    // Drag and Drop functionality
    function handleDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.innerText);
        e.dataTransfer.effectAllowed = 'move';
        this.classList.add('dragging');
    }

    function handleDragOver(e) {
        e.preventDefault(); // Allows us to drop
        e.dataTransfer.dropEffect = 'move';
    }

    function handleDrop(e) {
        e.preventDefault();
        const data = e.dataTransfer.getData('text');
        // Insert the dragged word with spaces before and after to maintain layout
        e.target.insertAdjacentHTML('beforebegin', `<span class="draggable" draggable="true">${data}</span> `);
        document.querySelector('.dragging').remove(); // Remove the original dragging element
        rebindDragEvents(); // Rebind the events to include newly added elements
    }

    function rebindDragEvents() {
        document.querySelectorAll('.draggable').forEach(word => {
            word.removeEventListener('dragstart', handleDragStart);
            word.removeEventListener('dragover', handleDragOver);
            word.removeEventListener('drop', handleDrop);
            word.addEventListener('dragstart', handleDragStart);
            word.addEventListener('dragover', handleDragOver);
            word.addEventListener('drop', handleDrop);
        });
    }

    rebindDragEvents();

    // Hover effects and making images disappear on click
    function addEffectToParagraphs(effectClass) {
        document.querySelectorAll('p').forEach(p => p.classList.add(effectClass));
    }

    function removeEffectFromParagraphs(effectClass) {
        document.querySelectorAll('p').forEach(p => p.classList.remove(effectClass));
    }

    document.querySelector('#img1').addEventListener('mouseenter', () => addEffectToParagraphs('text-glow'));
    document.querySelector('#img1').addEventListener('mouseleave', () => removeEffectFromParagraphs('text-glow'));

    document.querySelector('#img2').addEventListener('mouseenter', () => addEffectToParagraphs('text-blink'));
    document.querySelector('#img2').addEventListener('mouseleave', () => removeEffectFromParagraphs('text-blink'));

    document.querySelector('#img3').addEventListener('mouseenter', () => addEffectToParagraphs('text-shake'));
    document.querySelector('#img3').addEventListener('mouseleave', () => removeEffectFromParagraphs('text-shake'));

    document.querySelector('#img4').addEventListener('mouseenter', () => addEffectToParagraphs('text-shake'));
    document.querySelector('#img4').addEventListener('mouseleave', () => removeEffectFromParagraphs('text-shake'));

    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('click', function() {
            this.style.display = 'none';
        });
    });
});
