import '../CSS/Header.css';

function Button({name, onClick}) {
    return (
      <div onClick={() => onClick(name)}>{name}</div>
    );
  }
  
  function Header({ onChangePage }) {
    return (
      <header>
        <div className="title">This is Home Page</div>
        <div className="menu-bar">
            <Button name="IT" onClick={onChangePage} />
            <Button name="Daily Life" onClick={onChangePage} />
            <Button name="Sports" onClick={onChangePage} />
            <Button name="Game" onClick={onChangePage} />
            <Button name="News" onClick={onChangePage} />
            <Button name="World" onClick={onChangePage} />
            <Button name="Entertainments" onClick={onChangePage} />
        </div>
        <div className="sign-up">This is Sign-in</div>
      </header>
    );
  }
  
export default Header;