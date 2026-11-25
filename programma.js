const stato = document.getElementById("stato-programma");
const elenco = document.getElementById("elenco-eventi");

function formattaData(dataIso) {
  const data = new Date(dataIso + "T12:00:00");
  if (isNaN(data)) {
    return dataIso;
  }
  const testo = data.toLocaleDateString("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long"
  });
  return testo.charAt(0).toUpperCase() + testo.slice(1);
}

function creaElemento(tag, classe, testo) {
  const elemento = document.createElement(tag);
  if (classe) {
    elemento.className = classe;
  }
  if (testo) {
    elemento.textContent = testo;
  }
  return elemento;
}

function creaScheda(evento, sedi) {
  const sede = sedi.find((s) => s.id === evento.sede_id);
  const nomeSede = sede ? sede.nome : "Sede da definire";

  const scheda = creaElemento("article", "event-card");

  const immagine = document.createElement("img");
  immagine.src = evento.immagine;
  immagine.alt = evento.immagine_alt;
  immagine.width = 900;
  immagine.height = 600;

  const corpo = creaElemento("div", "event-body");
  corpo.append(
    creaElemento(
      "p",
      "event-meta",
      formattaData(evento.data) + " · " + evento.orario + " · " + evento.categoria
    ),
    creaElemento("h3", "", evento.titolo),
    creaElemento("p", "", evento.descrizione)
  );

  const luogo = creaElemento("p", "event-place");
  luogo.append(creaElemento("strong", "", "Sede:"), " " + nomeSede);
  corpo.append(luogo);

  scheda.append(immagine, corpo);
  return scheda;
}

async function caricaProgramma() {
  try {
    const rispostaEventi = await fetch("dati/eventi.json");
    const rispostaSedi = await fetch("dati/sedi.json");

    if (!rispostaEventi.ok || !rispostaSedi.ok) {
      throw new Error("Impossibile leggere i file dei dati");
    }

    const eventi = await rispostaEventi.json();
    const sedi = await rispostaSedi.json();

    if (!Array.isArray(eventi) || !Array.isArray(sedi)) {
      throw new Error("Formato dei dati non valido");
    }

    if (eventi.length === 0) {
      stato.textContent = "Nessun evento in programma.";
      return;
    }

    eventi.forEach((evento) => {
      elenco.append(creaScheda(evento, sedi));
    });
    stato.hidden = true;
  } catch (errore) {
    console.error(errore);
    elenco.replaceChildren();
    stato.textContent = "Il programma non è disponibile.";
  }
}

caricaProgramma();