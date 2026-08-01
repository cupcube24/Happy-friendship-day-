// Page flow + animations
document.addEventListener('DOMContentLoaded', () => {
  const page1 = document.getElementById('page1');
  const page2 = document.getElementById('page2');
  const page3 = document.getElementById('page3');
  const page4 = document.getElementById('page4');

  const openGiftBtn = document.getElementById('openGiftBtn');
  const gift = document.getElementById('gift');
  const lid = document.getElementById('lid');

  const typewriterEl = document.getElementById('typewriter');
  const page2Heading = document.getElementById('page2-heading');
  const surpriseBtn = document.getElementById('surpriseBtn');

  const openPhotoBtn = document.getElementById('openPhotoBtn');
  const photoModal = document.getElementById('photoModal');
  const modalClose = document.getElementById('modalClose');
  const lastBtn = document.getElementById('lastBtn');

  const confettiCanvas = document.getElementById('confetti-canvas');

  // Utility: switch pages
  function showPage(nPage){
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    nPage.classList.add('active');
    window.scrollTo({top:0, behavior:'smooth'});
  }

  // Page 1: gift opening
  openGiftBtn.addEventListener('click', () => {
    // add open class to animate lid
    gift.classList.add('open');

    // small scale animation on card
    const card = page1.querySelector('.card');
    card.style.transform = 'scale(0.98)';
    setTimeout(() => card.style.transform = '', 900);

    // after animation show page 2
    setTimeout(() => {
      showPage(page2);
      startTypewriterSequence();
    }, 900);
  });

  // Typewriter sequence for Page 2
  const lines = [
    "Do you know which day it is?",
    { pause: 700 },
    "Yes, it is Sunday, right?",
    { pause: 700 },
    "But it is also Friendship Day...",
  ];

  const longPause = 700;
  const typingSpeed = 36; // ms per char

  async function startTypewriterSequence(){
    typewriterEl.textContent = '';
    page2Heading.style.display = 'none';
    for (let item of lines){
      if (typeof item === 'string'){
        await typeText(typewriterEl, item, typingSpeed);
        // small pause between lines
        await wait(480);
        typewriterEl.textContent += "\n\n";
      } else if (item.pause){
        await wait(item.pause);
      }
    }

    await wait(500);
    // reveal big heading
    page2Heading.style.display = 'block';
    page2Heading.animate([{opacity:0, transform:'translateY(8px)'},{opacity:1, transform:'none'}], {duration:420, easing:'cubic-bezier(.2,.9,.2,1)'});
  }

  function typeText(el, text, speed=40){
    return new Promise(resolve => {
      let i = 0;
      const interval = setInterval(() => {
        el.textContent += text[i++];
        if (i >= text.length){
          clearInterval(interval);
          resolve();
        }
      }, speed);
    });
  }
  function wait(ms){ return new Promise(r => setTimeout(r, ms)); }

  // Surprise button shows Page 3
  surpriseBtn.addEventListener('click', () => {
    showPage(page3);
  });

  // Page 3: open photo modal
  openPhotoBtn.addEventListener('click', () => {
    openModal();
  });

  function openModal(){
    photoModal.setAttribute('aria-hidden','false');
    // simple zoom-in for image (image loaded style will animate via CSS transform)
    // Ensure image exists, if not, show alt text.
  }
  function closeModal(){
    photoModal.setAttribute('aria-hidden','true');
  }
  modalClose.addEventListener('click', closeModal);
  photoModal.addEventListener('click', (e) => {
    if (e.target === photoModal) closeModal();
  });

  // The Last -> go to page 4 and launch confetti
  lastBtn.addEventListener('click', () => {
    closeModal();
    // small delay so modal fade completes
    setTimeout(() => {
      showPage(page4);
      startConfetti();
    }, 240);
  });

  // Also allow a button in page3 card to open photo directly
  // We made openPhotoBtn above for that; if user clicks card's "Open Photo" it opens modal
  // Optionally allow pressing Surprise-> page3
                          
