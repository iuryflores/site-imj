const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  nav.classList.toggle('is-open', open);
});
document.addEventListener('keydown', event => { if (event.key === 'Escape') { menu?.setAttribute('aria-expanded', 'false'); nav?.classList.remove('is-open'); } });
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  document.querySelectorAll('[data-category]').forEach(card => { card.hidden = button.dataset.filter !== 'todos' && card.dataset.category !== button.dataset.filter; });
}));
const dialog = document.querySelector('dialog');
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  document.querySelector('#dialog-title').textContent = button.dataset.project;
  document.querySelector('#dialog-description').textContent = button.dataset.description;
  dialog.showModal();
}));
document.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
document.querySelector('#contact-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const form = new FormData(event.target);
  const message = `Olá, IMJ Sistemas!\n\nMeu nome é ${form.get('name')}.\nE-mail: ${form.get('email')}\nEmpresa: ${form.get('company') || 'Não informada'}\nInteresse: ${form.get('service')}\n\n${form.get('message')}`;
  document.querySelector('#message-preview').textContent = message;
  document.querySelector('#contact-result').hidden = false;
  window.location.href = `mailto:contato@imjsistemas.com.br?subject=${encodeURIComponent('Contato pelo site — ' + form.get('service'))}&body=${encodeURIComponent(message)}`;
  document.querySelector('#contact-result').scrollIntoView({ behavior: 'smooth', block: 'center' });
});
document.querySelector('#download-message')?.addEventListener('click', () => {
  const url = URL.createObjectURL(new Blob([document.querySelector('#message-preview').textContent], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a'); link.href = url; link.download = 'mensagem-imj.txt'; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
});
