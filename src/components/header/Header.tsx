import { useState, useEffect } from 'react';
import s from './Header.module.scss';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../ui/language/LanguageSwitcher';

const Header = () => {

  const { t } = useTranslation();

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
    <header> 
      <div className={`${s.header} ${showHeader ? s.show : s.hide}`}>
        <nav>
          <ul>
            <li className={s.navItem}>
              <a href="#work">{t('проекты')}</a>
              <a href="#review">{t('отзывы')}</a>
              <a href="#contact">{t('контакты')}</a>
              <LanguageSwitcher />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;