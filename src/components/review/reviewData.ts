import { v1 } from 'uuid';

interface Review {
    text: string,
    id: string,
    title: string
}   

export const review: Review[] = [
    {
        text: 'Спасибо большое! Человек ответственный, сделал все в срок без лишних вопросов. Буду обращаться еще, специалист в своей области',
        id: v1(),
        title: 'Доработка сайта'
    },

    {
        text: 'работа по Вëрстка сайта на WordPress ELEMENTOR - выполненна, быстро, качественно. Исполнителя рекомендуем.',
        id: v1(),
        title: 'Верстка элементор'
    },

    {
        text: 'Я очень довольна выполненным заказом! Сайт на реакт получился просто замечательным.   Работал быстро и качественно, учли все мои пожелания и сделали все в сжатые сроки. Очень приятно было общаться, очень ответственно относится к своей работе.',
        id: v1(),
        title: 'Сайт на react'
    },

    {
        text: 'бращались за версткой футера и шапки сайта - очень благодарен Николаю за профессиональный и качественный подход. Все получилось отлично, то что нужно) с нашей стороны были корректировки, просили добавить некоторые моменты, но и их удалось быстро реализовать. Огромное вам спасибо, будем обращаться к вам еще) удачи!',
        id: v1(),
        title: 'Верстка html'
    },

    {
        text: 'Все супер. Я очень трепетный и внимательный клиент, и при этом все исправления были сделаны на отлично. Николай очень спокойно выдерживал все мои зацепки, придирки и все выполнял. Работой доволен!',
        id: v1(),
        title: 'Верстка'
    },
    
   
]