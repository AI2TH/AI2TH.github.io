// Gallery lightbox
let current = 0;
let images = [];

document.querySelectorAll('.gallery-thumb').forEach((img, i) => {
  images.push({ src: img.src, caption: img.dataset.caption || '' });
  img.addEventListener('click', () => openLightbox(i));
});

function openLightbox(i) {
  current = i;
  const lb = document.getElementById('lightbox');
  document.getElementById('lightbox-img').src = images[i].src;
  document.getElementById('lightbox-caption').textContent = images[i].caption;
  lb.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}

function shiftLightbox(dir) {
  current = (current + dir + images.length) % images.length;
  document.getElementById('lightbox-img').src = images[current].src;
  document.getElementById('lightbox-caption').textContent = images[current].caption;
}

document.addEventListener('keydown', e => {
  const lb = document.getElementById('lightbox');
  if (!lb.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft')  shiftLightbox(-1);
  if (e.key === 'ArrowRight') shiftLightbox(1);
});
