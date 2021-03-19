import { useState } from "react";
import Button from "./Button";
import Card from "./Card";
import Levels from "./Levels";

// shuffle the cardValue array
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

// method to check {} is empty or not
function isObjectEmpty(value) {
  return (
    Object.prototype.toString.call(value) === "[object Object]" &&
    JSON.stringify(value) === "{}"
  );
}

// creating values of the card
const createCardValue = (cardLevel) => {
  const card = [];
  for (let i = 1; i <= cardLevel; i++) {
    card.push({
      flip: false,
      value: Math.ceil(i / 2),
    });
  }
  shuffle(card); //initial game start
  return card;
};

function Board() {
  const easyLevel = 8,
    mediumLevel = 16,
    hardLevel = 24;

  // initialinzing state
  const [gameStart, setgameStart] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [cardLevel, setCardLevel] = useState(easyLevel);
  const [cardDeck, setCardDeck] = useState(createCardValue(cardLevel));
  const [compareCardArr, setCompareCardArr] = useState({});
  const [gameOver, setGameOver] = useState(false);
  const [heading, setHeading] = useState("");
  const [pairCounter, setPairCounter] = useState(1);
  const [movesCounter, setMovesCounter] = useState(0);
  const [customeLevel, setcustomeLevel] = useState(easyLevel);

  // Restarting the game after game is over
  const restartGame = (level) => {
    resetGame(level);
    setHeading(`Hello! ${playerName}, Let's Rock!!🚀🚀`);
    setGameOver(false);
  };

  // Resetting the game if player want to start over again.
  const resetGame = (level) => {
    // shuffle(card);
    setCardDeck(createCardValue(level));
    setCompareCardArr({});
    setPairCounter(1);
    setMovesCounter(0);
  };

  const scoreCalculation = () => {
    let baseScore = cardLevel / 2 - 1;
    return Math.round((baseScore / movesCounter) * 100);
  };

  // function to check game is ended or not
  const gameEnd = () => {
    if (pairCounter >= cardLevel / 2) {
      setHeading(`Hurrah! 🎉 You won with ${scoreCalculation()}% accuracy`);
      setTimeout(() => {
        setGameOver(true);
      }, 1500);
    }
  };

  // Starting game according to level or custome input
  const levelSetUp = (level) => {
    setCardLevel(level);
    restartGame(level);
  };

  const customLevelSetup = (event) => {
    setcustomeLevel(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setHeading(`Hello! ${playerName}, Let's Rock!!🚀🚀`);
    setgameStart(true);
  };

  const setCompareArr = (newState) => {
    // updating CardDeck value according to new state value
    setCardDeck(
      cardDeck.map((item, id) => {
        if (id === newState.id) {
          item.flip = newState.flip;
          return item;
        } else {
          return item;
        }
      })
    );
    // comparring previous click with new click and assigning value accordingly
    setCompareCardArr((preState) => {
      if (isObjectEmpty(preState)) {
        return newState; // prev state is empty so returing new state value
      } else if (preState.id === newState.id) {
        return preState; // prev click and new click on same card, returning same value
      } else if (preState.value === newState.value) {
        setPairCounter(pairCounter + 1); // increasing pairCounter if preValue and newValue is same.
        setMovesCounter(movesCounter + 1);
        gameEnd();
        return {};
      } else {
        setMovesCounter(movesCounter + 1);
        setTimeout(() => {
          // setting card value to previous state as pair is not found
          setCardDeck(
            cardDeck.map((item, id) => {
              if (id === preState.id || id === newState.id) {
                item.flip = false;
                return item;
              } else {
                return item;
              }
            })
          );
        }, 500);
        return {};
      }
    });
  };

  return (
    <>
      {gameStart ? (
        <>
          <header className="board-header">
            <h2 className="board-heading score">Moves: {movesCounter}</h2>
            <h2 className="board-heading">{heading}</h2>

            <Button
              handleClick={() => resetGame(cardLevel)}
              disabled={gameOver}
              title="Reset"
            />
          </header>

          <Levels
            levelSetUp={levelSetUp}
            easy={easyLevel}
            medium={mediumLevel}
            hard={hardLevel}
            customeLevel={customeLevel}
            customLevelSetup={customLevelSetup}
          />

          <div className="board-body">
            {gameOver ? (
              <div className="winnerContainer">
                <iframe
                  title="winner Gif"
                  src="https://giphy.com/embed/l0HlSDiA6WUytl9oA"
                  className="winnerGif"
                ></iframe>
                <Button
                  handleClick={() => restartGame(cardLevel)}
                  title="Play Again"
                />
              </div>
            ) : (
              <div
                className={`board-game  ${cardLevel >= 18 ? "hard-board" : ""}`}
              >
                {cardDeck.map((item, id) => (
                  <Card
                    key={id}
                    cardDeck={cardDeck}
                    {...item}
                    id={id}
                    compareCardArr={compareCardArr}
                    setCompareArr={setCompareArr}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="game-start-container">
          <div className="game-input-container">
            <h1 className="board-heading">Welcome to The Memory Game!!</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
              <label htmlFor="name">Player Name:</label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                required
              />
              <Button title="Let's Go" />
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Board;
