const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");
const quienesBtn = document.getElementById("quienesBtn");
const submenu = document.getElementById("submenu");

function cerrarMenu() {
  navigation?.classList.remove("open");
  submenu?.classList.remove("show");
  menuToggle?.setAttribute("aria-expanded", "false");
  quienesBtn?.setAttribute("aria-expanded", "false");
}

function mostrarPagina(id) {
  const pagina = document.getElementById(id);

  if (!pagina || !pagina.classList.contains("page")) return;

  document.querySelectorAll(".page").forEach(elemento => {
    elemento.classList.toggle("active", elemento.id === id);
  });

  document.querySelectorAll("[data-page]").forEach(enlace => {
    const activo = enlace.dataset.page === id;
    enlace.classList.toggle("active-link", activo);

    if (activo) {
      enlace.setAttribute("aria-current", "page");
    } else {
      enlace.removeAttribute("aria-current");
    }
  });

  cerrarMenu();
  window.scrollTo({ top: 0, behavior: "smooth" });
  history.replaceState(null, "", "#" + id);
}

menuToggle?.addEventListener("click", () => {
  const abierto = navigation.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(abierto));
});

quienesBtn?.addEventListener("click", () => {
  const abierto = submenu.classList.toggle("show");
  quienesBtn.setAttribute("aria-expanded", String(abierto));
});

document.querySelectorAll("[data-page]").forEach(enlace => {
  enlace.addEventListener("click", evento => {
    evento.preventDefault();
    mostrarPagina(enlace.dataset.page);
  });
});

document.querySelectorAll("[data-go]").forEach(boton => {
  boton.addEventListener("click", () => {
    mostrarPagina(boton.dataset.go);
  });
});

document.querySelectorAll("[data-section]").forEach(enlace => {
  enlace.addEventListener("click", evento => {
    evento.preventDefault();

    const destino = document.getElementById(enlace.dataset.section);
    if (!destino) return;

    mostrarPagina("nosotros");

    setTimeout(() => {
      destino.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", "#" + destino.id);
    }, 100);
  });
});

document.addEventListener("click", evento => {
  if (
    submenu &&
    quienesBtn &&
    !submenu.contains(evento.target) &&
    !quienesBtn.contains(evento.target)
  ) {
    submenu.classList.remove("show");
    quienesBtn.setAttribute("aria-expanded", "false");
  }
});

const worldIntro = document.getElementById("worldIntro");
const worldMap = document.getElementById("worldMap");
const worldActivity = document.getElementById("worldActivity");
const worldEnding = document.getElementById("worldEnding");

const enterWorld = document.getElementById("enterWorld");
const backToWorld = document.getElementById("backToWorld");
const restartWorld = document.getElementById("restartWorld");

const worldTitle = document.getElementById("worldTitle");
const worldDescription = document.getElementById("worldDescription");
const activityTitle = document.getElementById("activityTitle");
const activitySituation = document.getElementById("activitySituation");
const activityPrompt = document.getElementById("activityPrompt");
const activityOptions = document.getElementById("activityOptions");
const activityFeedback = document.getElementById("activityFeedback");
const gameDay = document.getElementById("gameDay");
const gameProgress = document.getElementById("gameProgress");
const endingText = document.getElementById("endingText");

const dias = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes"
];

