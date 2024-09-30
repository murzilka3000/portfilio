import { work } from './dataWork';
import s from './Work.module.scss';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Work = () => {
    const { t } = useTranslation();

    return (
        <section id='work'>
            <h2 className={s.title}>{t('Мои работы')}</h2>
            <div className={s.work}>
                {work.map(item => (
                    <motion.div 
                        className={s.card}
                        whileHover={{ 
                            scale: 1.05, 
                        }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        key={item.img}
                    >
                        <div className={s.imgContainer}>
                            <img src={item.img} alt="" />
                        </div>
                        <div className={s.bottomContainer}>
                            <h3>{t(item.title)}</h3>
                            <p>{t(item.desc)}</p>
                            <div className={s.block}>
                                <div className={s.linkBlock}>
                                    <a href={item.Link} target='_' rel='noopener'>
                                        <span>{t('Перейти на сайт')}</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Work;