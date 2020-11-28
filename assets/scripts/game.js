
//TUdo relaciona a criação das cartas, aqui criamos um objeto do game com as tecnologias e cartas.

let game = {

    lockMode: false,

    firstCard: null,

    secondCard: null,

    tech: [
        'bootstrap',
        'css',
        'electron',
        'firebase',
        'html',
        'javascript',
        'jquery',
        'mongo',
        'node',
        'react'
    ],
    
    cards: null,

    setCard: function(id){
        //Nesse caso colocamos em card, pegamos passando uma função que retorna se
        //o card dentro de cards tiver o id igual o id passado, ele retorna uma array
        //E sempre queremos apenas o primeiro elemento, já que id é individual.
        //Esse primeiro elemento é a carta correspondente.

        let card = this.cards.filter(card => card.id === id)[0] 


        if(card.flipped || this.lockMode){
            return false;
        }

        if(!this.firstCard){
            //tenta colocar a primeira carta, se der ele retorna true.
            this.firstCard = card;
            card.flipped = true;
            return true;
        }else{
            //coloca na segunda entra em lockmode
            this.secondCard = card;
            card.flipped = true;
            this.lockMode = true;

            return true;
        }
    },

    checkMatch: function(){
        if(this.firstCard.icon === this.secondCard.icon){
            return true;
        }else{
            //Coloquei para remover o flipped aqui
            this.unflipCards();
            return false;

        }
        
        
    },

    clearCards: function(){
        this.firstCard = null
        this.secondCard = null;
        this.lockMode = false;
    },

    unflipCards: function(){
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
    },

    createCardsFromTechs: function (){
        this.cards = [];
    
        for(let tech of this.tech){
            this.cards.push(this.createPairFromTech(tech)) ///devolve uma array com 10 pares de array
        }
    
        //O flat map vai atuar quando uma array tiver array dentro, assim ele pega todos os elementos e "desmembra eles"
        this.cards = this.cards.flatMap(pair => pair) // devolve uma array com os 20 elementos.
        return this.shuffleCards() //Retorna o array com as cartas embaralhadas.

    },
    
    createPairFromTech: function (tech){
    
        return [{
            id: this.createIdWithTech(tech), //criando a id
            icon: tech,
            flipped: false
        }, {
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false
        }]
    },
    
    createIdWithTech: function (tech){
        return tech + parseInt(Math.random() * 1000)
    },

    shuffleCards: function (){
        let currentIndex = this.cards.length;
        let randomIndex = 0;
    
        while(currentIndex != 0){
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
    
            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]
        }
    }
    
    
}