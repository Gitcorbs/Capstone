document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default jump

    const targetId = this.getAttribute('href').substring(1); // Remove '#'
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      // Scroll to the section smoothly
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Service card modal logic
const serviceCards = document.querySelectorAll('.service-card');
const modal = document.getElementById('service-modal');
const modalTitle = document.getElementById('service-modal-title');
const modalDoctors = document.querySelector('.doctors-list');
const modalDesc = document.querySelector('.modal-desc');
const modalClose = document.getElementById('service-modal-close');

function openModal(card) {
  const title = card.querySelector('h3')?.textContent || 'Service';
  const doctors = card.dataset.doctors || 'Not available';
  const description = card.dataset.description || card.querySelector('p')?.textContent || '';

  modalTitle.textContent = title;
  // Format doctors string into a neat list (split by ';')
  if (doctors.includes(';')) {
    const items = doctors.split(';').map(d => d.trim()).filter(Boolean);
    modalDoctors.innerHTML = '';
    const ul = document.createElement('ul');
    ul.style.margin = '0.3rem 0 0 1rem';
    items.forEach(name => {
      const li = document.createElement('li');
      li.textContent = name;
      ul.appendChild(li);
    });
    modalDoctors.appendChild(ul);
  } else {
    modalDoctors.textContent = doctors;
  }
  modalDesc.textContent = description;

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

serviceCards.forEach(card => {
  card.addEventListener('click', () => openModal(card));
});

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  // Close when clicking outside content
  if (e.target === modal) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('open')) {
    closeModal();
  }
});
