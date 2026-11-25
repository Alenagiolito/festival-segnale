const riquadroMeteo = document.getElementById("meteo");
const indirizzoMeteo =
  "https://api.open-meteo.com/v1/forecast?latitude=45.0703&longitude=7.6869&current=temperature_2m,wind_speed_10m&timezone=Europe%2FRome";

function creaVoce(etichetta, valore) {
  const gruppo = document.createElement("div");
  const termine = document.createElement("dt");
  const descrizione = document.createElement("dd");
  termine.textContent = etichetta;
  descrizione.textContent = valore;
  gruppo.append(termine, descrizione);
  return gruppo;
}

async function caricaMeteo() {
  try {
    const risposta = await fetch(indirizzoMeteo);
    if (!risposta.ok) {
      throw new Error("Risposta non valida dal servizio meteo");
    }

    const dati = await risposta.json();
    const attuale = dati.current;
    const unita = dati.current_units;

    if (
      !attuale ||
      attuale.temperature_2m === undefined ||
      attuale.wind_speed_10m === undefined
    ) {
      throw new Error("Dati meteo incompleti");
    }

    const momento = new Date(attuale.time);
    const testoOra = isNaN(momento)
      ? attuale.time
      : momento.toLocaleString("it-IT", {
          day: "numeric",
          month: "long",
          hour: "2-digit",
          minute: "2-digit"
        });

    const lista = document.createElement("dl");
    lista.className = "meteo-dati";
    lista.append(
      creaVoce("Temperatura", attuale.temperature_2m + " " + unita.temperature_2m),
      creaVoce("Vento", attuale.wind_speed_10m + " " + unita.wind_speed_10m),
      creaVoce("Dato delle", testoOra)
    );

    riquadroMeteo.replaceChildren(lista);
  } catch (errore) {
    console.error(errore);
    riquadroMeteo.textContent = "Il meteo non è disponibile in questo momento.";
  }
}

caricaMeteo();