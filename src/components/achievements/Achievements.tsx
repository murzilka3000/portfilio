import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import s from './Achievements.module.scss';
import { metrics, timelineItems, chartData } from './achievementsData';

const Achievements = () => {
  const { t } = useTranslation();
  const metricsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const chartsRef = useRef<HTMLDivElement>(null);
  
  // Эффект для анимации метрик при прокрутке
  useEffect(() => {
    
    
    // Анимация метрик с помощью счетчика
    const animateMetrics = () => {
      const metricItems = document.querySelectorAll(`.${s.metricCard}`);
      const metricNumbers = document.querySelectorAll(`.${s.metricNumber}`);
      
      metricItems.forEach((item, index) => {
        const numberEl = metricNumbers[index] as HTMLElement;
        const targetNumber = metrics[index].number;
        let currentNumber = 0;
        const plusSign = metrics[index].plus ? '+' : '';
        
        // Анимация появления карточки
        setTimeout(() => {
          (item as HTMLElement).style.opacity = '1';
          (item as HTMLElement).style.transform = 'translateY(0)';
          
          // Анимация счетчика
          const interval = setInterval(() => {
            const increment = Math.ceil(targetNumber / 40); // Скорость анимации
            currentNumber += increment;
            
            if (currentNumber >= targetNumber) {
              currentNumber = targetNumber;
              clearInterval(interval);
            }
            
            if (numberEl) {
              // Обновляем значение счетчика
              if (plusSign) {
                numberEl.innerHTML = `${currentNumber}<span class="${s.plus}">${plusSign}</span>`;
              } else {
                numberEl.textContent = `${currentNumber}`;
              }
            }
          }, 30);
        }, index * 150);
      });
    };
    
    // Наблюдатель для временной шкалы
    const observeTimeline = () => {
      const timelineItems = document.querySelectorAll(`.${s.timelineItem}`);
      
      const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(s.visible);
            timelineObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
      });
      
      timelineItems.forEach(item => {
        timelineObserver.observe(item);
      });
    };
    
    // Наблюдатель для круговых диаграмм
    const observeCharts = () => {
      const chartItems = document.querySelectorAll(`.${s.piechartItem}`);
      
      const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(s.visible);
            chartObserver.unobserve(entry.target);
            
            // Инициализируем круговую диаграмму, когда она становится видимой
            setTimeout(() => {
              const canvasEl = entry.target.querySelector('canvas');
              if (canvasEl) {
                initPieChart(canvasEl);
              }
            }, 300);
          }
        });
      }, {
        threshold: 0.2
      });
      
      chartItems.forEach((item) => {
        chartObserver.observe(item);
      });
    };
    
    // Инициализация круговой диаграммы
    const initPieChart = (canvas: HTMLCanvasElement) => {
      const id = canvas.id.replace('chart-', '');
      const chart = chartData.find(c => c.id === id);
      
      if (!chart || !canvas.getContext) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const canvasSize = canvas.width;
      const radius = canvasSize / 2 * 0.8;
      const centerX = canvasSize / 2;
      const centerY = canvasSize / 2;
      
      let startAngle = -Math.PI / 2; // Начинаем с верхней точки
      const total = chart.data.reduce((sum, item) => sum + item.value, 0);
      
      // Создаем обводку под круговую диаграмму
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius + 5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.fill();
      
      // Рисуем секции диаграммы
      chart.data.forEach(item => {
        const sliceAngle = (item.value / total) * (Math.PI * 2);
        const endAngle = startAngle + sliceAngle;
        
        // Рисуем сектор
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.fillStyle = item.color;
        ctx.fill();
        
        // Добавляем тень для объема
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        startAngle = endAngle;
      });
      
      // Создаем центральное отверстие для пончиковой диаграммы
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(15, 20, 45, 0.8)';
      ctx.fill();
      
      // Добавляем контент в центр
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 16px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('100%', centerX, centerY);
    };
    
    // Наблюдаем за секцией метрик для запуска анимации
    const metricsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateMetrics();
        metricsObserver.unobserve(entries[0].target);
      }
    }, { threshold: 0.2 });
    
    if (metricsRef.current) {
      metricsObserver.observe(metricsRef.current);
    }
    
    // Инициализируем временную шкалу и диаграммы
    observeTimeline();
    observeCharts();
    
    // Очистка при размонтировании
    return () => {
      if (metricsRef.current) {
        metricsObserver.unobserve(metricsRef.current);
      }
    };
  }, []);
  
  // Иконки для метрик
  const renderMetricIcon = (icon: string) => {
    switch (icon) {
      case 'projects':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 3h18v18H3V3zm16 16V5H5v14h14zM11 7h2v2h-2V7zm0 4h2v2h-2v-2zm-4-4h2v2H7V7zm0 4h2v2H7v-2zm8 0h2v2h-2v-2zm0 4h2v2h-2v-2zm-4 0h2v2h-2v-2zm-4 0h2v2H7v-2z"/>
          </svg>
        );
      case 'clients':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
          </svg>
        );
      case 'experience':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
          </svg>
        );
      case 'reviews':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z"/>
          </svg>
        );
      default:
        return null;
    }
  };
  
  return (
    <section id="achievements" className={s.achievementsSection}>
      <h2 className={s.title}>{t('Достижения и метрики')}</h2>
      
      {/* Секция с ключевыми метриками */}
      <div className={s.metricsContainer} ref={metricsRef}>
        {metrics.map((metric) => (
          <div key={metric.id} className={s.metricCard}>
            <div className={s.metricIcon}>
              {renderMetricIcon(metric.icon)}
            </div>
            <div className={s.metricNumber}>
              {metric.plus ? `0<span class="${s.plus}">+</span>` : '0'}
            </div>
            <div className={s.metricLabel}>{t(metric.label)}</div>
          </div>
        ))}
      </div>
      
      {/* Секция с временной шкалой */}
      <div className={s.timelineSection}>
        <h3 className={s.timelineHeader}>{t('Ключевые этапы')}</h3>
        
        <div className={s.timelineContainer} ref={timelineRef}>
          {timelineItems.map((item) => (
            <div key={item.id} className={s.timelineItem}>
              <div className={s.timelineDot}></div>
              <div className={s.timelineContent}>
                <div className={s.timelineDate}>{item.date}</div>
                <h4 className={s.timelineTitle}>{t(item.title)}</h4>
                <p className={s.timelineDescription}>{t(item.description)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Секция с диаграммами */}
      <div className={s.piechartContainer} ref={chartsRef}>
        <div className={s.piechartGrid}>
          {chartData.map((chart) => (
            <div key={chart.id} className={s.piechartItem}>
              <h3 className={s.piechartTitle}>{t(chart.title)}</h3>
              <div className={s.chartWrapper}>
                <canvas id={`chart-${chart.id}`} width="200" height="200"></canvas>
              </div>
              <div className={s.legendList}>
                {chart.data.map((item, idx) => (
                  <div key={idx} className={s.legendItem}>
                    <span 
                      className={s.legendColor} 
                      style={{ backgroundColor: item.color }}
                    ></span>
                    <span>{t(item.label)} ({item.value}%)</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
