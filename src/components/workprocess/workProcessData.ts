export interface WorkProcessStep {
  number: number;
  step: string;
  title: string;
  description: string;
  features: string[];
  clientQuote?: {
    text: string;
    client: string;
  };
}




export const workProcess: WorkProcessStep[] = [
  {
    number: 1,
    step: 'workprocess.1.step', // Ключ вместо 'Анализ'
    title: 'workprocess.1.title', // Ключ вместо 'Изучение макета...'
    description: 'workprocess.1.description', // Ключ вместо 'Получаю готовый...'
    features: [
      'workprocess.1.features.feature1', // Ключ вместо 'Обзор макета...'
      'workprocess.1.features.feature2', // Ключ вместо 'Анализ ТЗ'
      'workprocess.1.features.feature3', // Ключ вместо 'Уточнение требований'
      'workprocess.1.features.feature4'  // Ключ вместо 'Оценка сроков...'
    ],
    clientQuote: {
      text: 'workprocess.1.quote.text', // Ключ вместо 'Николай быстро вник...'
      client: 'workprocess.1.quote.client' // Ключ вместо 'Анна, Дизайн-студия...'
    }
  },
  {
    number: 2,
    step: 'workprocess.2.step', // Ключ вместо 'Верстка'
    title: 'workprocess.2.title', // Ключ вместо 'Создание адаптивной...'
    description: 'workprocess.2.description', // Ключ вместо 'Превращаю дизайн...'
    features: [
      'workprocess.2.features.feature1', // Ключ вместо 'HTML5 / CSS3 / SCSS'
      'workprocess.2.features.feature2', // Ключ вместо 'Адаптивная и...'
      'workprocess.2.features.feature3', // Ключ вместо 'JavaScript (ES6+)'
      'workprocess.2.features.feature4'  // Ключ вместо 'Pixel Perfect...'
    ]
    // clientQuote отсутствует
  },
  {
    number: 3,
    step: 'workprocess.3.step', // Ключ вместо 'Интеграция'
    title: 'workprocess.3.title', // Ключ вместо 'Интеграция с CMS...'
    description: 'workprocess.3.description', // Ключ вместо 'Если проект требует...'
    features: [
      'workprocess.3.features.feature1', // Ключ вместо 'Разработка тем WordPress'
      'workprocess.3.features.feature2', // Ключ вместо 'WooCommerce...'
      'workprocess.3.features.feature3', // Ключ вместо 'Advanced Custom Fields (ACF)'
      'workprocess.3.features.feature4'  // Ключ вместо 'Настройка админ-панели'
    ],
    clientQuote: {
      text: 'workprocess.3.quote.text', // Ключ вместо 'Интеграция с WordPress...'
      client: 'workprocess.3.quote.client' // Ключ вместо 'Сергей, Маркетинговое...'
    }
  },
  {
    number: 4,
    step: 'workprocess.4.step', // Ключ вместо 'Тестирование'
    title: 'workprocess.4.title', // Ключ вместо 'Финальное тестирование...'
    description: 'workprocess.4.description', // Ключ вместо 'Тщательно проверяю...'
    features: [
      'workprocess.4.features.feature1', // Ключ вместо 'Тестирование на устройствах'
      'workprocess.4.features.feature2', // Ключ вместо 'Проверка в браузерах'
      'workprocess.4.features.feature3', // Ключ вместо 'Оптимизация скорости...'
      'workprocess.4.features.feature4'  // Ключ вместо 'Отладка кода'
    ]
    // clientQuote отсутствует
  },
  {
    number: 5,
    step: 'workprocess.5.step', // Ключ вместо 'Запуск'
    title: 'workprocess.5.title', // Ключ вместо 'Развертывание сайта...'
    description: 'workprocess.5.description', // Ключ вместо 'Переношу готовый сайт...'
    features: [
      'workprocess.5.features.feature1', // Ключ вместо 'Деплой на хостинг'
      'workprocess.5.features.feature2', // Ключ вместо 'Настройка сервера/домена'
      'workprocess.5.features.feature3', // Ключ вместо 'Передача доступов'
      'workprocess.5.features.feature4'  // Ключ вместо 'Базовая поддержка...'
    ],
    clientQuote: {
      text: 'workprocess.5.quote.text', // Ключ вместо 'Сайт был запущен...'
      client: 'workprocess.5.quote.client' // Ключ вместо 'Елена, Онлайн-школа'
    }
  }
]
