const board = document.getElementById('game-board');
const emojis = ['😁', '😭', '🤗', '🫡', '😐', '😏', '😇', '🙂'];
let cards = [].concat(emojis, emojis); // duplicate for pairs
let flippedCards = [];
let lockBoard = false;

//Shuffle cards
cards.sort(function(){
    return 0.5 - Math.random();
});

//Create cards on the board
cards.forEach(function(emoji, index){
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.dataset.index = index;
    card.innerText = '';
    board.appendChild(card);
});

//Card click handler
board.addEventListener('click', function(e){
    const clicked = e.target;
    if(!clicked.classList.contains('card')||lockBoard) return;
    if(flippedCards.includes(clicked)) return;

    //Show the emoji
    clicked.innerText = clicked.dataset.emoji;
    clicked.classList.add('flipped');
    flippedCards.push(clicked);

    if (flippedCards.length === 2){
        lockBoard = true;
        const first = flippedCards[0];
        const second = flippedCards[1];
    
        
        if (first.dataset.emoji === second.dataset.emoji){
            //Match

            flippedCards = [];
            lockBoard = false;
        } else{
            setTimeout(function(){
                first.innerText ='';
                second.innerText = '';
                first.classList.remove('flipped');
                second.classList.remove('flipped');
                flippedCards = [];
                lockBoard = false;
            }, 1000);
        }
    }
});
