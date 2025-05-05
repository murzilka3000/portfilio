import Hero from "../../components/hero/Hero"
import Review from "../../components/review/Review"
import Work from "../../components/work/Work"
import Skills from "../../components/skills/Skills"
import Contact from "../../components/contact/Contact"
import WorkProcess from "../../components/workprocess/WorkProcess"
import Achievements from "../../components/achievements/Achievements"
import { Helmet } from "react-helmet-async"
import i18n from "../../i18n"
import { t } from "i18next"

const Home = () => {
  return (
    <div>
      <Helmet>
        <html lang={i18n.language} />
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <Hero/>
      <Skills/>
      <WorkProcess/>
      <Work/>
      <Achievements/>
      <Review/>
      <Contact/>
    </div>
  )
}

export default Home