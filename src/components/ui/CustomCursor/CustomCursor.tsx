import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import s from './CustomCursor.module.scss';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    // Начальная позиция за пределами экрана
    gsap.set(cursor, { xPercent: -50, yPercent: -50, opacity: 0 });
    gsap.set(follower, { xPercent: -50, yPercent: -50, opacity: 0 });

    // Анимация появления
    gsap.to([cursor, follower], { 
      opacity: 1, 
      duration: 0.8, 
      ease: "power2.out",
      delay: 0.5
    });

    const moveMouseHandler = (e: MouseEvent) => {
      // Анимация основного курсора
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power1.out"
      });

      // Анимация следующего за курсором элемента
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power3.out"
      });
    };

    // Обработчики для интерактивных элементов
    const handleLinkEnter = () => {
      gsap.to(cursor, { scale: 1.5, duration: 0.3 });
      gsap.to(follower, { scale: 2, opacity: 0.4, duration: 0.3 });
    };

    const handleLinkLeave = () => {
      gsap.to(cursor, { scale: 1, duration: 0.3 });
      gsap.to(follower, { scale: 1, opacity: 1, duration: 0.3 });
    };

    // Добавление обработчиков событий
    document.addEventListener('mousemove', moveMouseHandler);

    // Находим все интерактивные элементы
    const links = document.querySelectorAll('a, button');
    links.forEach(link => {
      link.addEventListener('mouseenter', handleLinkEnter);
      link.addEventListener('mouseleave', handleLinkLeave);
    });

    // Убираем обработчики при размонтировании
    return () => {
      document.removeEventListener('mousemove', moveMouseHandler);
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleLinkEnter);
        link.removeEventListener('mouseleave', handleLinkLeave);
      });
    };
  }, []);

  return (
    <>
      <div className={s.cursor} ref={cursorRef}></div>
      <div className={s.follower} ref={followerRef}></div>
    </>
  );
};

export default CustomCursor;
