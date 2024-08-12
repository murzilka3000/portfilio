import s from './Hero.module.scss';

const Hero = () => {
  return (
    <section className={s.hero} id='about'>
      <p>Динамическая верстка</p>
      <h1>
        Преобразование концепций в удобные <span>пользовательские интерфейсы</span> 
      </h1>
      <span>
        Привет! Меня зовут Николай. Я фронтенд разработчик из Алматы
      </span>
      <div>
        <a href="https://t.me/murzilka300" target="_blank" rel="noopener noreferrer">
          <button>
            <span>связаться со мной в телеграм</span>
            <img src="/Arrow.svg" alt="" />
          </button>
        </a>
      </div>
    </section>
  )
}

export default Hero