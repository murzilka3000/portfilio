export interface MetricItem {
  id: string;
  number: number;
  plus?: boolean;
  label: string;
  icon: string;
}

export interface TimelineItem {
  id: string;
  date: string;
  title: string;
  description: string;
}

export interface ChartData {
  id: string;
  title: string;
  data: {
    label: string;
    value: number;
    color: string;
  }[];
}

export const metrics: MetricItem[] = [
  {
    id: 'projects',
    number: 50,
    plus: true,
    label: 'metrics.projects.label',
    icon: 'projects'
  },
  {
    id: 'clients',
    number: 20,
    plus: true,
    label: 'metrics.clients.label',
    icon: 'clients'
  },
  {
    id: 'experience',
    number: 3,
    label: 'metrics.experience.label',
    icon: 'experience'
  },
  {
    id: 'reviews',
    number: 35,
    plus: true,
    label: 'metrics.reviews.label',
    icon: 'reviews'
  }
];


export const timelineItems: TimelineItem[] = [
  {
    id: 'timeline-1',
    date: '2025',
    title: 'timeline.2025.title', // Ключ вместо текста
    description: 'timeline.2025.description' // Ключ вместо текста
  },
  {
    id: 'timeline-2',
    date: '2024',
    title: 'timeline.2024.title', // Ключ вместо текста
    description: 'timeline.2024.description' // Ключ вместо текста
  },
  {
    id: 'timeline-3',
    date: '2023',
    title: 'timeline.2023.title', // Ключ вместо текста
    description: 'timeline.2023.description' // Ключ вместо текста
  }
];

export const chartData: ChartData[] = [
  {
    id: 'technologies',
    title: 'charts.technologies.title',
    data: [
      { label: 'charts.technologies.data.reactNext', value: 40, color: '#61DAFB' },
      { label: 'charts.technologies.data.wordpress', value: 35, color: '#21759B' },
      { label: 'charts.technologies.data.markup', value: 25, color: '#E44D26' }
    ]
  },
  {
    id: 'projects',
    title: 'charts.projects.title',
    data: [
      { label: 'charts.projects.data.webApps', value: 35, color: '#7B5AFF' },
      { label: 'charts.projects.data.corporate', value: 30, color: '#FF7A5A' },
      { label: 'charts.projects.data.ecommerce', value: 20, color: '#4FD1D9' },
      { label: 'charts.projects.data.landings', value: 15, color: '#B62EFE' }
    ]
  }
];
