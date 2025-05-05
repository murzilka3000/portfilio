import { useState, useEffect, useRef } from 'react';
import s from './Header.module.scss';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../ui/language/LanguageSwitcher';

const Header = () => {
  const { t } = useTranslation();
  const [showHeader, setShowHeader] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const lastScrollTop = useRef(0);

  // Обработчик скролла для управления видимостью шапки
  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Показать/скрыть шапку при скролле
    if (scrollTop > lastScrollTop.current + 10) {
      setShowHeader(false); // Прокрутка вниз
    } else if (scrollTop < lastScrollTop.current - 10) {
      setShowHeader(true); // Прокрутка вверх
    }
    
    // Добавить эффект фона при скролле
    if (scrollTop > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
    
    // Определяем активный раздел
    const sections = [
      'about', 
      'skills',
      'work', 
      'review', 
      'contact'
    ];
    
    // Дополнительные секции для активации навигационных элементов
    const additionalMapping = {
      'workprocess': 'skills',
      'achievements': 'skills'
    };
    
    let foundActive = false;
    
    for (const sectionId of sections) {
      const section = document.getElementById(sectionId);
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 200 && rect.bottom >= 200) {
          setActiveSection(sectionId);
          foundActive = true;
          break;
        }
      }
    }
    
    // Если не нашли в основных разделах, проверим в дополнительных
    if (!foundActive) {
      for (const [additionalId, mappedId] of Object.entries(additionalMapping)) {
        const section = document.getElementById(additionalId);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(mappedId);
            break;
          }
        }
      }
    }
    
    lastScrollTop.current = scrollTop;
  };

  // Закрытие мобильного меню при клике на пункт
  const handleNavClick = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    
    // Инициализация активного раздела
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header> 
      <div className={`${s.header} ${showHeader ? s.show : s.hide} ${scrolled ? s.scrolled : ''}`}>
        <nav className={s.navContainer}>
          <LanguageSwitcher className={s.languageSwitcherLeft} />
          
          <div className={s.navIsland}>
            <div className={`${s.navLinks} ${menuOpen ? s.open : ''}`}>
              <a 
                href="#about" 
                className={activeSection === 'about' ? s.active : ''} 
                onClick={handleNavClick}
              >
                {t('обо мне')}
              </a>
              <a 
                href="#skills" 
                className={activeSection === 'skills' ? s.active : ''} 
                onClick={handleNavClick}
              >
                {t('навыки')}
              </a>
              <a 
                href="#work" 
                className={activeSection === 'work' ? s.active : ''} 
                onClick={handleNavClick}
              >
                {t('портфолио')}
              </a>
              <a 
                href="#review" 
                className={activeSection === 'review' ? s.active : ''} 
                onClick={handleNavClick}
              >
                {t('отзывы')}
              </a>
              <a 
                href="#contact" 
                className={activeSection === 'contact' ? s.active : ''} 
                onClick={handleNavClick}
              >
                {t('контакты')}
              </a>
            </div>
          </div>
          
          
        </nav>
      </div>
    </header>
  );
};

export default Header;