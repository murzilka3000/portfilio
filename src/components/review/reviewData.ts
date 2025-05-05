import { v1 } from 'uuid';

interface Review {
    text: string,
    id: string,
    title: string,
    rating?: number,
    avatar?: string,
    client?: string,
    date?: string
}   

export const review: Review[] = [
    {
        text: 'reviews.alexanderK.text', // Ключ
        id: v1(),
        title: 'reviews.alexanderK.title', // Ключ
        rating: 5,
        client: 'reviews.alexanderK.client', // Ключ
        date: '15.03.2025'
    },
    {
        text: 'reviews.olgaM.text', // Ключ
        id: v1(),
        title: 'reviews.olgaM.title', // Ключ
        rating: 4,
        client: 'reviews.olgaM.client', // Ключ
        date: '23.02.2025'
    },
    {
        text: 'reviews.marinaV.text', // Ключ
        id: v1(),
        title: 'reviews.marinaV.title', // Ключ
        rating: 5,
        client: 'reviews.marinaV.client', // Ключ
        date: '10.01.2025'
    },
    {
        text: 'reviews.dmitryP.text', // Ключ
        id: v1(),
        title: 'reviews.dmitryP.title', // Ключ
        rating: 5,
        client: 'reviews.dmitryP.client', // Ключ
        date: '05.12.2024'
    },
    {
        text: 'reviews.igorS.text', // Ключ
        id: v1(),
        title: 'reviews.igorS.title', // Ключ
        rating: 4,
        client: 'reviews.igorS.client', // Ключ
        date: '18.11.2024'
    },
    {
        text: 'reviews.artemN.text', // Ключ
        id: v1(),
        title: 'reviews.artemN.title', // Ключ
        rating: 5,
        client: 'reviews.artemN.client', // Ключ
        date: '02.10.2024'
    },
    {
        text: 'reviews.sergeyL.text', // Ключ
        id: v1(),
        title: 'reviews.sergeyL.title', // Ключ
        rating: 5,
        client: 'reviews.sergeyL.client', // Ключ
        date: '09.04.2025'
    },
    {
        text: 'reviews.alinaB.text', // Ключ
        id: v1(),
        title: 'reviews.alinaB.title', // Ключ
        rating: 4,
        client: 'reviews.alinaB.client', // Ключ
        date: '27.03.2025'
    },
    {
        text: 'reviews.victorG.text', // Ключ
        id: v1(),
        title: 'reviews.victorG.title', // Ключ
        rating: 5,
        client: 'reviews.victorG.client', // Ключ
        date: '12.03.2025'
    },
    {
        text: 'reviews.ekaterinaR.text', // Ключ
        id: v1(),
        title: 'reviews.ekaterinaR.title', // Ключ
        rating: 5,
        client: 'reviews.ekaterinaR.client', // Ключ
        date: '03.03.2025'
    },
    {
        text: 'reviews.romanD.text', // Ключ
        id: v1(),
        title: 'reviews.romanD.title', // Ключ
        rating: 5,
        client: 'reviews.romanD.client', // Ключ
        date: '24.02.2025'
    },
    {
        text: 'reviews.tatianaS.text', // Ключ
        id: v1(),
        title: 'reviews.tatianaS.title', // Ключ
        rating: 4,
        client: 'reviews.tatianaS.client', // Ключ
        date: '14.02.2025'
    },
];
