// Gallery lightbox
let current = 0;
let images = [];

// Cache DOM elements
let lb, lbImg, lbCaption;

function getElements() {
  if (!lb) lb = document.getElementById('lightbox');
  if (!lbImg) lbImg = document.getElementById('lightbox-img');
  if (!lbCaption) lbCaption = document.getElementById('lightbox-caption');
  return { lb, lbImg, lbCaption };
}

document.querySelectorAll('.gallery-thumb').forEach((img, i) => {
  images.push({ src: img.src, caption: img.dataset.caption || '' });
  img.addEventListener('click', () => openLightbox(i));
});

function openLightbox(i) {
  current = i;
  const { lb, lbImg, lbCaption } = getElements();

  if (lbImg) lbImg.src = images[i].src;
  if (lbCaption) lbCaption.textContent = images[i].caption;
  if (lb) lb.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const { lb } = getElements();
  if (lb) lb.classList.remove('active');
  document.body.style.overflow = '';
}

function shiftLightbox(dir) {
  current = (current + dir + images.length) % images.length;
  const { lbImg, lbCaption } = getElements();
  if (lbImg) lbImg.src = images[current].src;
  if (lbCaption) lbCaption.textContent = images[current].caption;
}

document.addEventListener('keydown', e => {
  const { lb } = getElements();
  if (!lb || !lb.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft')  shiftLightbox(-1);
  if (e.key === 'ArrowRight') shiftLightbox(1);
});
