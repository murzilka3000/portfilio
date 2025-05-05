import { useTranslation } from 'react-i18next'
import s from './Footer.module.scss'
import {motion} from 'framer-motion'

const Footer = () => {

  const {t} = useTranslation()

  const links = [
    {id: 'telegram', link: 'https://t.me/murzilka300', img: '/tg.svg', alt: 'Telegram'},
    {id: 'instagram', link: 'https://www.instagram.com/nikolay85_?igsh=bndvMWJneG40OGc=', img: '/insta.svg', alt: 'Instagram'},
    {id: 'github', link: 'https://github.com/murzilka3000', img: '/git.svg', alt: 'GitHub'},
    // {id: 'linkedin', link: 'https://www.linkedin.com/in/%D0%BD%D0%B8%D0%BA%D0%BE%D0%BB%D0%B0%D0%B9-%D0%B6%D0%B8%D0%B4%D0%BA%D0%BE%D0%B2-825214293?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app', img: '/link.svg', alt: 'LinkedIn'},
  ]

  return (
    <footer className={s.footer} id='contact'>
      <div>
        <p>{t('Copyright 2025 Николай Жидков')}</p>
      </div>
      <div>
        {
          links.map(item => {
            return (
              <a href={item.link} target="_blank" rel="noopener noreferrer" key={item.id}>
                <motion.div
                  whileHover={{scale: 1.1}}
                  whileTap={{scale: 0.9}}
                  transition={{type: 'spring', stiffness: 300}}
                >
                  <img src={item.img} alt={item.alt} />
                </motion.div>
              </a>
            )
          })
        }
      </div>
    </footer>
  )
}

export default Footer