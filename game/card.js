class Card {
    constructor(number, color, isMultiplier) {
        this.isMultiplier = isMultiplier;
        this.number = number;
        this.color = color;
    }

    static calculate(cards) {
        let multiplier = cards.filter( (card) => card.isMultiplier ).length + 1;
        let value = cards.length ? -20 : 0;

        cards
            .filter( (card) => !card.isMultiplier )
            .forEach( (card) => value =+ card.number );

        return value * multiplier;
    }
    
    static parse(str) {
        return new Card();
    }

    toString() {
        if(this.isMultiplier) {
            return `${this.color}x`
        }
    }
}