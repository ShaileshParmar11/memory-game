import { useState } from "react";
import Card from "./Card";

const cardValue = [];
const cardLevel = 6;
let card = [];

// creating values of the card
const createCardValue = (cardLevel) => {
  for (let i = 1; i <= cardLevel; i++) {
    cardValue.push(Math.ceil(i / 2));
  }
  // console.log(cardValue);
};

createCardValue(cardLevel);

// creating card
const createCards = (cardValue) => {
  for (let i = 0; i < cardValue.length; i++) {
    card.push({
      flip: false,
      value: cardValue[i],
    });
  }
  // console.log(card);
};

createCards(cardValue);

function Board() {
  // createCards(cardValue);

  const [cardDeck, setCardDeck] = useState(card);

  const changeCardDeck = (deck) => {
    setCardDeck(deck);
  };

  return (
    <div className="board">
      {cardDeck.map((item, id) => (
        <Card
          key={id}
          id={id}
          cardDeck={cardDeck}
          {...item}
          changeCardDeck={changeCardDeck}
        />
      ))}
    </div>
  );
}

export default Board;
