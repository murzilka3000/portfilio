import s from './Header.module.scss'

const Header = () => {
  return (
    <header className={s.header}>
      <nav>
        <ul>
          <li className={s.navItem}>
            <a href="#about">обо мне</a>
            <a href="#projects">проекты</a>
            <a href="#review">отзывы</a>
            <a href="#contact">контакты</a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header