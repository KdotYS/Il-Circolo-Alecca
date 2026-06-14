// Aggiorna l'orologio ogni secondoa
function mostraOra() {
    var ora = new Date();
    var h = String(ora.getHours()).padStart(2, '0');
    var m = String(ora.getMinutes()).padStart(2, '0');
    var s = String(ora.getSeconds()).padStart(2, '0');
    document.getElementById("ora").textContent = "CONNESSIONE ATTIVA — " + h + ":" + m + ":" + s;
}

setInterval(mostraOra, 1000);
mostraOra();
