import { useTranslation } from 'react-i18next';
import s from './Hero.module.scss';

const Hero = () => {

  const { t } = useTranslation();

  return (
    <section className={s.hero} id='about'>
      <p>{t('Динамическая верстка')}</p>
      <h1>
        {t('Преобразование концепций в удобные')} <span>{t('пользовательские интерфейсы')}</span> 
      </h1>
      <span>
        {t('Привет! Меня зовут Николай. Я фронтенд разработчик из Алматы')}
      </span>
      <div>
        <a href="https://t.me/murzilka300" target="_blank" rel="noopener noreferrer">
          <button>
            <span>{t('связаться со мной в телеграм')}</span>
            <img src="/Arrow.svg" alt="" />
          </button>
        </a>
      </div>
    </section>
  )
}

export default Hero