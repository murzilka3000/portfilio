import { useState, useRef, useEffect } from 'react';
import s from './Review.module.scss';
import { review } from './reviewData';
import { useTranslation } from 'react-i18next';

const Review = () => {
  const { t } = useTranslation();
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Ссылки на DOM-элементы
  const containerRef = useRef<HTMLDivElement>(null);
  const slideContentRef = useRef<HTMLDivElement>(null);
  
  // Отслеживаем индикаторы для позиционирования
  const [indicatorPos, setIndicatorPos] = useState({ left: 0, width: 0 });
  
  // Обновляем позицию индикатора при изменении count
  useEffect(() => {
    const updateIndicatorPosition = () => {
      const indicator = document.querySelector(`.${s.indicator}`);
      const activeItem = document.getElementById(`review-indicator-${count}`);
      
      if (indicator && activeItem) {
        const { left, width } = activeItem.getBoundingClientRect();
        const parentLeft = indicator.parentElement?.getBoundingClientRect().left || 0;
        
        setIndicatorPos({
          left: left - parentLeft,
          width: width
        });
      }
    };
    
    updateIndicatorPosition();
    window.addEventListener('resize', updateIndicatorPosition);
    
    return () => {
      window.removeEventListener('resize', updateIndicatorPosition);
    };
  }, [count]);
  
  // Анимируем появление компонента
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.opacity = '0';
      containerRef.current.style.transform = 'translateY(30px)';
      
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.opacity = '1';
          containerRef.current.style.transform = 'translateY(0)';
        }
      }, 300);
    }
  }, []);

  // Переключение на следующий отзыв
  const nextReview = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    // Проверяем наличие DOM-элемента
    if (slideContentRef.current) {
      // Применяем анимацию ухода в сторону
      slideContentRef.current.style.opacity = '0';
      slideContentRef.current.style.transform = 'translateX(-15px)';
      
      // После завершения анимации меняем содержимое и показываем
      setTimeout(() => {
        setCount((prevIndex) => (prevIndex + 1) % review.length);
        
        // Добавляем задержку перед показом нового отзыва
        setTimeout(() => {
          if (slideContentRef.current) {
            slideContentRef.current.style.opacity = '1';
            slideContentRef.current.style.transform = 'translateX(0)';
            setIsAnimating(false);
          }
        }, 20);
      }, 150);
    } else {
      setCount((prevIndex) => (prevIndex + 1) % review.length);
      setIsAnimating(false);
    }
  };

  // Переключение на предыдущий отзыв
  const prevReview = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    // Проверяем наличие DOM-элемента
    if (slideContentRef.current) {
      // Применяем анимацию ухода в сторону
      slideContentRef.current.style.opacity = '0';
      slideContentRef.current.style.transform = 'translateX(15px)';
      
      // После завершения анимации меняем содержимое и показываем
      setTimeout(() => {
        setCount((prevIndex) => (prevIndex - 1 + review.length) % review.length);
        
        // Добавляем небольшую задержку перед показом нового отзыва
        setTimeout(() => {
          if (slideContentRef.current) {
            slideContentRef.current.style.opacity = '1';
            slideContentRef.current.style.transform = 'translateX(0)';
            setIsAnimating(false);
          }
        }, 20);
      }, 150);
    } else {
      setCount((prevIndex) => (prevIndex - 1 + review.length) % review.length);
      setIsAnimating(false);
    }
  };
  
  // Непосредственный переход к отзыву по индексу
  const goToReview = (index: number) => {
    if (isAnimating || index === count) return;
    
    setIsAnimating(true);
    const newDirection = index > count ? 'next' : 'prev';
    
    if (slideContentRef.current) {
      // Анимация зависит от направления
      const translateValue = newDirection === 'next' ? '-15px' : '15px';
      slideContentRef.current.style.opacity = '0';
      slideContentRef.current.style.transform = `translateX(${translateValue})`;
      
      setTimeout(() => {
        setCount(index);
        
        setTimeout(() => {
          if (slideContentRef.current) {
            slideContentRef.current.style.opacity = '1';
            slideContentRef.current.style.transform = 'translateX(0)';
            setIsAnimating(false);
          }
        }, 20);
      }, 150);
    } else {
      setCount(index);
      setIsAnimating(false);
    }
  };

  // Эффект авто-прокрутки
  useEffect(() => {
    const autoSlideInterval = setInterval(() => {
      if (!isAnimating) {
        nextReview();
      }
    }, 7000);
    
    return () => clearInterval(autoSlideInterval);
  }, [isAnimating]);

  // Анимированные звезды рейтинга
  const renderStars = (rating: number) => {
    return (
      <div className={s.starsContainer}>
        {[1, 2, 3, 4, 5].map((_, index) => (
          <div 
            key={index} 
            className={`${s.star} ${index < rating ? s.active : ''}`}
            style={{ animationDelay: `${0.05 * index}s` }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className={s.reviewSection} id='review' ref={containerRef}>
      <div className={s.reviewContainer}>
        <h2 className={s.title}>{t('Отзывы клиентов')}</h2>
        
        <div className={s.carouselWrapper}>
          <div className={s.slideContent} ref={slideContentRef}>
            <div className={s.reviewCard}>
              {review[count].avatar && (
                <div className={s.avatarContainer}>
                  <img 
                    src={review[count].avatar} 
                    alt={t(review[count].title)} 
                    className={s.avatar}
                  />
                </div>
              )}
              
              <div className={s.quoteIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L9.758 4.03c0 0-.218.052-.597.144-.374.091-.829.128-1.447.182-.311.03-.953.041-1.454.41-.239.182-.497.442-.742.707-.229.269-.448.547-.647.838-.199.277-.168.889-.35 1.206-.181.317-.339.646-.468.979-.13.323-.383.67-.48 1.004-.104.329-.18.667-.217 1.004-.036.304-.162.556-.139.857M20 12c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-8 7.93c4.377 0 7.93-3.553 7.93-7.93S16.377 4.07 12 4.07 4.07 7.623 4.07 12 7.623 19.93 12 19.93z"/>
                </svg>
              </div>
              
              {renderStars(review[count].rating || 5)}
              
              <h3 className={s.reviewTitle}>{t(review[count].title)}</h3>
              <p className={s.reviewText}>{t(review[count].text)}</p>
              
              <div className={s.clientInfo}>
                <p className={s.clientName}>{review[count].client || t("Клиент")}</p>
              </div>
            </div>
          </div>
          
          <div className={s.navigation}>
            <button 
              className={s.navButton}
              onClick={prevReview} 
              aria-label={t("Предыдущий отзыв")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
            </button>
            
            <div className={s.indicators}>
              <div 
                className={s.indicator} 
                style={{ 
                  left: `${indicatorPos.left}px`, 
                  width: `${indicatorPos.width}px` 
                }}
              ></div>
              {review.map((_, index) => (
                <button
                  id={`review-indicator-${index}`}
                  key={index}
                  className={`${s.indicatorItem} ${count === index ? s.active : ''}`}
                  onClick={() => goToReview(index)}
                  aria-label={t("Перейти к отзыву {{number}}", { number: index + 1 })}
                >
                  <span></span>
                </button>
              ))}
            </div>
            
            <button 
              className={s.navButton}
              onClick={nextReview} 
              aria-label={t("Следующий отзыв")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className={s.ctaContainer}>
          <a 
            href="https://kwork.ru/user/murzilka300" 
            target="_blank" 
            rel="noopener noreferrer"
            className={s.allReviewsButton}
          >
            <span>{t("Все отзывы")}</span>
            <svg className={s.arrow} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Review;