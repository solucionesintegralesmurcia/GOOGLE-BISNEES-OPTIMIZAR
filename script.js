const form = document.getElementById("businessForm");
const resultadoSection = document.getElementById("resultadoSection");
const resultado = document.getElementById("resultado");
const copiarBtn = document.getElementById("copiarBtn");
const pdfBtn = document.getElementById("pdfBtn");
const limpiarBtn = document.getElementById("limpiarBtn");
const nuevoBtn = document.getElementById("nuevoBtn");
const whatsappBtn = document.getElementById("whatsappBtn");

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
    servicios: ["Implantes dentales", "Ortodoncia", "Limpieza dental", "Blanqueamiento dental", "Revisión dental"],
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
  return texto.split(",").map(item => item.trim()).filter(item => item.length > 0);
}

function calcularPuntuacion(datos) {
  let puntos = 0;

  if (datos.nombre) puntos += 8;
  if (datos.ciudad) puntos += 8;
  if (datos.servicioPrincipal) puntos += 10;
  if (datos.serviciosSecundarios) puntos += 8;
  if (datos.zonas || datos.localidadesSeo) puntos += 8;
  if (datos.telefono) puntos += 8;
  if (datos.whatsapp) puntos += 8;
  if (datos.web) puntos += 10;
  if (datos.horario) puntos += 6;
  if (datos.diferencia) puntos += 6;
  if (Number(datos.resenas) >= 10) puntos += 10;
  else if (Number(datos.resenas) >= 5) puntos += 6;
  else if (Number(datos.resenas) >= 1) puntos += 3;

  if (Number(datos.fotos) >= 30) puntos += 10;
  else if (Number(datos.fotos) >= 10) puntos += 6;
  else if (Number(datos.fotos) >= 1) puntos += 3;

  if (Number(datos.publicaciones) >= 4) puntos += 8;
  else if (Number(datos.publicaciones) >= 1) puntos += 4;

  return Math.min(puntos, 100);
}

function clasePuntuacion(puntuacion) {
  if (puntuacion >= 75) return "score-green";
  if (puntuacion >= 50) return "score-yellow";
  return "score-red";
}

function textoNivel(puntuacion) {
  if (puntuacion >= 75) return "Ficha con buena base, pero todavía se puede mejorar para captar más clientes.";
  if (puntuacion >= 50) return "Ficha a medio trabajar. Hay oportunidades claras de mejora.";
  return "Ficha débil. Necesita una optimización completa para competir en Google Maps.";
}

function generarPrioridades(datos) {
  const rojas = [];
  const amarillas = [];
  const verdes = [];

  Number(datos.resenas) < 5 ? rojas.push("Conseguir más reseñas reales") : verdes.push("Base inicial de reseñas");
  Number(datos.fotos) < 10 ? rojas.push("Subir fotos reales de trabajos") : verdes.push("Fotos ya iniciadas");
  !datos.web ? rojas.push("Crear o añadir una web optimizada") : verdes.push("Web añadida");
  !datos.serviciosSecundarios ? amarillas.push("Añadir servicios secundarios") : verdes.push("Servicios secundarios definidos");
  !datos.zonas && !datos.localidadesSeo ? amarillas.push("Definir zonas de servicio") : verdes.push("Zonas de servicio definidas");
  Number(datos.publicaciones) < 4 ? amarillas.push("Publicar mínimo 1 vez por semana") : verdes.push("Actividad mensual correcta");
  !datos.diferencia ? amarillas.push("Definir diferencial frente a la competencia") : verdes.push("Diferencial definido");

  return { rojas, amarillas, verdes };
}

function generarServicios(baseServicios, servicioPrincipal, serviciosSecundarios, ciudad) {
  const extras = limpiarLista(serviciosSecundarios);
  const lista = [...new Set([servicioPrincipal, ...extras, ...baseServicios])];

  return lista.slice(0, 12).map(servicio => ({
    titulo: `${capitalizar(servicio)} en ${ciudad}`,
    descripcion: `Servicio de ${servicio.toLowerCase()} en ${ciudad}, con atención directa, valoración personalizada y solución adaptada a cada cliente.`
  }));
}

