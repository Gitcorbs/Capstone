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