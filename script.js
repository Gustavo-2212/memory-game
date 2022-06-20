//  querySelectorAll != querySelector
const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let hits = 0;
let attempts = 0;

function flipCard(){
    if ( lockBoard ) return;
    if ( this === firstCard ) return;

    this.classList.add('flip');
    if ( !hasFlippedCard ){
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkMatch();
}

function checkMatch(){
    attempts++;
    if ( firstCard.dataset.card === secondCard.dataset.card ){
        hits++;
        disableCards(); // retira o listener das cartas que corresponderam
        return;
    }

    unflipedCards();
}

function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipedCards(){
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];

    console.log(`Attempts: ${attempts}\nHits: ${hits}`);
}

// Função auto-invocável
(function shuffle(){ // embaralhar as cartas com a propriedade order do display flex container
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    });
})();

cards.forEach((card) => {
    card.addEventListener('click', flipCard);
});

