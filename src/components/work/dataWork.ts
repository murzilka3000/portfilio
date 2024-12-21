

export interface workType {
    img: string,
    title: string,
    desc: string,
    Link: string
}

export const work: workType[]  = [
    {
        img: '/казик.svg',
        title: 'Игры',
        desc: 'Разработка надежного и масштабируемого софта для игрового бизнеса с учетом всех требований индустрии.',
        Link: 'https://biggame.solutions/'
    },
    {
        img: '/shop.png',
        title: 'Интернет магазин',
        desc: 'Разработка интернет магазина с учетом всех требований индустрии.',
        Link: 'https://yakubowitch.com/'
    },
    {
        img: '/meat.png',
        title: 'Производитель мясной продукции',
        desc: 'Разработка сайта каталога мясной продукции с учетом всех требований индустрии.',
        Link: 'https://slovo-myasnika.ru/'
    },
]