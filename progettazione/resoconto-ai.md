# Resoconto dell'uso dell'AI

## Sessione 1 · 25 novembre

- **Completare i JSON:** ho incollato i due file forniti e l'AI ha scritto i record mancanti (eventi 2, 3, 5 e 6, sedi 2 e 3), usando i testi del mio Programma. Ho controllato titoli, orari, descrizioni, immagini e testi alternativi confrontandoli con `programma.html`. 
- **Scheda dati:** ho chiesto `dati/SCHEMA.md` con entità, campi, chiavi, relazione, quantità e schema Mermaid. Ho verificato che i campi fossero solo quelli dei miei JSON, senza campi aggiunti.
- **Programma dai dati:** ho chiesto di generare le schede con `fetch`. Ho usato il `programma.html` completo e il nuovo `programma.js` che mi sono stati forniti, con i messaggi per caricamento, nessun evento ed errore, e «Sede da definire» per un `sede_id` sbagliato. Ho verificato con Live Preview: sei schede, `eventi.json` e `sedi.json` con stato 200 in Network. Il nome della sede nelle schede ora arriva per intero da `sedi.json`.
- **Meteo a Torino adesso:** ho chiesto la sezione in `info.html`, il file `meteo.js` e lo stile. Ho verificato che compaiano temperatura, vento e ora del dato, la fonte con il collegamento a Open-Meteo e CC BY 4.0, e una sola richiesta all'API in Network.
- **Prove:** ho eseguito le cinque prove della consegna una alla volta, ripristinando i file dopo ognuna con Discard Changes: nome di una sede cambiato, `eventi.json` uguale a `[]`, `sedi.json` rinominato, `sede_id` 99, indirizzo del meteo con `temperatura_2m`.
- **Problemi e come li ho risolti:** nessun problema rilevante.