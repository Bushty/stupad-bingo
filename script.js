let card = [];

function generateBingoCard() {
    const bingoCard = document.getElementById('bingo-card');
    const bingoStatus = document.getElementById('bingo-status');
    bingoCard.innerHTML = ''; // Clear any existing card
    bingoStatus.innerHTML = ''; // Clear any existing status

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
        "pReKäRe LaGe dEr sTuDieRenDeN", 
        "SDGs", 
        "So viel Text auf Folie/Plakat, dass nichts lesbar ist", 
        "vErEiNzElUnG", 
        "Volksinitiative",
        "UnDEMOkRaTiScH",
        "UnSoLiDaRisCh"
    ];

    // Shuffle the words array
    for (let i = words.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [words[i], words[j]] = [words[j], words[i]];
    }

    // Reset the card array
    card = Array(5).fill().map(() => Array(5).fill(false));

    // Create 5x5 bingo card
    for (let i = 0; i < 25; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.classList.add("noselect")
        cell.textContent = words[i];
        cell.addEventListener('click', () => markCell(i));
        bingoCard.appendChild(cell);
    }
}

function markCell(index) {
    const row = Math.floor(index / 5);
    const col = index % 5;

    card[row][col] = !card[row][col]; // Toggle the cell's marked state
    const cell = document.querySelectorAll('.cell')[index];
    cell.classList.toggle('marked');

    if (checkBingo()) {
        document.getElementById('bingo-status').textContent = 'BINGO!';
    } else {
        document.getElementById('bingo-status').textContent = '';
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

function downloadBingoCard() {
    const bingoCardVisible = document.getElementById('bingo-card');
    const bingoCardHidden = document.getElementById('bingo-card-hidden');

    // Copy the content of the visible Bingo card to the hidden div
    bingoCardHidden.innerHTML = bingoCardVisible.innerHTML;
    bingoCardHidden.style.width = bingoCardVisible.offsetWidth + 'px';
    bingoCardHidden.style.height = bingoCardVisible.offsetHeight + 'px';

    // Convert hidden div content to an image
    domtoimage.toPng(bingoCardHidden)
        .then(function (dataUrl) {
            // Create a temporary link element
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'bingo_card.png';

            // Trigger download
            link.click();
        })
        .catch(function (error) {
            console.error('Error generating Bingo card image:', error);
        });
}






// On mobile: zoom out to display everything on screen
window.onload = function() {
    if (isMobileDevice() && window.innerWidth <= 600) {
        zoomOut();
    }
}

function isMobileDevice() {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
}

let isZoomedOut = false;

function zoomOut() {
    const zoomButton = document.getElementById("zoom-button");
    const bingoCardContainer = document.getElementById('bingo-card');
    if (!isZoomedOut) {
        bingoCardContainer.style.transform = 'scale(0.6)'; // Zoom out
        zoomButton.textContent = "Zoom In";
    } else {
        bingoCardContainer.style.transform = 'scale(1)'; // Return to original size
        zoomButton.textContent = "Zoom Out";
    }
    isZoomedOut = !isZoomedOut; // Toggle the zoom state
}