const escenarios = [
  {
    lugar: "salon",
    titulo: "Una tarea pendiente",
    descripcion: "El profesor está explicando matemáticas. Tienes un trabajo pendiente y algunos compañeros te invitan a distraerte.",
    situacion: "El profesor recuerda que debes entregar el trabajo. Puedes terminarlo ahora o seguir hablando con tus compañeros y arriesgarte a entregarlo tarde.",
    pregunta: "¿Qué decides hacer?",
    opciones: [
      {
        texto: "Terminar y entregar el trabajo.",
        resultado: "Organizaste tu tiempo y cumpliste con tu responsabilidad. Ahora puedes participar en la siguiente actividad.",
        puntos: 2
      },
      {
        texto: "Seguir hablando y dejarlo para después.",
        resultado: "Te has distraído y ahora tienes menos tiempo. Podrías entregar el trabajo tarde y afectar tu calificación.",
        puntos: -1
      },
      {
        texto: "Pedir ayuda para organizar lo que te falta.",
        resultado: "Reconociste que necesitabas apoyo. Con un plan claro puedes avanzar y reducir la presión.",
        puntos: 1
      }
    ]
  },
  {
    lugar: "salon",
    titulo: "Una evaluación inesperada",
    descripcion: "En la clase de inglés, el profesor anuncia una actividad con preguntas de inglés y matemáticas.",
    situacion: "Te preocupa equivocarte porque no recuerdas todos los temas. Algunos compañeros terminan rápidamente.",
    pregunta: "¿Cómo afrontas la actividad?",
    opciones: [
      {
        texto: "Leer con calma y resolver una pregunta a la vez.",
        resultado: "Te concentraste en tu propio trabajo y pudiste pensar con más claridad.",
        puntos: 2
      },
      {
        texto: "Apresurarte para terminar antes que los demás.",
        resultado: "La prisa puede hacer que cometas errores. Revisar las preguntas con calma suele ser más útil.",
        puntos: -1
      },
      {
        texto: "Preguntar al profesor si puede aclarar las instrucciones.",
        resultado: "Pedir una aclaración es una forma responsable de afrontar una dificultad.",
        puntos: 1
      }
    ]
  },
  {
    lugar: "orientacion",
    titulo: "Una conversación importante",
    descripcion: "Has tenido varios días de tareas y evaluaciones. Sientes presión por las calificaciones y por el próximo año escolar.",
    situacion: "La psicóloga del colegio está disponible en orientación. Puedes hablar con ella sobre lo que te preocupa.",
    pregunta: "¿Qué haces?",
    opciones: [
      {
        texto: "Hablar con la psicóloga y explicar cómo te sientes.",
        resultado: "Expresar tus preocupaciones puede ayudarte a encontrar apoyo y estrategias para afrontar las dificultades.",
        puntos: 2
      },
      {
        texto: "Decir que todo está bien aunque sigues preocupado.",
        resultado: "No tienes que resolverlo todo sin ayuda. Puedes buscar un momento seguro para hablar de lo que te sucede.",
        puntos: -1
      },
      {
        texto: "Pedir orientación para organizar las responsabilidades escolares.",
        resultado: "Recibiste ideas para establecer prioridades y distribuir las tareas de manera más manejable.",
        puntos: 2
      }
    ]
  },
  {
    lugar: "cuarto",
    titulo: "Al terminar el día",
    descripcion: "Llegaste a tu cuarto. Mañana tienes clases y todavía te quedan algunas responsabilidades.",
    situacion: "Estás cansado y necesitas decidir cómo aprovechar el tiempo que te queda antes de dormir.",
    pregunta: "¿Qué haces esta noche?",
    opciones: [
      {
        texto: "Organizar las tareas y preparar lo necesario para mañana.",
        resultado: "Planificar tus pendientes puede ayudarte a comenzar el día siguiente con mayor claridad.",
        puntos: 2
      },
      {
        texto: "Intentar hacer todo sin descansar.",
        resultado: "Ignorar el cansancio puede hacer más difícil concentrarte. Es importante equilibrar las responsabilidades y el descanso.",
        puntos: -1
      },
      {
        texto: "Tomar una pausa y después completar una tarea prioritaria.",
        resultado: "Combinar una pausa con un plan realista te permite cuidar tu bienestar sin olvidar tus responsabilidades.",
        puntos: 2
      }
    ]
  },
  {
    lugar: "salon",
    titulo: "Un problema con compañeros",
    descripcion: "Un compañero hace comentarios que te incomodan mientras intentas concentrarte en una actividad.",
    situacion: "Te cuesta seguir trabajando y sientes frustración. Todavía debes completar la actividad de clase.",
    pregunta: "¿Cómo respondes?",
    opciones: [
      {
        texto: "Hablar con respeto y explicar que necesitas concentrarte.",
        resultado: "Comunicar tus necesidades con respeto puede ayudar a establecer límites y continuar con la actividad.",
        puntos: 2
      },
      {
        texto: "Responder con insultos para devolverle el comentario.",
        resultado: "Una discusión puede aumentar el conflicto y dificultar la concentración. Intenta buscar una respuesta más tranquila.",
        puntos: -1
      },
      {
        texto: "Buscar apoyo del profesor si la situación continúa.",
        resultado: "Pedir ayuda a un adulto de confianza es válido cuando una situación afecta tu tranquilidad o tu aprendizaje.",
        puntos: 2
      }
    ]
  }
];

let diaActual = 0;
let puntuacion = 0;
let visitas = new Set();
let decisiones = 0;

function actualizarDia() {
  if (diaActual >= dias.length) {
    terminarSemana();
    return;
  }

  gameDay.textContent = dias[diaActual];
  gameProgress.textContent = `Día ${diaActual + 1} de ${dias.length}`;
}

function iniciarJuego() {
  diaActual = 0;
  puntuacion = 0;
  decisiones = 0;
  visitas = new Set();

  worldIntro.hidden = true;
  worldActivity.hidden = true;
  worldEnding.hidden = true;
  worldMap.hidden = false;

  actualizarDia();
}