function generarPublicaciones(nombre, ciudad, servicioPrincipal, servicioRentable, objetivo) {
  const rentable = servicioRentable || servicioPrincipal;

  return [
    `¿Buscas ${servicioPrincipal} en ${ciudad}? En ${nombre} ofrecemos atención directa, presupuesto personalizado y soluciones adaptadas a cada caso. Contacta por ${objetivo}.`,
    `Esta semana seguimos realizando trabajos de ${rentable} en ${ciudad} y alrededores. Puedes enviarnos fotos o información del trabajo para preparar una primera valoración.`,
    `En ${nombre} ayudamos a clientes de ${ciudad} que buscan un servicio serio, claro y bien terminado. Cuéntanos qué necesitas y te orientamos.`,
    `Servicio profesional de ${servicioPrincipal} en ${ciudad}. Atención cercana, explicación clara y presupuesto adaptado a cada trabajo.`
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
    [`¿Trabajáis en ${ciudad} y alrededores?`, `Sí, ofrecemos servicio en ${ciudad} y diferentes zonas cercanas.`],
    [`¿Puedo pedir presupuesto por ${objetivo}?`, `Sí, puedes contactar por ${objetivo} y enviar la información necesaria para preparar una primera valoración.`],
    [`¿Hacéis presupuestos sin compromiso?`, `Sí, valoramos cada caso y explicamos las opciones disponibles antes de realizar el trabajo.`],
    [`¿Cuánto tarda el servicio de ${servicioPrincipal}?`, `Depende del tipo de trabajo, medidas, materiales y disponibilidad. Tras revisar el caso podemos orientar mejor el plazo.`],
    [`¿Trabajáis para particulares y empresas?`, `Sí, podemos atender tanto a particulares como a empresas, comunidades o negocios.`],
    [`¿Qué datos necesitáis para valorar el trabajo?`, `Normalmente ayuda enviar fotos, medidas aproximadas, ubicación y una breve explicación de lo que necesitas.`]
  ];
}

function generarPlan30Dias(datos) {
  return [
    {
      semana: "Semana 1",
      acciones: [
        "Revisar nombre, categoría principal y categorías secundarias.",
        "Añadir descripción optimizada.",
        "Subir logo, portada y primeras fotos reales.",
        "Publicar una novedad sobre el servicio principal."
      ]
    },
    {
      semana: "Semana 2",
      acciones: [
        "Añadir todos los servicios principales y secundarios.",
        "Pedir 3 reseñas reales a clientes satisfechos.",
        "Responder todas las reseñas existentes.",
        "Subir fotos de trabajos terminados."
      ]
    },
    {
      semana: "Semana 3",
      acciones: [
        "Añadir preguntas frecuentes en la ficha.",
        "Publicar un trabajo realizado o caso práctico.",
        "Revisar que teléfono, web y horario estén correctos.",
        "Subir fotos de detalles, antes/después o proceso."
      ]
    },
    {
      semana: "Semana 4",
      acciones: [
        "Pedir otras 3 reseñas reales.",
        "Publicar una promoción o mensaje comercial suave.",
        "Comprobar llamadas, clics, visitas y mensajes.",
        "Preparar mantenimiento mensual de publicaciones y fotos."
      ]
    }
  ];
}

function generarPropuestaComercial(datos, puntuacion) {
  return `
Hola, he revisado la presencia de tu negocio en Google y hay varias mejoras que pueden ayudarte a transmitir más confianza y recibir más contactos.

Ahora mismo la ficha tendría una puntuación aproximada de ${puntuacion}/100.

Lo más importante sería trabajar la categoría, descripción, servicios, fotos, reseñas, publicaciones y la conexión con una web o landing preparada para convertir visitas en llamadas o mensajes.

Mi propuesta es dejarte la ficha de Google Business optimizada, con textos preparados, servicios bien definidos, estrategia de fotos, publicaciones y recomendaciones para mejorar la visibilidad local.

También puedo acompañarlo con una landing page enfocada a captar clientes desde Google.
`;
}

