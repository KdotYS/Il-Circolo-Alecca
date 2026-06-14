// Controlla la password e reindirizza al circolo
function verificaUtenza() {
    var codice = document.getElementById("codiceUnivoco").value;
    var errore = document.getElementById("messaggio-errore");

    if (codice.toLowerCase() === "diamante") {
        window.location.href = "indexCircolo.html";
    } else {
        errore.textContent = "⛔ CODICE ERRATO — ACCESSO NEGATO";
    }
}

// Permette di premere Invio per accedere
document.getElementById("codiceUnivoco").addEventListener("keydown", function (e) {
    if (e.key === "Enter") verificaUtenza();
});
