let card = [];

function generateBingoCard() {
    const bingoCard = document.getElementById('bingo-card');
    const bingoStatus = document.getElementById("bingo-status");
    bingoCard.innerHTML = ""; // clear any existing card
    bingoStatus.innerHTML = ""; // clear any existing status

    const words = [
        "Absolute Ignoranz darüber, dass niemand sie mag",
        "AG Wird gegründet", 
        "Alle Prüfungen abschaffen jetzt", 
        "Alter deutscher Autor wird zitiert",
        "BALLERsPiELe", 
        "Casual Racism/Sexism/...", 
        "Die Hochschule ist der Ort, um die Gesellschaft zu verändern",
        "dRiTtMiTteL", 
        "Enteignen!",
        "Haupt- und Nebenwiederspruch (Kapitalismus überwinden -> alles gut)", 
        "Ja, ich bin auch bei Blue Engineering dabei...",
        "Klimathema wird angesprochen, aber nicht verstanden",
        "Konkurrenz = schlecht",
        "Kultur",
        "Lutz redet ewig (Free Space)", 
        "Lutz unbricht weiblich gelesene Person",
        "Neu rekrutierte Person sagt auch mal was", 
        "Projektwoche",
        "pReKäRe LaGe DeR sTuDiErEnDeN", 
        "SDGs", 
        "So viel Text auf Folie/Plakat, dass nichts lesbar ist", 
        "vErEiNzElUnG", 
        "Volksinitiative",
        "UnDEMOkRaTiScH",
        "UnSoLiDaRisCh"
    ];

    // Shuffle the words Array
    for (let i = words.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [words[i], words[j]] = [words[j], words[i]];
    }

    // Reset the card array
    card = Array(5).fill().map(() => Array(5).fill(false));

    // Create 5x5 bingo card
    for (let i = 0; i < 25; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        const span = document.createElement("span");
        span.textContent = words[i];
        cell.appendChild(span);
        cell.addEventListener("click", () => markCell(i));
        bingoCard.appendChild(cell);

        adjustFontSize(span);
    }
}

function markCell(index) {
    const row = Math.floor(index / 5);
    const col = index % 5;

    card[row][col] = !card[row][col]; // toggle the cell's marked state
    const cell = document.querySelectorAll(".cell")[index];
    cell.classList.toggle("marked");

    if(checkBingo()) {
        document.getElementById("bingo-status").textContent = "BINGO!";
    } else {
        document.getElementById("bingo-status").textContent = "";
    }
}

function checkBingo() {
    // Check rows
    for (let row = 0; row < 5; row++) {
        if (card[row].every(cell => cell)) return true;
    }

    // Check columns 
    for (let col = 0; col < 5; col++) {
        if (card.every(row => row[col])) return true;
    }

    // Check diagonals
    if (card.every((row, idx) => row[idx])) return true;
    if (card.every((row, idx) => row[4 - idx])) return true;

    return false;
}

function adjustFontSize(element) {
    const textLength = element.textContent.length;
    let fontSize;

    if (textLength <= 5) {
        fontSize = "4vw";
    } else if (textLength <= 10) {
        fontSize = "3.5vw";
    } else if (textLength <= 20) {
        fontSize = "3vw";
    } else {
        fontSize = "2.5vw";
    }

    element.style.fontSize = fontSize;
}
