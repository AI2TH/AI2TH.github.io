// Gallery lightbox
let current = 0;
let images = [];

// Cache DOM elements
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lightbox-img');
const lbCaption = document.getElementById('lightbox-caption');

document.querySelectorAll('.gallery-thumb').forEach((img, i) => {
  images.push({ src: img.src, caption: img.dataset.caption || '' });
  img.addEventListener('click', () => openLightbox(i));
});

function openLightbox(i) {
  current = i;
  lbImg.src = images[i].src;
  lbCaption.textContent = images[i].caption;
  lb.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lb.classList.remove('active');
  document.body.style.overflow = '';
}

function shiftLightbox(dir) {
  current = (current + dir + images.length) % images.length;
  lbImg.src = images[current].src;
  lbCaption.textContent = images[current].caption;
}

document.addEventListener('keydown', e => {
  if (!lb.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft')  shiftLightbox(-1);
  if (e.key === 'ArrowRight') shiftLightbox(1);
});
