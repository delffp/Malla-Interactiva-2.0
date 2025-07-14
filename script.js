const materias = document.querySelectorAll('.materia');

materias.forEach(materia => {
  materia.addEventListener('click', () => {
    if (materia.classList.contains('bloqueada')) {
      const correlativas = materia.dataset.correlativas?.split(',') || [];
      alert('Para cursar esta materia debés aprobar: ' + correlativas.map(id => buscarNombre(id)).join(', '));
      return;
    }

    materia.classList.toggle('aprobada');

    actualizarEstados();
  });
});

function buscarNombre(id) {
  const mat = document.querySelector(`.materia[data-id="${id}"]`);
  return mat ? mat.textContent : "Desconocida";
}

function actualizarEstados() {
  materias.forEach(materia => {
    const correlativas = materia.dataset.correlativas?.split(',') || [];

    if (correlativas.length > 0 && !materia.classList.contains('aprobada')) {
      const todasAprobadas = correlativas.every(id => {
        const correlativa = document.querySelector(`.materia[data-id="${id}"]`);
        return correlativa && correlativa.classList.contains('aprobada');
      });

      if (todasAprobadas) {
        materia.classList.remove('bloqueada');
      } else {
        materia.classList.add('bloqueada');
      }
    }
  });
}
