import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import s from './Contact.module.scss';
import emailjs from '@emailjs/browser';

// Интерфейс для данных формы
interface FormData {
  name: string;
  email: string;
  message: string;
}

// Интерфейс для ошибок формы
interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const Contact = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Состояния формы
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [showSocialTooltip, setShowSocialTooltip] = useState(false);

  // Обработка изменений в полях формы
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Убираем ошибку при вводе
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Валидация формы
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = t('Введите ваше имя');
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t('Введите ваш email');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('Введите корректный email');
    }
    
    if (!formData.message.trim()) {
      newErrors.message = t('Введите сообщение');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Отправка формы с использованием EmailJS
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setFormStatus('sending');
    
    // Конфигурация EmailJS - замените на свои реальные ID
    const serviceID = 'service_2h63pym'; // ID сервиса EmailJS
    const templateID = 'template_6paxsar'; // ID шаблона EmailJS
    const userID = 'TCVnHkjvxRpuQLkvY'; // ID пользователя EmailJS
    
    // Подготавливаем параметры для отправки
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_name: 'Николай', 
      reply_to: formData.email
    };
    
    // Отправляем сообщение через EmailJS
    emailjs.send(serviceID, templateID, templateParams, userID)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setFormStatus('success');
        
        // Очистка формы после успешной отправки
        setTimeout(() => {
          setFormData({ name: '', email: '', message: '' });
          setFormStatus('idle');
        }, 3000);
      })
      .catch((err) => {
        console.error('FAILED...', err);
        setFormStatus('error');
        
        // Возвращаем в исходное состояние через некоторое время
        setTimeout(() => {
          setFormStatus('idle');
        }, 3000);
      });
  };

  // Копирование email в буфер обмена
  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText('nikolayzhidkov@icloud.com');
    setShowSocialTooltip(true);
    
    setTimeout(() => {
      setShowSocialTooltip(false);
    }, 2000);
  };

  // Наблюдение за видимостью секции для анимации
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Инициализация EmailJS
  useEffect(() => {
    // Инициализация EmailJS при загрузке компонента
    emailjs.init("TCVnHkjvxRpuQLkvY"); // Замените на свой User ID из EmailJS
  }, []);

  return (
    <section ref={sectionRef} className={`${s.contact} ${isVisible ? s.visible : ''}`} id="contact">
      <div className={s.container}>
        <div className={s.contactInfo}>
          <h2>{t('Связаться со мной')}</h2>
          <p className={s.subtitle}>
            {t('Готов обсудить ваш проект и ответить на любые вопросы')}
          </p>
          
          <div className={s.contactMethods}>
            <div className={s.contactMethod}>
              <div className={s.icon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div className={s.details}>
                <h3>{t('Email')}</h3>
                <div className={s.value} onClick={copyEmailToClipboard}>
                  <span>nikolayzhidkov@icloud.com</span>
                  <div className={`${s.tooltip} ${showSocialTooltip ? s.show : ''}`}>
                    {t('Скопировано!')}
                  </div>
                </div>
              </div>
            </div>
            
            <div className={s.contactMethod}>
              <div className={s.icon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
              </div>
              <div className={s.details}>
                <h3>{t('Telegram')}</h3>
                <a href="https://t.me/murzilka300" target="_blank" rel="noopener noreferrer" className={s.value}>
                  @murzilka300
                </a>
              </div>
            </div>
            
            <div className={s.contactMethod}>
              <div className={s.icon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div className={s.details}>
                <h3>{t('Локация')}</h3>
                <span className={s.value}>{t('Вьетнам, Хошимин')}</span>
              </div>
            </div>
          </div>
          
          <div className={s.socialLinks}>
            <a href="https://github.com/murzilka300" target="_blank" rel="noopener noreferrer" className={s.socialLink}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" fill="currentColor"/></svg>
            </a>
            {/* <a href="https://www.linkedin.com/in/%D0%BD%D0%B8%D0%BA%D0%BE%D0%BB%D0%B0%D0%B9-%D0%B6%D0%B8%D0%B4%D0%BA%D0%BE%D0%B2-825214293" target="_blank" rel="noopener noreferrer" className={s.socialLink}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" fill="currentColor"/></svg>
            </a> */}
            <a href="https://kwork.ru/user/murzilka300" target="_blank" rel="noopener noreferrer" className={s.socialLink}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 10.3c0 5.6-3.8 10.3-9.6 10.3-1 0-2.2-.5-2.9-.9-.2 1 .4 2.2.4 2.2-1.4-.3-3.4-2.1-4.2-3.6-1.9-2.9-6.4-2.9-6.4-8.1 0-3.5 3.7-6.7 7.6-6.7 2 0 3.4.3 3.4.3 2.1.3 3.5 1.5 3.5 1.5 3.9 2.9 5.6 3.4 8.2 5zm-9.6 7.4c.3.6.3 1.7 0 2.1-1 1.4-3 0-3-1.5 0-.9.5-1.7 1.4-2.1.9-.4 1.8-.5 2.6 0-.7-1.6-2.9-3.5-4.9-3.5-3.1 0-5.3 2.4-5.3 5.3 0 2.9 2.2 5.3 5.3 5.3 2.9 0 5.3-2.4 5.3-5.3 0-.7-.3-1.4-.5-1.9-1.1.5-1.5 1-3.9 1.6z" fill="currentColor"/></svg>
            </a>
          </div>
        </div>
        
        <div className={s.contactForm}>
          <div className={s.formContainer}>
            <h3>{t('Отправить сообщение')}</h3>
            
            <form onSubmit={handleSubmit}>
              <div className={s.formGroup}>
                <label htmlFor="name">{t('Имя')}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={errors.name ? s.hasError : ''}
                  disabled={formStatus === 'sending' || formStatus === 'success'}
                />
                {errors.name && <span className={s.errorMessage}>{errors.name}</span>}
              </div>
              
              <div className={s.formGroup}>
                <label htmlFor="email">{t('Email')}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? s.hasError : ''}
                  disabled={formStatus === 'sending' || formStatus === 'success'}
                />
                {errors.email && <span className={s.errorMessage}>{errors.email}</span>}
              </div>
              
              <div className={s.formGroup}>
                <label htmlFor="message">{t('Сообщение')}</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className={errors.message ? s.hasError : ''}
                  disabled={formStatus === 'sending' || formStatus === 'success'}
                ></textarea>
                {errors.message && <span className={s.errorMessage}>{errors.message}</span>}
              </div>
              
              <button 
                type="submit" 
                className={`${s.submitButton} ${formStatus === 'sending' ? s.sending : ''} ${formStatus === 'success' ? s.success : ''} ${formStatus === 'error' ? s.error : ''}`}
                disabled={formStatus === 'sending' || formStatus === 'success'}
              >
                {formStatus === 'idle' && t('Отправить')}
                {formStatus === 'sending' && (
                  <>
                    <span className={s.loadingDots}>
                      <span>.</span><span>.</span><span>.</span>
                    </span>
                  </>
                )}
                {formStatus === 'success' && (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    {t('Отправлено')}
                  </>
                )}
                {formStatus === 'error' && (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="15" y1="9" x2="9" y2="15"></line>
                      <line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>
                    {t('Ошибка! Попробуйте снова')}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
