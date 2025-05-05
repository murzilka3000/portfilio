export interface workType {
    img: string,
    title: string,
    desc: string,
    Link: string,
    tags?: string[] 
}

export const work: workType[] = [
    {
      img: '/казик.svg',
      title: 'portfolio.igaming.title', // Ключ вместо текста
      desc: 'portfolio.igaming.description', // Ключ вместо текста
      Link: 'https://biggame.solutions/',
      tags: ['React', 'TypeScript', 'Игровая индустрия', 'UI/UX']
    },
    {
      img: '/shop.png',
      title: 'portfolio.yakubowitch.title', // Ключ вместо текста
      desc: 'portfolio.yakubowitch.description', // Ключ вместо текста
      Link: 'https://yakubowitch.com/',
      tags: ['eCommerce', 'Front-end', 'React', 'Адаптивный дизайн']
    },
    {
      img: '/meat.png',
      title: 'portfolio.slovoMyasnika.title', // Ключ вместо текста
      desc: 'portfolio.slovoMyasnika.description', // Ключ вместо текста
      Link: 'https://slovo-myasnika.ru/',
      tags: ['Каталог', 'Брендинг', 'JavaScript', 'UI/UX']
    },
    {
      img: '/onl.png',
      title: 'portfolio.onlineSlot.title', // Ключ вместо текста
      desc: 'portfolio.onlineSlot.description', // Ключ вместо текста
      Link: 'https://onlineslottop.com/',
      tags: ['Каталог', 'Брендинг', 'JavaScript', 'UI/UX']
    },
    {
      img: '/werd.png',
      title: 'portfolio.werdsworld.title', // Ключ вместо текста
      desc: 'portfolio.werdsworld.description', // Ключ вместо текста
      Link: 'https://werdok.com/', // Убедитесь, что ссылка верна (было werdsworld.com)
      tags: ['Каталог', 'Брендинг', 'JavaScript', 'UI/UX']
    },
    {
      img: '/martal.png',
      title: 'portfolio.martal.title', // Ключ вместо текста
      desc: 'portfolio.martal.description', // Ключ вместо текста
      Link: 'https://martalcapital.com/',
      tags: ['Каталог', 'Брендинг', 'JavaScript', 'UI/UX']
    },
    {
      img: '/auto.png',
      title: 'portfolio.horgos.title', // Ключ вместо текста
      desc: 'portfolio.horgos.description', // Ключ вместо текста
      Link: 'https://horgos-autoexport.com/',
      tags: ['Каталог', 'Брендинг', 'JavaScript', 'UI/UX']
    },
    {
      img: '/bar.png',
      title: 'portfolio.jiguli.title', // Ключ вместо текста
      desc: 'portfolio.jiguli.description', // Ключ вместо текста
      Link: 'https://jiguli-kzn.ru/',
      tags: ['Каталог', 'Брендинг', 'JavaScript', 'UI/UX']
    },
    {
      img: '/kitchen.png',
      title: 'portfolio.kitchen.title', // Ключ вместо текста
      desc: 'portfolio.kitchen.description', // Ключ вместо текста
      Link: 'https://jiguli-kzn.ru/', // Ссылка совпадает с предыдущим, проверьте
      tags: ['Каталог', 'Брендинг', 'JavaScript', 'UI/UX']
    },
    {
      img: '/vart.png',
      title: 'portfolio.vartocid.title', // Ключ вместо текста
      desc: 'portfolio.vartocid.description', // Ключ вместо текста
      Link: 'https://vartocid.ru/',
      tags: ['Каталог', 'Брендинг', 'JavaScript', 'UI/UX']
    },
    {
      img: '/azt.png',
      title: 'portfolio.aztsk.title', // Ключ вместо текста
      desc: 'portfolio.aztsk.description', // Ключ вместо текста
      Link: 'https://aztsk.ru/',
      tags: ['Каталог', 'Брендинг', 'JavaScript', 'UI/UX']
    },
  ];