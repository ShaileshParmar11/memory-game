import Button from "./Button";

function Levels({
  levelSetUp,
  easy,
  medium,
  hard,
  customeLevel,
  customLevelSetup,
}) {
  const easyLevel = () => {
    levelSetUp(easy);
  };
  const mediumLevel = () => {
    levelSetUp(medium);
  };
  const hardLevel = () => {
    levelSetUp(hard);
  };
  const customInput = (e) => {
    e.preventDefault();
    levelSetUp(customeLevel);
  };
  return (
    <>
      <div className="levels">
        <Button title="Easy" handleClick={easyLevel} />
        <Button title="medium" handleClick={mediumLevel} />
        <Button title="Hard" handleClick={hardLevel} />
      </div>
      <form>
        <label htmlFor="customeInput">Customize your game: </label>
        <input
          type="number"
          name="customeInput"
          id="customeInput"
          value={customeLevel}
          min={8}
          max={24}
          step={2}
          onChange={(e) => customLevelSetup(e)}
        />
        <Button title="Add" handleClick={(e) => customInput(e)} />
      </form>
    </>
  );
}

export default Levels;
