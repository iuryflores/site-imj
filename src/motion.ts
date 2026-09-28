/** Progressive enhancement: navigation and content work without animations. */
export function initMotion(): void {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const animations = new Set<Animation>();

  function reveal(element: HTMLElement, delay: number): void {
    if (preference.matches) return;
    // Keep click targets stationary while interactive cards and forms fade in.
    const offset = element.querySelector('a, button, input, select, textarea') ? '0 0' : '0 18px';
    const animation = element.animate(
      [{ opacity: 0, translate: offset }, { opacity: 1, translate: '0 0' }],
      { duration: 520, delay, easing: 'cubic-bezier(.22, 1, .36, 1)', fill: 'backwards' },
    );
    animations.add(animation);
    void animation.finished.catch(() => {}).finally(() => animations.delete(animation));
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      let position = 0;
      for (const entry of entries) {
        if (!entry.isIntersecting || !(entry.target instanceof HTMLElement)) continue;
        reveal(entry.target, Math.min(position++ * 65, 195));
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.08 });

    document.querySelectorAll<HTMLElement>(
      '.section-heading, .service, .client-card, .project, .value, .principle, .cta, .contact-grid > div',
    ).forEach(element => observer.observe(element));

    // Never leave a focused link or field waiting for its entrance animation.
    document.addEventListener('focusin', event => {
      if (!(event.target instanceof HTMLElement)) return;
      const target = event.target;
      animations.forEach(animation => {
        const effect = animation.effect;
        if (effect instanceof KeyframeEffect && effect.target?.contains(target)) animation.cancel();
      });
    });

    preference.addEventListener('change', () => {
      if (preference.matches) animations.forEach(animation => animation.cancel());
    });
    window.addEventListener('pageshow', event => {
      if (event.persisted) animations.forEach(animation => animation.cancel());
    });
  }
}
