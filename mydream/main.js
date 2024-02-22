document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.center-text').addEventListener('click', () => {
      window.history.back();
  });

  const text = "me and my family going somewhere I think some sort of ball or smthing cuz we had prom dresses. This lady was taking us there in like a teacup n pushing us n on the way theres like so many hills n the whole area looks spooky. There was also a zoo section that we stopped n looked around at n there was like giant spiders chihuahuas pigeons n other stuff. Me n my sister were looking at them n talking abt how scary it wud b if the giant bugs were in our house n then out of nowhere this cat popped up and all the zoo things dropped to the ground. N then when the cat started running toward us the zoo things also came out of the cages n ran towards us but there was this giant eyeball thingy that was like a teleporter n we went in. N in there like the whole world was scarier n it was dark red everywhere so we went out through the portal before it closed n the zoo thingies came in. N then we went to go look for my parents in this scary house and I woke up.";
  const words = text.split(/\s+/);
  const body = document.body;

  words.forEach(word => {
      const span = document.createElement('span');
      span.textContent = word;
      span.className = 'word';
      placeWord(span);
      body.appendChild(span);
      animateWord(span);
  });

  document.addEventListener('mousemove', (e) => {
      document.querySelectorAll('.word').forEach(word => {
          const dx = word.offsetLeft + word.clientWidth / 2 - e.clientX;
          const dy = word.offsetTop + word.clientHeight / 2 - e.clientY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
              word.style.transform = `translate(${dx / 2}px, ${dy / 2}px)`;
          }
      });
  });
});

function placeWord(word) {
  const x = Math.random() * (window.innerWidth - word.clientWidth);
  const y = Math.random() * (window.innerHeight - word.clientHeight);
  word.style.left = `${x}px`;
  word.style.top = `${y}px`;
}

function animateWord(word) {
  let xSpeed = Math.random() * 2 - 1;
  let ySpeed = Math.random() * 2 - 1;

  function move() {
      const rect = word.getBoundingClientRect();
      if (rect.left + xSpeed < 0 || rect.right + xSpeed > window.innerWidth) xSpeed *= -1;
      if (rect.top + ySpeed < 0 || rect.bottom + ySpeed > window.innerHeight) ySpeed *= -1;

      word.style.left = `${word.offsetLeft + xSpeed}px`;
      word.style.top = `${word.offsetTop + ySpeed}px`;

      requestAnimationFrame(move);
  }

  move();
}
