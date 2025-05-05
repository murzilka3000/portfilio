import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import s from './WorkProcess.module.scss';
import { workProcess } from './workProcessData';

const WorkProcess = () => {
  const { t } = useTranslation();
  const processRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  // Инициализируем массив ссылок для каждого шага
  useEffect(() => {
    stepsRef.current = Array(workProcess.length).fill(null);
  }, []);
  
  // Анимация появления шагов при прокрутке
  useEffect(() => {
    
    
    // Функция для анимации элементов при прокрутке
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          // Добавляем класс видимости с задержкой для каскадной анимации
          setTimeout(() => {
            entry.target.classList.add(s.visible);
          }, idx * 150);
          
          // Прекращаем наблюдение после появления
          observer.unobserve(entry.target);
        }
      });
    };
    
    // Настройки наблюдателя
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    });
    
    // Получаем все элементы шагов и начинаем наблюдение
    const steps = document.querySelectorAll(`.${s.processStep}`);
    
    if (steps.length > 0) {
      steps.forEach((step) => {
        observer.observe(step);
      });
      
   
    }
    
    // Очистка при размонтировании
    return () => {
      steps.forEach(step => observer.unobserve(step));
    };
  }, []);
  
  // Рендерим компонент
  return (
    <section id="workprocess" className={s.workProcessSection}>
      <h2 className={s.title}>{t('Процесс работы')}</h2>
      
      <div className={s.processContainer} ref={processRef}>
        {workProcess.map((step, index) => (
          <div 
            key={step.number} 
            className={s.processStep}
            ref={el => stepsRef.current[index] = el}
          >
            <div className={s.stepNumber}>
              <span className={s.number}>{step.number}</span>
              <span className={s.label}>{t(step.step)}</span>
            </div>
            
            <div className={s.stepContent}>
              <h3 className={s.stepTitle}>{t(step.title)}</h3>
              <p className={s.stepDescription}>{t(step.description)}</p>
              
              <div className={s.featuresGrid}>
                {step.features.map((feature, i) => (
                  <div key={i} className={s.featureItem}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    <span>{t(feature)}</span>
                  </div>
                ))}
              </div>
              
              {step.clientQuote && (
                <div className={s.clientQuote}>
                  {t(step.clientQuote.text)}
                  <span className={s.clientName}>{t(step.clientQuote.client)}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkProcess;
