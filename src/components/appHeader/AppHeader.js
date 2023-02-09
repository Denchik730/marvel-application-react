import './appHeader.scss';

const AppHeader = () => {
  return (
    <header className="header">
      <h1 className="header__title">
        <a className="header__title-link" href="#">
          <span className="header__title_span-marvel">Marvel</span> information portal
        </a>
      </h1>
      <nav className="header__menu">
        <ul className="header__menu-links">
          <li><a className="header__menu-link" href="#">Characters</a></li>
          /
          <li><a className="header__menu-link" href="#">Comics</a></li>
        </ul> 
      </nav>
    </header>
  )
}

export default AppHeader;