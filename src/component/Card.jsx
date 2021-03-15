let compareCardArr = [];

function Card(props) {
  let { id, flip, value, changeCardDeck } = props;
  let cardDeck = [...props.cardDeck];

  const compareCard = (cardArr) => {
    let [card1, card2] = cardArr;
    console.log(card1, card2);
    if (card1.value === card2.value) {
      console.log("Match Found");
    } else {
      setTimeout(() => {
        cardDeck[card1.id].flip = false;
        cardDeck[card2.id].flip = false;
        console.log("Not Match");
        changeCardDeck(cardDeck);
      }, 1000);
    }

    compareCardArr = [];
  };

  const handleClick = (id) => {
    cardDeck[id].flip = true;
    compareCardArr.push({ ...cardDeck[id], id });
    console.log(compareCardArr);
    if (compareCardArr.length === 2) {
      compareCard(compareCardArr);
    }
    changeCardDeck(cardDeck);
  };

  return (
    <div className="flip-card" onClick={() => handleClick(id)} id={id}>
      <div className={`flip-card-inner  ${flip ? "flip" : "no-flip"}`}>
        <div className="flip-card-front"></div>
        <div className="flip-card-back">
          <h1>{value}</h1>
        </div>
      </div>
    </div>
  );
}

export default Card;
