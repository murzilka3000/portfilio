import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import s from './PageTransition.module.scss';

const PageTransition = () => {
  const location = useLocation();
  const overlayRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    
    // Скрываем оверлей изначально
    gsap.set(overlay, { yPercent: -100 });
    
    // Анимация переходов между страницами
    const pageTransition = () => {
      const tl = gsap.timeline();
      
      // Анимация перекрытия экрана
      tl.to(overlay, {
        yPercent: 0,
        duration: 0.5,
        ease: 'power3.inOut'
      })
      .set(document.documentElement, { overflow: 'hidden' })
      .to(overlay, {
        yPercent: 100,
        duration: 0.5,
        delay: 0.1,
        ease: 'power3.inOut'
      })
      .set(document.documentElement, { overflow: '' })
      .set(overlay, { yPercent: -100 });
      
      return tl;
    };
    
    pageTransition();
    
    // Запускаем анимацию при изменении маршрута
    window.addEventListener('popstate', pageTransition);
    
    return () => {
      window.removeEventListener('popstate', pageTransition);
    };
  }, [location.pathname]);
  
  return (
    <div className={s.transitionOverlay} ref={overlayRef}>
      <div className={s.loadingIndicator}></div>
    </div>
  );
};

export default PageTransition;
