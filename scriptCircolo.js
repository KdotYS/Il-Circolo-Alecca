// Lista membri iscritti
var membri = [
    { nome: "Rufus",   cognome: "Bianchi",  eta: 20, peso: 89,  esperienze: "Boxe amatoriale 4 anni. Diversi incontri non ufficiali in zona portuale. Ritirato per infortunio." },
    { nome: "Giulio",  cognome: "Guerra",   eta: 18, peso: 94,  esperienze: "Kickboxing agonistico. Ex campione regionale under 30." },
    { nome: "Samuele", cognome: "Crotti",   eta: 34, peso: 102, esperienze: "Lotta libera. 6 anni di pratica. Mai sconfitto negli incontri del circolo precedente." },
    { nome: "Lorenzo", cognome: "Mancini",  eta: 29, peso: 78,  esperienze: "Muay Thai. Autodidatta. Tre incontri vinti su strada." },
    { nome: "Davide",  cognome: "Ferretti", eta: 38, peso: 110, esperienze: "Ex buttafuori. Nessuna disciplina formale, grande esperienza sul campo." },
    { nome: "Alexei",  cognome: "Neri",     eta: 25, peso: 83,  esperienze: "Mma underground. Due stagioni nel circuito clandestino del nord." },
    { nome: "Riccardo",cognome: "Rubio",    eta: 29, peso: 98,  esperienze: "Kung fu a livello agonistico per vari anni. sospeso attualmente per aggressione." }
];

// Ricostruisce la tabella con tutti i membri
function aggiornaTabellaCompleta() {
    var tbody = document.getElementById("corpo-tabella");
    tbody.innerHTML = "";

    for (var i = 0; i < membri.length; i++) {
        var m = membri[i];
        var riga = document.createElement("tr");

        // Evidenzia Rufus e Giulio
        if (m.nome === "Rufus" || m.nome === "Giulio") {
            riga.className = "membro-speciale";
        }

        riga.innerHTML =
            "<td>" + (i + 1) + "</td>" +
            "<td>" + m.nome + "</td>" +
            "<td>" + m.cognome + "</td>" +
            "<td>" + m.eta + " anni</td>" +
            "<td>" + m.peso + " kg</td>" +
            "<td>" + m.esperienze + "</td>";

        tbody.appendChild(riga);
    }
}

// Registra un nuovo membro dal form
function registraMembro() {
    var nome       = document.getElementById("nome").value.trim();
    var cognome    = document.getElementById("cognome").value.trim();
    var eta        = document.getElementById("eta").value.trim();
    var peso       = document.getElementById("peso").value.trim();
    var esperienze = document.getElementById("esperienze").value.trim();
    var messaggio  = document.getElementById("messaggio-form");

    // Controllo campi vuoti
    if (!nome || !cognome || !eta || !peso || !esperienze) {
        messaggio.style.color = "#cc0000";
        messaggio.textContent = "⛔ ERRORE — Compila tutti i campi prima di procedere.";
        return;
    }

    // Aggiunge il nuovo membro
    membri.push({
        nome: nome,
        cognome: cognome,
        eta: parseInt(eta),
        peso: parseInt(peso),
        esperienze: esperienze
    });

    aggiornaTabellaCompleta();

    // Messaggio di conferma
    messaggio.style.color = "#4caf50";
    messaggio.textContent = "✔ REGISTRAZIONE COMPLETATA — Benvenuto nel Circolo, " + nome + ".";

    // Svuota i campi
    document.getElementById("nome").value = "";
    document.getElementById("cognome").value = "";
    document.getElementById("eta").value = "";
    document.getElementById("peso").value = "";
    document.getElementById("esperienze").value = "";
}

// Orologio
function mostraOra() {
    var ora = new Date();
    var h = String(ora.getHours()).padStart(2, '0');
    var m = String(ora.getMinutes()).padStart(2, '0');
    var s = String(ora.getSeconds()).padStart(2, '0');
    document.getElementById("ora").textContent = "SESSIONE ATTIVA — " + h + ":" + m + ":" + s;
}

// Avvio
aggiornaTabellaCompleta();
setInterval(mostraOra, 1000);
mostraOra();

// ===== SALVA EVENTO =====
function salvaIncontro() {
    var evento = {
        luogo: document.getElementById("luogo").value.trim(),
        data: document.getElementById("dataIncontro").value.trim(),
        prezzo: document.getElementById("prezzo").value.trim(),
        info: document.getElementById("infoBiglietto").value.trim()
    };

    localStorage.setItem("eventoCircolo", JSON.stringify(evento));
    mostraEvento(evento);
}

// ===== MOSTRA EVENTO =====
function mostraEvento(e) {
    document.getElementById("riepilogo-incontro").innerHTML =
        "<strong>📍 " + e.luogo + "</strong><br>" +
        "📅 " + e.data + "<br>" +
        "🎟 " + e.prezzo + "€<br>" +
        "ℹ " + (e.info || "—");

    avviaCountdown(e.data);
    aggiornaMappa(e.luogo);
    generaQR(e);
}

// ===== COUNTDOWN =====
function avviaCountdown(dataString) {
    var target = new Date(dataString);

    setInterval(function () {
        var now = new Date();
        var diff = target - now;

        if (diff <= 0) {
            document.getElementById("countdown").innerHTML = "⚔ EVENTO IN CORSO";
            return;
        }

        var h = Math.floor(diff / 1000 / 60 / 60);
        var m = Math.floor((diff / 1000 / 60) % 60);
        var s = Math.floor((diff / 1000) % 60);

        document.getElementById("countdown").innerHTML =
            "⏳ " + h + "h " + m + "m " + s + "s";
    }, 1000);
}

// ===== MAPPA =====
function aggiornaMappa(luogo) {
    document.getElementById("mappa").src =
        "https://www.google.com/maps?q=" + encodeURIComponent(luogo) + "&output=embed";
}

// ===== QR =====
function generaQR(e) {
    var canvas = document.getElementById("qr");
    var ctx = canvas.getContext("2d");

    var url = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
        encodeURIComponent(JSON.stringify(e));

    var img = new Image();
    img.src = url;

    img.onload = function () {
        canvas.width = 150;
        canvas.height = 150;
        ctx.drawImage(img, 0, 0);
    };
}

// ===== AVVIO AUTOMATICO =====
window.addEventListener("load", function () {

    var saved = localStorage.getItem("eventoCircolo");

    if (saved) {
        mostraEvento(JSON.parse(saved));
    } else {
        // EVENTO DI DEFAULT GIÀ ATTIVO
        // evento tra poche ore da adesso
var now = new Date();
now.setHours(now.getHours() + 3);

var eventoDefault = {
    luogo: "Magazzino 17, zona industriale Milano",
    data: now.getFullYear() + "-" +
          String(now.getMonth()+1).padStart(2,'0') + "-" +
          String(now.getDate()).padStart(2,'0') + " " +
          String(now.getHours()).padStart(2,'0') + ":" +
          String(now.getMinutes()).padStart(2,'0'),
    prezzo: "25",
    info: "Ingresso su invito. Pagamento in contanti. Vietato registrare."
};

        mostraEvento(eventoDefault);
    }
});
