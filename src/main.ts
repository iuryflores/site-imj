import './styles.css';
import { initMotion } from './motion';

initMotion();

const menu = document.querySelector<HTMLButtonElement>('.menu-toggle');
const nav = document.querySelector<HTMLElement>('.nav');

function setMenuOpen(open: boolean): void {
  menu?.setAttribute('aria-expanded', String(open));
  menu?.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  nav?.classList.toggle('is-open', open);
}

menu?.addEventListener('click', () => setMenuOpen(menu.getAttribute('aria-expanded') !== 'true'));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') setMenuOpen(false);
});

const filters = document.querySelectorAll<HTMLButtonElement>('[data-filter]');
const projects = document.querySelectorAll<HTMLElement>('[data-category]');
filters.forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  if (!filter) return;
  filters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  projects.forEach(card => {
    card.hidden = filter !== 'todos' && card.dataset.category !== filter;
  });
}));

const dialog = document.querySelector<HTMLDialogElement>('dialog');
const dialogTitle = document.querySelector<HTMLElement>('#dialog-title');
const dialogDescription = document.querySelector<HTMLElement>('#dialog-description');
document.querySelectorAll<HTMLButtonElement>('[data-project]').forEach(button => {
  button.addEventListener('click', () => {
    if (!dialog || !dialogTitle || !dialogDescription) return;
    dialogTitle.textContent = button.dataset.project ?? '';
    dialogDescription.textContent = button.dataset.description ?? '';
    dialog.showModal();
  });
});
document.querySelector<HTMLButtonElement>('.dialog-close')?.addEventListener('click', () => dialog?.close());
dialog?.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });

const contactForm = document.querySelector<HTMLFormElement>('#contact-form');
const messagePreview = document.querySelector<HTMLElement>('#message-preview');
const contactResult = document.querySelector<HTMLElement>('#contact-result');

function textField(form: FormData, name: string): string {
  const value = form.get(name);
  return typeof value === 'string' ? value.trim() : '';
}

contactForm?.addEventListener('submit', event => {
  event.preventDefault();
  if (!messagePreview || !contactResult) return;
  const form = new FormData(contactForm);
  const service = textField(form, 'service');
  const message = `Olá, IMJ Sistemas!\n\nMeu nome é ${textField(form, 'name')}.\nE-mail: ${textField(form, 'email')}\nEmpresa: ${textField(form, 'company') || 'Não informada'}\nInteresse: ${service}\n\n${textField(form, 'message')}`;
  messagePreview.textContent = message;
  contactResult.hidden = false;
  window.location.href = `mailto:contato@imjsistemas.com.br?subject=${encodeURIComponent('Contato pelo site — ' + service)}&body=${encodeURIComponent(message)}`;
  contactResult.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    block: 'center',
  });
});

document.querySelector<HTMLButtonElement>('#download-message')?.addEventListener('click', () => {
  const message = messagePreview?.textContent;
  if (!message) return;
  const url = URL.createObjectURL(new Blob([message], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'mensagem-imj.txt';
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
