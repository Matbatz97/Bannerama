// Shared by every page: mobile menu, Products dropdown, footer year and the contact form
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
  menuBtn.textContent = open ? 'Close' : 'Menu';
});
navLinks.addEventListener('click', e => {
  if (e.target.closest('a') && navLinks.classList.contains('open')) menuBtn.click();
});

// Products dropdown: opens on hover with a mouse, and on tap or keyboard with the arrow button
const drop = document.querySelector('.nav-drop');
if (drop) {
  const toggle = drop.querySelector('.drop-toggle');
  const setOpen = open => {
    drop.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
  };
  toggle.addEventListener('click', () => setOpen(!drop.classList.contains('open')));
  document.addEventListener('click', e => { if (!drop.contains(e.target)) setOpen(false); });
  drop.addEventListener('keydown', e => {
    if (e.key === 'Escape') { setOpen(false); toggle.focus(); }
  });
}

document.getElementById('year').textContent = new Date().getFullYear();

// The contact form opens the customer's email app with the message filled in
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(contactForm);
    const error = document.getElementById('contactError');
    if (!data.get('name').trim() || !contactForm.email.checkValidity() || !data.get('message').trim()) {
      error.textContent = 'Please add your name, a valid email and a message.';
      error.hidden = false;
      return;
    }
    error.hidden = true;
    const body = [
      data.get('message'),
      '',
      `Name: ${data.get('name')}`,
      `Email: ${data.get('email')}`,
      data.get('phone') ? `Phone: ${data.get('phone')}` : '',
      `Interested in: ${data.get('topic')}`
    ].filter(Boolean).join('\n');
    const subject = `Banner enquiry: ${data.get('topic')}`;
    location.href = `mailto:${contactForm.dataset.to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
