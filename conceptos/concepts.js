const courseResults = {
  certificate: {
    title: 'Preparación para examen oficial',
    text: 'Te orientamos según tu nivel, convocatoria y plazo. Incluye simulacros y gestión de la matrícula del examen cuando lo necesites.'
  },
  school: {
    title: 'Apoyo escolar personalizado',
    text: 'Grupos reducidos y seguimiento adaptado para Primaria, ESO, Bachillerato y grados, también con asignaturas en inglés.'
  },
  conversation: {
    title: 'Curso de idioma adaptado a tu objetivo',
    text: 'Inglés, francés, alemán, italiano o portugués con modalidad presencial, online o híbrida.'
  },
  organisation: {
    title: 'Plan para empresa o centro educativo',
    text: 'Formación sectorial bonificable mediante FUNDAE o extraescolares diseñadas para el centro y las edades del alumnado.'
  }
};

document.querySelectorAll('[data-course]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-course]').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    const result = courseResults[button.dataset.course];
    const box = document.querySelector('#course-result');
    if (!box || !result) return;
    box.querySelector('strong').textContent = result.title;
    box.querySelector('p').textContent = result.text;
    box.classList.add('visible');
  });
});

const briefState = { service: 'carpinteria', stage: 'una idea inicial' };
const serviceNames = { carpinteria: 'carpintería a medida', cubiertas: 'cubierta o estructura', reforma: 'reforma con gestión integral' };
const updateBrief = () => {
  const result = document.querySelector('#brief-result');
  const link = document.querySelector('#brief-email');
  if (!result || !link) return;
  const detail = document.querySelector(`[data-detail="${briefState.service}"]`)?.value || 'por concretar';
  const context = document.querySelector(`[data-context="${briefState.service}"]`)?.value || 'por concretar';
  const location = document.querySelector('#brief-location')?.value.trim() || 'por concretar';
  const timing = document.querySelector('#brief-timing')?.value || 'por concretar';
  const notes = document.querySelector('#brief-notes')?.value.trim() || 'sin detalles adicionales';
  const sentence = `Quiero consultar un proyecto de ${serviceNames[briefState.service]}. Tengo ${briefState.stage}.`;
  result.querySelector('p').textContent = `${sentence} Ubicación: ${location}. Plazo: ${timing}.`;
  const body = `Hola,\n\n${sentence}\n\nTipo de trabajo: ${detail}\nContexto: ${context}\nUbicación: ${location}\nPlazo: ${timing}\nDetalles: ${notes}\n\nMi nombre y teléfono:\n`;
  link.href = `mailto:info@cesar-fernandez.es?subject=${encodeURIComponent('Consulta de proyecto desde la propuesta web')}&body=${encodeURIComponent(body)}`;
};

const selectService = (service) => {
  if (!serviceNames[service]) return;
  briefState.service = service;
  document.querySelectorAll('[data-service]').forEach((button) => {
    const active = button.dataset.service === service;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  document.querySelectorAll('[data-service-panel]').forEach((panel) => {
    panel.hidden = panel.dataset.servicePanel !== service;
  });
  updateBrief();
};

document.querySelectorAll('[data-service]').forEach((button) => {
  button.addEventListener('click', () => selectService(button.dataset.service));
});
document.querySelectorAll('[data-service-link]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const service = link.dataset.serviceLink;
    selectService(service);
    if (link.dataset.detailValue) {
      const detail = document.querySelector(`[data-detail="${service}"]`);
      detail.value = link.dataset.detailValue;
      updateBrief();
    }
    const target = document.querySelector(`#detalle-${service}`);
    target?.scrollIntoView({ behavior: reduceMotion.matches ? 'instant' : 'smooth', block: 'start' });
  });
});

document.querySelectorAll('[data-brief-group]').forEach((button) => {
  button.addEventListener('click', () => {
    const group = button.dataset.briefGroup;
    document.querySelectorAll(`[data-brief-group="${group}"]`).forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    briefState[group] = button.dataset.value;
    updateBrief();
  });
});

updateBrief();
document.querySelectorAll('#brief-location, #brief-timing, #brief-notes, [data-detail], [data-context]').forEach((field) => {
  field.addEventListener('input', updateBrief);
  field.addEventListener('change', updateBrief);
});

const initialService = location.hash.match(/^#detalle-(carpinteria|cubiertas|reforma)$/)?.[1];
if (initialService) selectService(initialService);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (!reduceMotion.matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.section-head, .path-card, .benefit, .intensive-card, .b2b-card, .service-decision article, .process-grid article, .faq-list details').forEach((element) => {
    element.classList.add('reveal');
    observer.observe(element);
  });
}
