import { useState, useEffect } from 'react';
import s from './Header.module.scss';

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  let lastScrollTop = 0;

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
      setShowHeader(false); // Прокрутка вниз
    } else {
      setShowHeader(true); // Прокрутка вверх
    }
    lastScrollTop = scrollTop;
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`${s.header} ${showHeader ? s.show : s.hide}`}>
      <nav>
        <ul>
          <li className={s.navItem}>
            <a href="#about">обо мне</a>
            <a href="#work">проекты</a>
            <a href="#review">отзывы</a>
            <a href="#contact">контакты</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;