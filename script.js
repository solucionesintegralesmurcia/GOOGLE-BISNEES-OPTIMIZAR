const form = document.getElementById("businessForm");
const resultadoSection = document.getElementById("resultadoSection");
const resultado = document.getElementById("resultado");
const copiarBtn = document.getElementById("copiarBtn");
const pdfBtn = document.getElementById("pdfBtn");
const limpiarBtn = document.getElementById("limpiarBtn");
const nuevoBtn = document.getElementById("nuevoBtn");

const plantillasSector = {
  metalisteria: {
    categoriaPrincipal: "Metalistería",
    categorias: ["Carpintería metálica", "Cerrajero", "Soldador", "Proveedor de puertas", "Taller de aluminio"],
    servicios: ["Rejas a medida", "Puertas metálicas", "Cerramientos metálicos", "Barandillas", "Estructuras metálicas", "Trabajos en hierro", "Acero inoxidable", "Aluminio a medida"],
    fotos: ["trabajos terminados", "antes y después", "detalles de soldadura", "puertas instaladas", "rejas instaladas"]
  },
  cerrajeria: {
    categoriaPrincipal: "Cerrajero",
    categorias: ["Metalistería", "Carpintería metálica", "Proveedor de puertas", "Soldador"],
    servicios: ["Puertas metálicas", "Rejas", "Cerramientos", "Barandillas", "Trabajos metálicos a medida", "Instalación de puertas"],
    fotos: ["puertas instaladas", "rejas terminadas", "detalles del acabado", "trabajos antes y después"]
  },
  reformas: {
    categoriaPrincipal: "Empresa de reformas",
    categorias: ["Reformas de baños", "Reformas de cocinas", "Contratista general", "Albañil"],
    servicios: ["Reformas integrales", "Reformas de baños", "Reformas de cocinas", "Albañilería", "Pintura", "Fontanería", "Electricidad"],
    fotos: ["antes y después", "baños reformados", "cocinas reformadas", "acabados finales", "proceso de obra"]
  },
  jardineria: {
    categoriaPrincipal: "Servicio de jardinería",
    categorias: ["Jardinero", "Mantenimiento de jardines", "Paisajista", "Servicio de poda"],
    servicios: ["Mantenimiento de jardines", "Poda", "Limpieza de parcelas", "Diseño de jardines", "Riego", "Césped", "Palmeras"],
    fotos: ["jardines terminados", "antes y después", "poda realizada", "zonas verdes", "limpieza de parcelas"]
  },
  piscinas: {
    categoriaPrincipal: "Servicio de mantenimiento de piscinas",
    categorias: ["Empresa de piscinas", "Limpieza de piscinas", "Servicio de reparación de piscinas"],
    servicios: ["Mantenimiento de piscinas", "Limpieza de piscinas", "Puesta a punto", "Control de cloro y pH", "Revisión de depuradora", "Limpieza de fondo"],
    fotos: ["piscinas limpias", "antes y después", "equipos de depuración", "mantenimiento realizado"]
  },
  electricista: {
    categoriaPrincipal: "Electricista",
    categorias: ["Instalador eléctrico", "Servicio de instalación eléctrica", "Punto de recarga para vehículos eléctricos"],
    servicios: ["Instalaciones eléctricas", "Reparaciones eléctricas", "Cuadros eléctricos", "Iluminación", "Cargadores para coche eléctrico", "Boletines eléctricos"],
    fotos: ["cuadros eléctricos", "instalaciones terminadas", "puntos de recarga", "iluminación instalada"]
  },
  climatizacion: {
    categoriaPrincipal: "Empresa de climatización",
    categorias: ["Instalador de aire acondicionado", "Servicio de reparación de aire acondicionado", "Contratista de climatización"],
    servicios: ["Instalación de aire acondicionado", "Reparación de aire acondicionado", "Mantenimiento de climatización", "Conductos", "Split", "Revisión de equipos"],
    fotos: ["máquinas instaladas", "conductos", "splits", "equipos exteriores", "trabajos terminados"]
  },
  dentista: {
    categoriaPrincipal: "Clínica dental",
    categorias: ["Dentista", "Implantes dentales", "Ortodoncia", "Higienista dental"],
    servicios: ["Implantes dentales", "Ortodoncia", "Limpieza dental", "Blanqueamiento dental", "Urgencias dentales", "Revisión dental"],
    fotos: ["clínica", "gabinetes", "equipo", "recepción", "instalaciones"]
  },
  restaurante: {
    categoriaPrincipal: "Restaurante",
    categorias: ["Hamburguesería", "Comida para llevar", "Restaurante familiar", "Bar"],
    servicios: ["Hamburguesas", "Comida para llevar", "Reservas", "Menú", "Cenas", "Bocadillos", "Tapas"],
    fotos: ["platos", "local", "terraza", "equipo", "carta", "hamburguesas"]
  },
  generico: {
    categoriaPrincipal: "Servicio local",
    categorias: ["Proveedor de servicios", "Empresa local", "Servicio profesional"],
    servicios: ["Servicio principal", "Presupuesto personalizado", "Atención directa", "Servicio local", "Soluciones a medida"],
    fotos: ["trabajos realizados", "equipo", "local", "antes y después", "detalles del servicio"]
  }
};

