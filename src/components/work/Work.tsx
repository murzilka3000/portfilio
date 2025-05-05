import { work } from './dataWork';
import s from './Work.module.scss';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';

const Work = () => {
    const { t } = useTranslation();
    const workRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);

    // Единый эффект для анимации и интерактивности
    useEffect(() => {
        
        
        
        // Получаем все карточки после рендеринга
        const cards = document.querySelectorAll(`.${s.card}`);
        
        if (cards.length === 0) return;
        
        // Базовая анимация появления элементов
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, idx) => {
                if (entry.isIntersecting) {
                    // Применяем анимацию с задержкой
                    setTimeout(() => {
                        (entry.target as HTMLElement).style.opacity = '1';
                        (entry.target as HTMLElement).style.transform = 'translateY(0)';
                    }, idx * 100);
                    
                    // Прекращаем наблюдение после появления
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        });
        
        // Наблюдаем за всеми карточками
        cards.forEach((card) => {
            // Устанавливаем начальные стили
            (card as HTMLElement).style.opacity = '0';
            (card as HTMLElement).style.transform = 'translateY(50px)';
            (card as HTMLElement).style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            // Начинаем наблюдение
            observer.observe(card);
            
        });
        
        // 3D-эффект при наведении
        const handleMouseMove = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const card = target.closest(`.${s.card}`) as HTMLElement;
            
            if (!card) return;
            
            // Получаем координаты относительно карточки
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Нормализуем координаты от -1 до 1
            const xPercent = (x / rect.width - 0.5) * 2;
            const yPercent = (y / rect.height - 0.5) * 2;
            
            // Применяем 3D-эффект тильта
            const intensity = 7; // Интенсивность эффекта
            card.style.transform = `
                perspective(1000px) 
                rotateY(${xPercent * intensity}deg) 
                rotateX(${-yPercent * intensity}deg)
                translateZ(10px)
            `;
            
            // Эффект "света" от курсора
            const imgContainer = card.querySelector(`.${s.imgContainer}`) as HTMLElement;
            if (imgContainer) {
                imgContainer.style.background = `
                    radial-gradient(
                        circle at ${x}px ${y}px,
                        rgba(123, 90, 255, 0.15),
                        transparent 50%
                    )
                `;
            }
        };
        
        // Обработчик выхода мыши из карточки
        const handleMouseLeave = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const card = target.closest(`.${s.card}`) as HTMLElement;
            
            if (!card) return;
            
            card.style.transform = 'translateY(0)';
            
            const imgContainer = card.querySelector(`.${s.imgContainer}`) as HTMLElement;
            if (imgContainer) {
                imgContainer.style.background = '';
            }
        };
        
        // Добавляем обработчики событий на секцию
        if (sectionRef.current) {
            sectionRef.current.addEventListener('mousemove', handleMouseMove);
            sectionRef.current.addEventListener('mouseleave', handleMouseLeave);
        }
        
        // Очистка при размонтировании
        return () => {
            cards.forEach(card => observer.unobserve(card));
            
            if (sectionRef.current) {
                sectionRef.current.removeEventListener('mousemove', handleMouseMove);
                sectionRef.current.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, []);

    return (
        <section id='work' ref={sectionRef} className={s.workSection}>
            <h2 className={s.title}>{t('Мои работы')}</h2>
            <div className={s.work} ref={workRef}>
                {work.map((item, index) => (
                    <div className={s.card} key={index}>
                        <div className={s.imgContainer}>
                            <img src={item.img} alt={t(item.title)} loading="lazy" />
                            {item.tags && (
                                <div className={s.tags}>
                                    {item.tags.map((tag, i) => (
                                        <span key={i} className={s.tag}>{t(tag)}</span>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className={s.bottomContainer}>
                            <h3>{t(item.title)}</h3>
                            <p>{t(item.desc)}</p>
                            <div className={s.block}>
                                <div className={s.linkBlock}>
                                    <a href={item.Link} target='_blank' rel='noopener noreferrer'>
                                        <span>{t('Перейти на сайт')}</span>
                                        <svg className={s.arrow} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Work;