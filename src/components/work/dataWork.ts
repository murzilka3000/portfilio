

export interface workType {
    img: string,
    title: string,
    desc: string,
    Link: string
}

export const work: workType[]  = [
    {
        img: '/бар.svg',
        title: 'Бар в центре казани',
        desc: 'Современный бар в центре Казани с уютной атмосферой и авторскими коктейлями.',
        Link: 'https://jiguli-kzn.ru/'
    },
    {
        img: '/казик.svg',
        title: 'Игры',
        desc: 'Разработка надежного и масштабируемого софта для игрового бизнеса с учетом всех требований индустрии.',
        Link: 'https://biggame.solutions/'
    },
    {
        img: '/манки.svg',
        title: 'Игра',
        desc: 'Яркая и захватывающая игра ‘Crazy Monkeys’ с увлекательным геймплеем и бонусными уровнями.',
        Link: 'https://crazzymonkeys.com/'
    },
    {
        img: '/нотариус.svg',
        title: 'Нотариус',
        desc: 'Опытный нотариус, предоставляющий широкий спектр услуг с гарантией юридической точности.',
        Link: 'https://xn----7sbbajqav7bgehkjdnnv2f.xn--p1ai/'
    }, 
    {
        img: '/meb.svg',
        title: 'АминаМебель',
        desc: 'Магазин мебели и оборудования с уникальными узорами и вниманием к деталям.',
        Link: 'https://aminamebel.ru/'
    }, 
]