function mostrarMapa() {
  worldIntro.hidden = true;
  worldActivity.hidden = true;
  worldEnding.hidden = true;
  worldMap.hidden = false;
  actualizarDia();
}

function abrirLugar(lugar) {
  if (diaActual >= dias.length) {
    terminarSemana();
    return;
  }

  const disponibles = escenarios.filter(escenario => escenario.lugar === lugar);
  let escenario = disponibles.find(item => !visitas.has(item.titulo));

  if (!escenario) {
    if (lugar === "salon") {
      escenario = escenarios.find(item => item.lugar === "salon");
    } else {
      escenario = disponibles[0];
    }
  }

  if (!escenario) return;

  worldMap.hidden = true;
  worldActivity.hidden = false;
  worldEnding.hidden = true;

  worldTitle.textContent = `${dias[diaActual]} · ${nombreLugar(lugar)}`;
  worldDescription.textContent = escenario.descripcion;
  activityTitle.textContent = escenario.titulo;
  activitySituation.textContent = escenario.situacion;
  activityPrompt.textContent = escenario.pregunta;
  activityFeedback.hidden = true;
  activityFeedback.textContent = "";
  activityOptions.replaceChildren();

  escenario.opciones.forEach(opcion => {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "activity-option";
    boton.textContent = opcion.texto;

    boton.addEventListener("click", () => {
      elegirOpcion(opcion, escenario, boton);
    });

    activityOptions.appendChild(boton);
  });

  visitas.add(escenario.titulo);
}

function nombreLugar(lugar) {
  const nombres = {
    salon: "Salón de clases",
    orientacion: "Orientación escolar",
    cuarto: "Cuarto del estudiante"
  };

  return nombres[lugar] || "Escuela";
}

function elegirOpcion(opcion, escenario, botonElegido) {
  if (botonElegido.disabled) return;

  puntuacion += opcion.puntos;
  decisiones += 1;

  activityFeedback.textContent = opcion.resultado;
  activityFeedback.hidden = false;

  activityOptions.querySelectorAll("button").forEach(boton => {
    boton.disabled = true;
  });

  const continuar = document.createElement("button");
  continuar.type = "button";
  continuar.className = "hero-button";
  continuar.textContent = "Continuar";

  continuar.addEventListener("click", () => {
    diaActual += 1;

    if (diaActual >= dias.length) {
      terminarSemana();
    } else {
      mostrarMapa();
    }
  });

  activityOptions.appendChild(continuar);
}

function terminarSemana() {
  worldIntro.hidden = true;
  worldMap.hidden = true;
  worldActivity.hidden = true;
  worldEnding.hidden = false;

  if (puntuacion >= 6) {
    endingText.textContent = "Durante la semana tomaste varias decisiones para organizar tus responsabilidades, pedir apoyo y cuidar tu bienestar. Sigue aplicando las estrategias que te funcionaron.";
  } else if (puntuacion >= 2) {
    endingText.textContent = "Tu semana tuvo momentos fáciles y otros difíciles. Puedes aprender de cada decisión y probar nuevas formas de organizar el tiempo, descansar y pedir ayuda.";
  } else {
    endingText.textContent = "La semana estuvo llena de dificultades, pero eso no significa que no puedas mejorar. Reconocer lo que te cuesta y buscar apoyo son primeros pasos para afrontar el estrés académico.";
  }
}

enterWorld?.addEventListener("click", iniciarJuego);

backToWorld?.addEventListener("click", mostrarMapa);

restartWorld?.addEventListener("click", iniciarJuego);

document.querySelectorAll(".world-place").forEach(boton => {
  boton.addEventListener("click", () => {
    abrirLugar(boton.dataset.place);
  });
});

const hashInicial = window.location.hash.replace("#", "");
const paginaInicial = document.getElementById(hashInicial);

if (paginaInicial && paginaInicial.classList.contains("page")) {
  mostrarPagina(hashInicial);
} else {
  mostrarPagina("inicio");
}
document.querySelectorAll("[data-section]").forEach(enlace => {
  enlace.addEventListener("click", evento => {
    evento.preventDefault();

    const id = enlace.dataset.section;
    const marco = document.getElementById(id);
    const nosotros = document.getElementById("nosotros");

    if (!marco || !nosotros) return;

    mostrarPagina("nosotros");

    nosotros.querySelectorAll(".frame-layout > .content-card").forEach(tarjeta => {
      tarjeta.classList.remove("marco-activo");
    });

    marco.classList.add("marco-activo");
    history.replaceState(null, "", "#"+id);
    marco.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});