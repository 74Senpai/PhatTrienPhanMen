import '../CSS/Header.css';

function Button({name, onClick}) {
    return (
      <button onClick={() => onClick(name)}>{name}</button>
    );
  }
  
  function Header({ onChangePage }) {
    return (
      <header>
        <div className="title">This is Home Page</div>
        <div className="menu-bar">
          <div className="information-technology">
            <Button name="IT" onClick={onChangePage} />
          </div>
          <div className="daily-life">
            <Button name="Daily Life" onClick={onChangePage} />
          </div>
          <div className="sports">
            <Button name="Sports" onClick={onChangePage} />
          </div>
          <div className="game">
            <Button name="Game" onClick={onChangePage} />
          </div>
          <div className="News">
            <Button name="News" onClick={onChangePage} />
          </div>
          <div className="world">
            <Button name="World" onClick={onChangePage} />
          </div>
          <div className="entertainments">
            <Button name="Entertainments" onClick={onChangePage} />
          </div>
        </div>
        <div className="sign-up">This is Sign-in</div>
      </header>
    );
  }
  
export default Header;