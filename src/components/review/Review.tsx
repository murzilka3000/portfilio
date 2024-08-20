import { useState } from 'react';
import s from './Review.module.scss';
import { review } from './reviewData';
import { useTranslation } from 'react-i18next';

const Review = () => {

  const {t} = useTranslation();

  const [count, setCount] = useState(0);

  const nextReview = () => {
    setCount((prevIndex) => (prevIndex + 1) % review.length);
  };

  const prevReview = () => {
    setCount((prevIndex) => (prevIndex - 1 + review.length) % review.length);
  };

  return (
    <section className={s.review} id='review'>
      <h2>{t('Отзывы')}</h2>
        <div className={s.slide}>
          <div>
            <h3>{t(review[count].title)}</h3>
            <p>{t(review[count].text)}</p>
          </div>
          <a href="https://kwork.ru/user/murzilka300" target="_blank" rel="noopener noreferrer">
            <button>
              <span>{t("Все отзывы")}</span>
              <img src="/Arrow.svg" alt="" />
            </button>
          </a>
        </div>
      <div className={s.controls}>
        <button onClick={prevReview}>
          <img src="/left.svg" alt="" />
        </button>
        <button onClick={nextReview}>
          <img src="/right.svg" alt="" />
        </button>
      </div>
    </section>
  );
};

export default Review;