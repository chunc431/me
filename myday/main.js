document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.title').addEventListener('click', function() {
        window.history.back();
    });

    document.querySelectorAll('p').forEach(p => {
        let words = p.innerText.split(/\s+/).map(word => {
            let span = document.createElement('span');
            span.innerText = word;
            span.className = 'draggable';
            span.setAttribute('draggable', true);
            return span.outerHTML; 
        }).join(' '); 
        p.innerHTML = words;
    });

    function handleDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.innerText);
        e.dataTransfer.effectAllowed = 'move';
        this.classList.add('dragging');
    }

    function handleDragOver(e) {
        e.preventDefault(); 
        e.dataTransfer.dropEffect = 'move';
    }

    function handleDrop(e) {
        e.preventDefault();
        const data = e.dataTransfer.getData('text');
        e.target.insertAdjacentHTML('beforebegin', `<span class="draggable" draggable="true">${data}</span> `);
        document.querySelector('.dragging').remove(); 
        rebindDragEvents(); 
    }

    rebindDragEvents();

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
