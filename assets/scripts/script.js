const FRONT = "card_front"
const BACK = "card_back"
const CARD = 'card'
const ICON = 'icon'


startGame()

function startGame(){
    initializeCards(game.createCardsFromTechs());// aciono o create cards enquanto chamo o initialize.
}

function initializeCards(){
    let gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = '';

    //Para pegar as cartas só precisei chamar o game.cards
    game.cards.forEach(card=>{ //Para cada carta dentro de cards...
        let cardElement = document.createElement('div'); //Criar uma div....
        cardElement.id = card.id; //Passando o id para a div
        cardElement.classList.add(CARD); //Adicionando a class card para a carta
        cardElement.dataset.icon = card.icon; //Adicionando o data-icon a carta (para comparar depois)

        createCardContent(card, cardElement); //cria a imagem do back e front

        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);

    })
}

function createCardContent(card, cardElement){
    //Aqui está chamando para criar o front e back.
    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement)
}

function createCardFace(face, card, cardElement){

    let cardElementFace = document.createElement('div'); //cria uma div 
    cardElementFace.classList.add(face); //adiciona se é o back ou front, colocando a classe.
    if(face == FRONT){
        let iconElement = document.createElement('img'); //cria uma img
        iconElement.classList.add(ICON); //adiciona a class ICON dentro desta img
        iconElement.src = "./assets/images/" + card.icon + ".png";  //Adiciona a imagem no img
        cardElementFace.appendChild(iconElement); //Coloca o img dentro do cardElementFace
    }else{
        cardElementFace.innerHTML = "&lt/&gt";
    }   

    cardElement.appendChild(cardElementFace); //Adiciona o CardElementFace de volta ao cardElement.
}




function flipCard(){
    if(game.setCard(this.id)){
        //Se ele retorna true, ele vai virar a carta, se não, ele nem vira.
        this.classList.add("flip");

        if(game.secondCard){
            if(game.checkMatch()){
                game.clearCards();
                if(game.checkGameOver()){
                    let gameOverLayer = document.getElementById("gameOver");
                    gameOverLayer.style.display = 'flex'
                }
            }else{
    
                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secondCardView = document.getElementById(game.secondCard.id);
    
                    firstCardView.classList.remove('flip');
                    secondCardView.classList.remove('flip');
    
                    game.unflipCards();
    
                },800)
            }
        }
        
    }
    
}

function restart(){
    game.clearCards();
    startGame();
    let gameOverLayer = document.getElementById("gameOver");
    gameOverLayer.style.display = 'none'

}