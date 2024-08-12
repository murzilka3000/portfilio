import { work } from './dataWork'
import s from './Work.module.scss'

const Work = () => {
  return (
    <section>
    <h2 className={s.title}>Мои работы</h2>
       <div className={s.work}>
        {
            work.map(t => {
                return(
                    <div className={s.card}>
                        <div className={s.imgContainer}>
                            <img src={t.img} alt="" />
                        </div>
                        <div className={s.bottomContainer}>
                            <h3>{t.title}</h3>
                            <p>{t.desc}</p>
                            <div className={s.block}>
                                <div className={s.imgBlock}>
                                    <img src={t.icon_1} alt="" />
                                    <img src={t.icon_2} alt="" />
                                    <img src={t.icon_3} alt="" />
                                </div>
                                <div className={s.linkBlock}>
                                    <a href={t.Link}>
                                        <span>Check Live Site</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
            }
       </div>
    </section>
  )
}

export default Work