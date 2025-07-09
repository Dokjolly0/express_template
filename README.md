# Gestione Iscrizioni e Check-in per Eventi di Formazione Aziendale

## Obiettivo del Progetto

Questa applicazione web full stack è stata sviluppata per gestire il processo di iscrizione e check-in per eventi di formazione interna aziendale. Include funzionalità per l'autenticazione, la gestione di eventi e iscrizioni, e la visualizzazione delle statistiche di partecipazione.

---

## Tecnologie Utilizzate

- **Frontend**: Angular (Client Side Rendering)
- **Backend**: Node.js con Express
- **Database**: MongoDB
- **Autenticazione**: JWT (JSON Web Token)
- **Documentazione API**: Swagger / Postman

---

## Funzionalità Principali

### Utenti

- Registrazione e login (JWT)
- Ruoli distinti: **Dipendente** e **Organizzatore**

### Dashboard Dipendente

- Visualizzazione eventi disponibili
- Iscrizione agli eventi
- Visualizzazione iscrizioni personali
- Annullamento iscrizioni (fino al giorno prima dell’evento)

### Dashboard Organizzatore

- Creazione, modifica e cancellazione eventi
- Gestione check-in partecipanti
- Visualizzazione eventi passati con:
  - Numero check-in effettuati
  - Percentuale partecipazione
  - Filtro per intervallo di date
  - Visualizzazione tabellare e/o grafica

---

## API REST

Tutte le API richiedono autenticazione tranne registrazione e login.

### Autenticazione

- `POST /api/utenti/register` – Registrazione utente
- `POST /api/utenti/login` – Login utente (ritorna JWT)

### Eventi

- `GET /api/eventi` – Lista eventi (tutti)
- `POST /api/eventi` – Crea evento _(solo organizzatore)_
- `PUT /api/eventi/:id` – Modifica evento _(solo organizzatore)_
- `DELETE /api/eventi/:id` – Cancella evento _(solo organizzatore)_

### Iscrizioni

- `POST /api/iscrizioni` – Iscrizione evento _(dipendente)_
- `DELETE /api/iscrizioni/:id` – Annulla iscrizione _(dipendente)_

### Check-in

- `POST /api/checkin/:id` – Check-in partecipante _(organizzatore)_

### Statistiche

- `GET /api/statistiche?dal=YYYY-MM-DD&al=YYYY-MM-DD` _(organizzatore)_

---

## Modello Dati

- **Utente**
  - UtenteID (PK)
  - Nome, Cognome, Email, Password, Ruolo
- **Evento**
  - EventoID (PK)
  - Titolo, Data, Descrizione
- **Iscrizione**
  - IscrizioneID (PK)
  - UtenteID (FK), EventoID (FK)
  - CheckinEffettuato (boolean), OraCheckin

---

## Sicurezza

- JWT per autenticazione
- Ruoli per accesso risorse
- Validazioni backend
- Restrizioni temporali per iscrizioni/disiscrizioni

---

## Deployment

Applicazione disponibile al seguente URL:

> `https://app-nome-cognome.nomehost.dominio`

---

## Testing API

- Documentazione testabile tramite Swagger o Postman (collezione allegata)

---

## Note Finali

- Codice documentato e organizzato
- Inizializzazione database con dati realistici
- UI responsive e accessibile
