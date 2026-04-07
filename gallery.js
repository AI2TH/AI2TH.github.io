(() => {
  // Gallery lightbox
  let current = 0;
  const images = [];

  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbCaption = document.getElementById('lightbox-caption');

  document.querySelectorAll('.gallery-thumb').forEach((img, i) => {
    images.push({ src: img.src, caption: img.dataset.caption || '' });
    img.addEventListener('click', () => openLightbox(i));
  });

  function openLightbox(i) {
    current = i;
    if (lbImg) lbImg.src = images[i].src;
    if (lbCaption) lbCaption.textContent = images[i].caption;
    if (lb) lb.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (lb) lb.classList.remove('active');
    document.body.style.overflow = '';
  }

  function shiftLightbox(dir) {
    if (images.length === 0) return;
    current = (current + dir + images.length) % images.length;
    if (lbImg) lbImg.src = images[current].src;
    if (lbCaption) lbCaption.textContent = images[current].caption;
  }

  // Event listeners for lightbox controls
  if (lb) {
    lb.addEventListener('click', (e) => {
      // Close if clicking the backdrop or the close button
      if (e.target === lb || e.target.classList.contains('lightbox-close')) {
        closeLightbox();
      }
    });

    const prevBtn = lb.querySelector('.lightbox-prev');
    const nextBtn = lb.querySelector('.lightbox-next');

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        shiftLightbox(-1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        shiftLightbox(1);
      });
    }
  }

  document.addEventListener('keydown', e => {
    if (!lb || !lb.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft')  shiftLightbox(-1);
    if (e.key === 'ArrowRight') shiftLightbox(1);
  });
})();
