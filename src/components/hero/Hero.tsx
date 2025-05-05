import { useTranslation } from 'react-i18next';
import s from './Hero.module.scss';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import HeroParticles from './HeroParticles';

const Hero = () => {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  
  // Эффект анимации заголовка с GSAP
  useEffect(() => {
    if (!titleRef.current) return;
    
    const titleAnimation = gsap.timeline();
    
    titleAnimation.fromTo(
      titleRef.current.querySelector('h1'), 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    ).fromTo(
      titleRef.current.querySelector(`.${s.subtitle}`),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.5"
    ).fromTo(
      `.${s.actions} a`,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.2, duration: 0.6, ease: "power3.out" },
      "-=0.5"
    );
    
    return () => {
      titleAnimation.kill();
    };
  }, []);

  return (
    <section ref={heroRef} className={s.hero} id='about'>
      {/* Интерактивные частицы с реакцией на движение мыши */}
      <HeroParticles particleCount={80} />
      
      <div className={s.content}>
        <div className={s.titleWrapper} ref={titleRef}>
          <h1 className={s.title}>
            <span className={s.greeting}>{t('hero_sub')}</span>
            <span className={s.name}>{t('hero_title')}</span>
          </h1>
          <div className={s.subtitle}>
            {t('hero_desk')}
          </div>
        </div>
        
        <div className={s.actions}>
          <a href="https://t.me/murzilka300" target="_blank" rel="noopener noreferrer" className={s.primaryButton}>
            {t('Связаться')}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
          
          <a href="#work" className={s.secondaryButton}>
            {t('Мои работы')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;