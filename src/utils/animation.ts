import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Регистрация плагинов GSAP
gsap.registerPlugin(ScrollTrigger);

/**
 * Набор утилит для анимаций на сайте
 */
export const animations = {
  /**
   * Анимация появления элемента снизу
   */
  fadeInUp: (element: Element | null, delay: number = 0, duration: number = 0.8) => {
    if (!element) return;
    
    return gsap.fromTo(
      element,
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration, 
        delay,
        ease: 'power3.out'
      }
    );
  },
  
  /**
   * Анимация появления элемента слева
   */
  fadeInLeft: (element: Element | null, delay: number = 0, duration: number = 0.8) => {
    if (!element) return;
    
    return gsap.fromTo(
      element,
      { x: -50, opacity: 0 },
      { 
        x: 0, 
        opacity: 1, 
        duration, 
        delay,
        ease: 'power3.out'
      }
    );
  },
  
  /**
   * Анимация появления элемента справа
   */
  fadeInRight: (element: Element | null, delay: number = 0, duration: number = 0.8) => {
    if (!element) return;
    
    return gsap.fromTo(
      element,
      { x: 50, opacity: 0 },
      { 
        x: 0, 
        opacity: 1, 
        duration, 
        delay,
        ease: 'power3.out'
      }
    );
  },
  
  /**
   * Плавное появление элемента
   */
  fadeIn: (element: Element | null, delay: number = 0, duration: number = 0.8) => {
    if (!element) return;
    
    return gsap.fromTo(
      element,
      { opacity: 0 },
      { 
        opacity: 1, 
        duration, 
        delay,
        ease: 'power2.out'
      }
    );
  },
  
  /**
   * Создание стандартной анимации при скроллинге
   */
  scrollAnimation: (element: Element | null, animation: (element: Element) => gsap.core.Tween) => {
    if (!element) return;
    
    ScrollTrigger.create({
      trigger: element,
      start: 'top bottom-=100',
      onEnter: () => animation(element),
      once: true
    });
  },
  
  /**
   * Анимация для заголовков при скролле (для крупных секций)
   */
  animateTitle: (element: Element | null) => {
    if (!element) return;
    
    ScrollTrigger.create({
      trigger: element,
      start: 'top bottom-=150',
      onEnter: () => {
        gsap.fromTo(
          element,
          { y: 70, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out'
          }
        );
      },
      once: true
    });
  },
  
  /**
   * Плавный скролл к нужному элементу
   */
  smoothScroll: (target: string | Element, duration: number = 1) => {
    const targetElement = typeof target === 'string' 
      ? document.querySelector(target) 
      : target;
    
    if (!targetElement) return;
    
    const targetPosition = (targetElement as Element).getBoundingClientRect().top + window.scrollY - 80;
    
    gsap.to(window, {
      duration,
      scrollTo: targetPosition,
      ease: 'power3.inOut'
    });
  },
  
  /**
   * Создание эффекта параллакса для элемента
   */
  createParallax: (element: Element | null, yPercent: number = 30) => {
    if (!element) return;
    
    gsap.fromTo(
      element,
      { y: 0 },
      {
        y: yPercent * -1,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    );
  },
  
  /**
   * Анимация стаггер для группы элементов
   */
  staggerAnimation: (elements: NodeListOf<Element> | Element[], properties: any, staggerAmount: number = 0.1) => {
    return gsap.to(elements, {
      ...properties,
      stagger: staggerAmount,
      ease: 'power3.out'
    });
  },
  
  /**
   * Анимация дочерних элементов с появлением по очереди
   */
  revealChildren: (parent: Element | null, selector: string, staggerAmount: number = 0.1) => {
    if (!parent) return;
    
    const children = parent.querySelectorAll(selector);
    
    // Установить начальное состояние
    gsap.set(children, { opacity: 0, y: 30 });
    
    // Анимация появления по очереди
    ScrollTrigger.create({
      trigger: parent,
      start: 'top bottom-=100',
      onEnter: () => {
        gsap.to(children, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: staggerAmount,
          ease: 'power2.out'
        });
      },
      once: true
    });
  },
  
  /**
   * Анимация мерцания/мигания для привлечения внимания
   */
  pulse: (element: Element | null, scale: number = 1.05, duration: number = 1) => {
    if (!element) return;
    
    return gsap.timeline({ repeat: -1 })
      .to(element, { scale, duration: duration / 2, ease: 'sine.inOut' })
      .to(element, { scale: 1, duration: duration / 2, ease: 'sine.inOut' });
  },
  
  /**
   * Анимация предзагрузки для страницы
   */
  pageTransition: (callback?: () => void) => {
    const tl = gsap.timeline();
    
    tl.to('body', { opacity: 0, duration: 0.5, ease: 'power2.inOut' })
      .call(() => {
        if (callback) callback();
      })
      .to('body', { opacity: 1, duration: 0.5, ease: 'power2.inOut' });
    
    return tl;
  }
};