function getValue(id) {
  return document.getElementById(id).value.trim();
}

function capitalizar(texto) {
  if (!texto) return "";
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

function limpiarLista(texto) {
  if (!texto) return [];
  return texto
    .split(",")
    .map(item => item.trim())
    .filter(item => item.length > 0);
}

function generarServicios(baseServicios, servicioPrincipal, serviciosSecundarios, ciudad) {
  const extras = limpiarLista(serviciosSecundarios);
  const lista = [...new Set([servicioPrincipal, ...extras, ...baseServicios])];

  return lista.slice(0, 12).map(servicio => {
    return {
      titulo: `${capitalizar(servicio)} en ${ciudad}`,
      descripcion: `Servicio de ${servicio.toLowerCase()} en ${ciudad}, con atención directa, valoración personalizada y solución adaptada a cada cliente.`
    };
  });
}

function generarHtmlServicios(servicios) {
  return servicios.map(servicio => `
    <h4>${servicio.titulo}</h4>
    <p>${servicio.descripcion}</p>
  `).join("");
}

function generarPublicaciones(nombre, ciudad, servicioPrincipal, servicioRentable, objetivo) {
  const rentable = servicioRentable || servicioPrincipal;

  return [
    `¿Buscas ${servicioPrincipal} en ${ciudad}? En ${nombre} ofrecemos atención directa, presupuesto personalizado y soluciones adaptadas a cada caso. Contacta con nosotros por ${objetivo} y te orientamos sin compromiso.`,
    `Esta semana seguimos realizando trabajos de ${rentable} en ${ciudad} y alrededores. Si necesitas una solución profesional, puedes enviarnos fotos o información del trabajo para preparar una primera valoración.`,
    `En ${nombre} trabajamos con clientes de ${ciudad} que buscan un servicio serio, claro y bien terminado. Cuéntanos qué necesitas y te ayudamos a encontrar la mejor solución.`,
    `Servicio profesional de ${servicioPrincipal} en ${ciudad}. Atención cercana, explicación clara y presupuesto adaptado a cada trabajo. Contacta ahora y solicita información.`
  ];
}

function generarResenas(nombre, ciudad, servicioPrincipal) {
  return [
    `Muy buen servicio. Contacté con ${nombre} para ${servicioPrincipal} en ${ciudad} y todo fue claro desde el principio. Trabajo bien hecho y trato profesional.`,
    `Quedé muy satisfecho con el resultado. Me explicaron bien las opciones, cumplieron con lo acordado y el acabado fue muy bueno.`,
    `Empresa recomendable en ${ciudad}. Atención rápida, presupuesto claro y buen resultado final.`,
    `Buen trato y profesionalidad. Necesitaba ${servicioPrincipal} y me dieron una solución adaptada a lo que buscaba.`,
    `Trabajo serio, limpio y bien terminado. Repetiría sin duda.`
  ];
}

function generarRespuestas(nombre, ciudad, servicioPrincipal) {
  return [
    `Muchas gracias por tu reseña. Nos alegra saber que has quedado satisfecho con nuestro servicio de ${servicioPrincipal} en ${ciudad}.`,
    `Gracias por confiar en ${nombre}. Seguiremos trabajando para ofrecer un servicio profesional, claro y adaptado a cada cliente.`,
    `Agradecemos mucho tu valoración. Para nosotros es importante ofrecer buen trato, claridad y resultados bien terminados.`,
    `Muchas gracias por compartir tu experiencia. Nos alegra haber podido ayudarte y quedamos a tu disposición para futuros trabajos.`,
    `Gracias por tus palabras. Comentarios así nos ayudan a seguir mejorando nuestro servicio en ${ciudad}.`
  ];
}

function generarFAQs(ciudad, servicioPrincipal, objetivo) {
  return [
    {
      q: `¿Trabajáis en ${ciudad} y alrededores?`,
      a: `Sí, ofrecemos servicio en ${ciudad} y diferentes zonas cercanas.`
    },
    {
      q: `¿Puedo pedir presupuesto por ${objetivo}?`,
      a: `Sí, puedes contactar por ${objetivo} y enviar la información necesaria para preparar una primera valoración.`
    },
    {
      q: `¿Hacéis presupuestos sin compromiso?`,
      a: `Sí, valoramos cada caso y explicamos las opciones disponibles antes de realizar el trabajo.`
    },
    {
      q: `¿Cuánto tarda el servicio de ${servicioPrincipal}?`,
      a: `Depende del tipo de trabajo, medidas, materiales y disponibilidad. Tras revisar el caso podemos orientar mejor el plazo.`
    },
    {
      q: `¿Trabajáis para particulares y empresas?`,
      a: `Sí, podemos atender tanto a particulares como a empresas, comunidades o negocios.`
    },
    {
      q: `¿Qué datos necesitáis para valorar el trabajo?`,
      a: `Normalmente ayuda enviar fotos, medidas aproximadas, ubicación y una breve explicación de lo que necesitas.`
    }
  ];
}

function generarChecklistFotos(fotosSector, ciudad, servicioPrincipal) {
  return [
    "Logo del negocio",
    "Foto de portada profesional",
    "Foto del equipo o responsable",
    "Foto del local, taller o vehículo si existe",
    `Fotos reales de ${servicioPrincipal}`,
    ...fotosSector.map(f => `Fotos de ${f}`),
    "Fotos de antes y después",
    "Fotos de detalles del acabado",
    "Fotos verticales para publicaciones",
    "Fotos horizontales para portada y web"
  ];
}

function generarNombresSeo(servicioPrincipal, ciudad, serviciosSecundarios) {
  const servicios = [servicioPrincipal, ...limpiarLista(serviciosSecundarios)].slice(0, 8);

  return servicios.map(servicio => {
    return `${servicio.toLowerCase().replaceAll(" ", "-")}-${ciudad.toLowerCase().replaceAll(" ", "-")}.jpg`;
  });
}

function crearResultado(datos) {
  const plantilla = plantillasSector[datos.sector] || plantillasSector.generico;

  const serviciosGenerados = generarServicios(
    plantilla.servicios,
    datos.servicioPrincipal,
    datos.serviciosSecundarios,
    datos.ciudad
  );

  const publicaciones = generarPublicaciones(
    datos.nombre,
    datos.ciudad,
    datos.servicioPrincipal,
    datos.servicioRentable,
    datos.objetivo
  );

  const resenas = generarResenas(datos.nombre, datos.ciudad, datos.servicioPrincipal);
  const respuestas = generarRespuestas(datos.nombre, datos.ciudad, datos.servicioPrincipal);
  const faqs = generarFAQs(datos.ciudad, datos.servicioPrincipal, datos.objetivo);
  const checklistFotos = generarChecklistFotos(plantilla.fotos, datos.ciudad, datos.servicioPrincipal);
  const nombresSeo = generarNombresSeo(datos.servicioPrincipal, datos.ciudad, datos.serviciosSecundarios);

  const zonasFinales = datos.zonas || datos.localidadesSeo || datos.ciudad;

  let avisoResenas = "";
  if (Number(datos.resenas) < 5) {
    avisoResenas = `<div class="danger">Prioridad alta: la ficha tiene pocas reseñas. Objetivo inicial recomendado: conseguir entre 10 y 20 reseñas reales y responderlas todas.</div>`;
  } else if (Number(datos.resenas) < 15) {
    avisoResenas = `<div class="warning">Prioridad media: la ficha ya tiene reseñas, pero necesita aumentar frecuencia y calidad.</div>`;
  } else {
    avisoResenas = `<div class="notice">Buen punto de partida: la ficha tiene una base de reseñas que se puede potenciar.</div>`;
  }

  let avisoFotos = "";
  if (Number(datos.fotos) < 10) {
    avisoFotos = `<div class="danger">Prioridad alta: faltan fotos. Añadir fotos reales de trabajos, equipo, local y resultados puede mejorar la confianza del cliente.</div>`;
  } else if (Number(datos.fotos) < 30) {
    avisoFotos = `<div class="warning">Prioridad media: hay fotos, pero conviene subir más imágenes reales y recientes.</div>`;
  } else {
    avisoFotos = `<div class="notice">Buen punto de partida: la ficha tiene una cantidad interesante de fotos.</div>`;
  }

  return `
    <h3>Optimización Google Business para ${datos.nombre}</h3>

    <h4>Nombre recomendado</h4>
    <p><strong>Opción segura:</strong> ${datos.nombre}</p>
    <p><strong>Opción optimizada con cuidado:</strong> ${datos.nombre} · ${capitalizar(datos.servicioPrincipal)} en ${datos.ciudad}</p>

    <h4>Categoría principal recomendada</h4>
    <p>${plantilla.categoriaPrincipal}</p>

    <h4>Categorías secundarias recomendadas</h4>
    <ul>
      ${plantilla.categorias.map(cat => `<li>${cat}</li>`).join("")}
    </ul>

    <h4>Datos principales</h4>
    <ul>
      <li><strong>Ciudad principal:</strong> ${datos.ciudad}</li>
      <li><strong>Zonas de servicio:</strong> ${zonasFinales}</li>
      <li><strong>Teléfono:</strong> ${datos.telefono || "Pendiente de añadir"}</li>
      <li><strong>WhatsApp:</strong> ${datos.whatsapp || "Pendiente de añadir"}</li>
      <li><strong>Web:</strong> ${datos.web || "Recomendado crear landing optimizada"}</li>
      <li><strong>Horario:</strong> ${datos.horario || "Pendiente de definir"}</li>
      <li><strong>Dirección visible:</strong> ${datos.direccionVisible}</li>
      <li><strong>Cliente ideal:</strong> ${datos.clienteIdeal}</li>
    </ul>

    <h3>Descripción optimizada</h3>
    <p>
      ${datos.nombre} ofrece servicio profesional de ${datos.servicioPrincipal} en ${datos.ciudad} y alrededores.
      Trabajamos con ${datos.clienteIdeal}, ofreciendo atención directa, presupuesto personalizado y soluciones adaptadas a cada necesidad.
      ${datos.serviciosSecundarios ? `También realizamos ${datos.serviciosSecundarios}.` : ""}
      ${datos.experiencia ? `Contamos con ${datos.experiencia} años de experiencia en el sector.` : ""}
      ${datos.diferencia ? `Nos diferenciamos por ${datos.diferencia}.` : "Nos centramos en ofrecer claridad, buen trato y resultados bien terminados."}
      Contacta con nosotros por ${datos.objetivo} para recibir información y valorar tu caso.
    </p>

    <h3>Servicios para añadir en la ficha</h3>
    ${generarHtmlServicios(serviciosGenerados)}

    <h3>Zonas de servicio recomendadas</h3>
    <p>${zonasFinales}</p>

    <h3>Publicaciones para Google Business</h3>
    <ol>
      ${publicaciones.map(post => `<li>${post}</li>`).join("")}
    </ol>

    <h3>Reseñas sugeridas para clientes reales</h3>
    ${avisoResenas}
    <ol>
      ${resenas.map(r => `<li>${r}</li>`).join("")}
    </ol>

    <h3>Respuestas a reseñas</h3>
    <ol>
      ${respuestas.map(r => `<li>${r}</li>`).join("")}
    </ol>

    <h3>Preguntas frecuentes para la ficha</h3>
    ${faqs.map(faq => `
      <h4>${faq.q}</h4>
      <p>${faq.a}</p>
    `).join("")}

    <h3>Checklist de fotos necesarias</h3>
    ${avisoFotos}
    <ul>
      ${checklistFotos.map(foto => `<li>${foto}</li>`).join("")}
    </ul>

    <h3>Nombres SEO para fotos</h3>
    <ul>
      ${nombresSeo.map(nombre => `<li>${nombre}</li>`).join("")}
    </ul>

    <h3>Plan de acción recomendado</h3>
    <ul>
      <li>Revisar nombre, categoría principal y categorías secundarias.</li>
      <li>Completar descripción con servicio principal, ciudad y zonas de trabajo.</li>
      <li>Añadir todos los servicios generados en la ficha.</li>
      <li>Subir fotos reales con nombres de archivo optimizados.</li>
      <li>Publicar una novedad cada semana.</li>
      <li>Conseguir reseñas reales de clientes y responderlas con palabras clave naturales.</li>
      <li>Crear o mejorar una landing web conectada a la ficha.</li>
      <li>Medir llamadas, clics, mensajes y solicitudes recibidas.</li>
    </ul>

    <h3>Recomendación comercial para vender el servicio</h3>
    <p>
      Esta ficha necesita una optimización completa para mejorar su visibilidad en Google Maps,
      transmitir más confianza y convertir más visitas en contactos.
    </p>

    <ul>
      <li><strong>Optimización básica Google Business:</strong> 150 €</li>
      <li><strong>Optimización completa Google Business:</strong> 300 €</li>
      <li><strong>Google Business + landing page local:</strong> 500 € - 700 €</li>
      <li><strong>Mantenimiento mensual recomendado:</strong> 100 € - 150 €</li>
    </ul>

    <div class="notice">
      Mensaje comercial recomendado: “Te dejo la ficha preparada para que tenga mejor presencia en Google, más confianza y más posibilidades de recibir llamadas o mensajes de clientes reales.”
    </div>
  `;
}

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const datos = {
    nombre: getValue("nombre"),
    ciudad: getValue("ciudad"),
    sector: getValue("sector"),
    servicioPrincipal: getValue("servicioPrincipal"),
    serviciosSecundarios: getValue("serviciosSecundarios"),
    zonas: getValue("zonas"),
    telefono: getValue("telefono"),
    whatsapp: getValue("whatsapp"),
    web: getValue("web"),
    horario: getValue("horario"),
    direccionVisible: getValue("direccionVisible"),
    experiencia: getValue("experiencia"),
    clienteIdeal: getValue("clienteIdeal"),
    diferencia: getValue("diferencia"),
    resenas: getValue("resenas") || 0,
    fotos: getValue("fotos") || 0,
    objetivo: getValue("objetivo"),
    servicioRentable: getValue("servicioRentable"),
    localidadesSeo: getValue("localidadesSeo")
  };

  resultado.innerHTML = crearResultado(datos);
  resultadoSection.classList.remove("hidden");
  resultadoSection.scrollIntoView({ behavior: "smooth" });
});

copiarBtn.addEventListener("click", async function() {
  const texto = resultado.innerText;

  try {
    await navigator.clipboard.writeText(texto);
    copiarBtn.textContent = "Copiado";
    setTimeout(() => copiarBtn.textContent = "Copiar resultado", 1600);
  } catch (error) {
    alert("No se pudo copiar automáticamente. Selecciona el texto y cópialo manualmente.");
  }
});

pdfBtn.addEventListener("click", function() {
  window.print();
});

limpiarBtn.addEventListener("click", function() {
  form.reset();
});

nuevoBtn.addEventListener("click", function() {
  form.reset();
  resultado.innerHTML = "";
  resultadoSection.classList.add("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
});