function generarNombresSeo(servicioPrincipal, ciudad, serviciosSecundarios) {
  const servicios = [servicioPrincipal, ...limpiarLista(serviciosSecundarios)].slice(0, 8);
  return servicios.map(servicio => `${servicio.toLowerCase().replaceAll(" ", "-")}-${ciudad.toLowerCase().replaceAll(" ", "-")}.jpg`);
}

function crearResultado(datos) {
  const plantilla = plantillasSector[datos.sector] || plantillasSector.generico;
  const puntuacion = calcularPuntuacion(datos);
  const prioridades = generarPrioridades(datos);
  const servicios = generarServicios(plantilla.servicios, datos.servicioPrincipal, datos.serviciosSecundarios, datos.ciudad);
  const publicaciones = generarPublicaciones(datos.nombre, datos.ciudad, datos.servicioPrincipal, datos.servicioRentable, datos.objetivo);
  const resenas = generarResenas(datos.nombre, datos.ciudad, datos.servicioPrincipal);
  const respuestas = generarRespuestas(datos.nombre, datos.ciudad, datos.servicioPrincipal);
  const faqs = generarFAQs(datos.ciudad, datos.servicioPrincipal, datos.objetivo);
  const plan30 = generarPlan30Dias(datos);
  const propuesta = generarPropuestaComercial(datos, puntuacion);
  const nombresSeo = generarNombresSeo(datos.servicioPrincipal, datos.ciudad, datos.serviciosSecundarios);
  const zonasFinales = datos.zonas || datos.localidadesSeo || datos.ciudad;

  return `
    <div class="report-cover">
      <h2>Informe Google Business</h2>
      <p>${datos.nombre} · ${datos.ciudad}</p>
    </div>

    <h3>Auditoría rápida</h3>

    <div class="score-box">
      <div class="score-circle ${clasePuntuacion(puntuacion)}">${puntuacion}/100</div>
      <div>
        <h4>Estado actual de la ficha</h4>
        <p>${textoNivel(puntuacion)}</p>
        <p><strong>Objetivo:</strong> mejorar visibilidad, confianza y conversiones en Google Maps.</p>
      </div>
    </div>

    <h3>Prioridades por colores</h3>

    <div class="priority-grid">
      <div class="priority red">
        <h4>Rojo · Urgente</h4>
        <ul>${prioridades.rojas.map(p => `<li>${p}</li>`).join("") || "<li>Sin urgencias graves detectadas</li>"}</ul>
      </div>

      <div class="priority yellow">
        <h4>Amarillo · Mejorar</h4>
        <ul>${prioridades.amarillas.map(p => `<li>${p}</li>`).join("") || "<li>Sin mejoras medias detectadas</li>"}</ul>
      </div>

      <div class="priority green">
        <h4>Verde · Correcto</h4>
        <ul>${prioridades.verdes.map(p => `<li>${p}</li>`).join("") || "<li>Faltan datos para valorar puntos fuertes</li>"}</ul>
      </div>
    </div>

    <h3>Datos principales recomendados</h3>
    <ul>
      <li><strong>Nombre seguro:</strong> ${datos.nombre}</li>
      <li><strong>Nombre optimizado con cuidado:</strong> ${datos.nombre} · ${capitalizar(datos.servicioPrincipal)} en ${datos.ciudad}</li>
      <li><strong>Categoría principal:</strong> ${plantilla.categoriaPrincipal}</li>
      <li><strong>Categorías secundarias:</strong> ${plantilla.categorias.join(", ")}</li>
      <li><strong>Zonas de servicio:</strong> ${zonasFinales}</li>
      <li><strong>Teléfono:</strong> ${datos.telefono || "Pendiente"}</li>
      <li><strong>WhatsApp:</strong> ${datos.whatsapp || "Pendiente"}</li>
      <li><strong>Web:</strong> ${datos.web || "Recomendado crear landing optimizada"}</li>
      <li><strong>Horario:</strong> ${datos.horario || "Pendiente"}</li>
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

    <h3>Servicios para añadir en Google Business</h3>
    ${servicios.map(s => `<h4>${s.titulo}</h4><p>${s.descripcion}</p>`).join("")}

    <h3>Publicaciones para Google Business</h3>
    <ol>${publicaciones.map(p => `<li>${p}</li>`).join("")}</ol>

    <h3>Reseñas sugeridas para clientes reales</h3>
    <ol>${resenas.map(r => `<li>${r}</li>`).join("")}</ol>

    <h3>Respuestas a reseñas</h3>
    <ol>${respuestas.map(r => `<li>${r}</li>`).join("")}</ol>

    <h3>Preguntas frecuentes</h3>
    ${faqs.map(f => `<h4>${f[0]}</h4><p>${f[1]}</p>`).join("")}

    <h3>Checklist de fotos</h3>
    <ul>
      <li>Logo del negocio</li>
      <li>Foto de portada profesional</li>
      <li>Foto del equipo o responsable</li>
      <li>Foto del local, taller o vehículo si existe</li>
      <li>Fotos reales de ${datos.servicioPrincipal}</li>
      ${plantilla.fotos.map(f => `<li>Fotos de ${f}</li>`).join("")}
      <li>Fotos de antes y después</li>
      <li>Fotos de detalles del acabado</li>
    </ul>

    <h3>Nombres SEO para fotos</h3>
    <ul>${nombresSeo.map(n => `<li>${n}</li>`).join("")}</ul>

    <h3>Plan de acción de 30 días</h3>
    ${plan30.map(s => `
      <h4>${s.semana}</h4>
      <ul>${s.acciones.map(a => `<li>${a}</li>`).join("")}</ul>
    `).join("")}

    <h3>Propuesta comercial para enviar al cliente</h3>
    <div class="commercial-box">
      <p>${propuesta.replaceAll("\n", "<br>")}</p>
    </div>

    <h3>Precios recomendados</h3>
    <ul>
      <li><strong>Optimización básica Google Business:</strong> 150 €</li>
      <li><strong>Optimización completa Google Business:</strong> 300 €</li>
      <li><strong>Google Business + landing page local:</strong> 500 € - 700 €</li>
      <li><strong>Mantenimiento mensual:</strong> 100 € - 150 €</li>
    </ul>

    <div class="notice">
      Recomendación: vender primero la optimización completa y luego ofrecer mantenimiento mensual con publicaciones, fotos y seguimiento.
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
    whatsappVenta: getValue("whatsappVenta"),
    web: getValue("web"),
    horario: getValue("horario"),
    direccionVisible: getValue("direccionVisible"),
    experiencia: getValue("experiencia"),
    clienteIdeal: getValue("clienteIdeal"),
    diferencia: getValue("diferencia"),
    resenas: getValue("resenas") || 0,
    fotos: getValue("fotos") || 0,
    publicaciones: getValue("publicaciones") || 0,
    objetivo: getValue("objetivo"),
    servicioRentable: getValue("servicioRentable"),
    localidadesSeo: getValue("localidadesSeo")
  };

  resultado.innerHTML = crearResultado(datos);
  resultadoSection.classList.remove("hidden");

  if (datos.whatsappVenta) {
    const puntuacion = calcularPuntuacion(datos);
    const mensaje = `Hola, he revisado la ficha de ${datos.nombre} en Google Business y tendría una puntuación aproximada de ${puntuacion}/100. Puedo ayudarte a optimizarla para mejorar visibilidad, confianza y contactos.`;
    whatsappBtn.href = `https://wa.me/${datos.whatsappVenta}?text=${encodeURIComponent(mensaje)}`;
    whatsappBtn.classList.remove("hidden");
  } else {
    whatsappBtn.classList.add("hidden");
  }

  resultadoSection.scrollIntoView({ behavior: "smooth" });
});

copiarBtn.addEventListener("click", async function() {
  try {
    await navigator.clipboard.writeText(resultado.innerText);
    copiarBtn.textContent = "Copiado";
    setTimeout(() => copiarBtn.textContent = "Copiar resultado", 1600);
  } catch (error) {
    alert("No se pudo copiar automáticamente.");
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
  whatsappBtn.classList.add("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
});
