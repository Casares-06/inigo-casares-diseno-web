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

const briefState = { service: 'una obra de carpintería', stage: 'una idea inicial' };
const updateBrief = () => {
  const result = document.querySelector('#brief-result');
  const link = document.querySelector('#brief-email');
  if (!result || !link) return;
  const sentence = `Quiero consultar ${briefState.service} y ahora mismo tengo ${briefState.stage}.`;
  result.querySelector('p').textContent = `${sentence} El siguiente paso sería una conversación breve para revisar alcance, ubicación y plazos.`;
  link.href = `mailto:info@cesar-fernandez.es?subject=${encodeURIComponent('Consulta de proyecto desde la nueva web')}&body=${encodeURIComponent(sentence + '\n\nUbicación de la obra:\nPlazo aproximado:\nTeléfono:')}`;
};

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
