export type Book = {
  id: string;
  title: string;
  subtitle?: string;
  category: string; // Used for tabs: 'Novel', 'Poetry Collection', 'Stage Play', 'Short Stories'
  year: string;
  pages: string;
  language: string;
  publisher?: string;
  genre: string;
  image: string;
  desc: string;
  shortDesc: string;
  isFeatured?: boolean;
};

export const BOOKS: Book[] = [
  {
    id: 'aaru-velu',
    title: 'Aaru Velu',
    subtitle: 'Six Bows',
    category: 'Novel',
    year: '1978',
    pages: '624',
    language: 'Telugu',
    publisher: 'Visalandhra Publishing House',
    genre: 'Literary Fiction',
    image: '/images/bk1.png',
    isFeatured: true,
    shortDesc: 'A multigenerational epic set in the Godavari delta, following six generations of a farming family through war, partition, and social change.',
    desc: 'A multigenerational epic set in the Godavari delta, following six generations of a farming family through war, partition, and social change.'
  },
  {
    id: 'nadhi-theeram',
    title: 'Nadhi Theeram',
    subtitle: 'Riverbank',
    category: 'Poetry Collection',
    year: '1965',
    pages: '142',
    language: 'Telugu',
    publisher: 'Sahitya Akademi',
    genre: 'Poetry',
    image: '/images/bk2.png',
    isFeatured: true,
    shortDesc: 'A collection of lyrical poems that weave together the landscapes of coastal Andhra with the inner landscapes of memory, loss, and longing.',
    desc: 'A collection of lyrical poems that weave together the landscapes of coastal Andhra with the inner landscapes of memory, loss, and longing.'
  },
  {
    id: 'raktakshi',
    title: 'Raktakshi',
    subtitle: 'The Red-Eyed',
    category: 'Stage Play',
    year: '1972',
    pages: '128',
    language: 'Telugu',
    publisher: 'National Book Trust',
    genre: 'Drama',
    image: '/images/bk1.png',
    isFeatured: true,
    shortDesc: 'A searing drama about the lives of salt-pan workers on the Gujarat coast. First performed at the National School of Drama.',
    desc: 'A searing drama about the lives of salt-pan workers on the Gujarat coast. First performed at the National School of Drama.'
  },
  {
    id: 'sapta-sagaralu',
    title: 'Sapta Sagaralu',
    subtitle: 'Seven Oceans',
    category: 'Poetry Collection',
    year: '2010',
    pages: '112',
    language: 'Telugu',
    publisher: 'Sahitya Akademi',
    genre: 'Poetry',
    image: '/images/bk2.png',
    isFeatured: true,
    shortDesc: 'The final major work, a profound meditation on time, mortality, and the endurance of art. Written in the classical Telugu meter.',
    desc: 'The final major work, a profound meditation on time, mortality, and the endurance of art. Written in the classical Telugu meter.'
  },
  {
    id: 'varanasi-ghat',
    title: 'Varanasi Ghat',
    subtitle: 'The Ghats of Varanasi',
    category: 'Novel',
    year: '1982',
    pages: '384',
    language: 'Telugu',
    publisher: 'Navodaya Publishers',
    genre: 'Historical Fiction',
    image: '/images/bk1.png',
    isFeatured: false,
    shortDesc: 'A historical novel set during the Indian independence movement, following a young Telugu poet who travels to Varanasi seeking spiritual awakening.',
    desc: 'A historical novel set during the Indian independence movement, following a young Telugu poet who travels to Varanasi seeking spiritual awakening.'
  },
  {
    id: 'prabhata-ragalu',
    title: 'Prabhata Ragalu',
    subtitle: 'Morning Melodies',
    category: 'Poetry Collection',
    year: '1956',
    pages: '88',
    language: 'Telugu',
    publisher: 'Andhra Pradesh Sahitya Akademi',
    genre: 'Poetry',
    image: '/images/bk2.png',
    isFeatured: false,
    shortDesc: 'His debut poetry collection, filled with youthful exuberance and a profound connection to the rural landscapes of his childhood.',
    desc: 'His debut poetry collection, filled with youthful exuberance and a profound connection to the rural landscapes of his childhood.'
  },
  {
    id: 'grama-kathalu',
    title: 'Grama Kathalu',
    subtitle: 'Village Stories',
    category: 'Short Stories',
    year: '1968',
    pages: '210',
    language: 'Telugu',
    publisher: 'Visalandhra Publishing House',
    genre: 'Fiction',
    image: '/images/bk1.png',
    isFeatured: false,
    shortDesc: 'A brilliant collection of short fiction capturing the nuances, humor, and tragedies of rural life in mid-century Andhra Pradesh.',
    desc: 'A brilliant collection of short fiction capturing the nuances, humor, and tragedies of rural life in mid-century Andhra Pradesh.'
  },
  {
    id: 'mouna-ragam',
    title: 'Mouna Ragam',
    subtitle: 'The Silent Melody',
    category: 'Novel',
    year: '1995',
    pages: '312',
    language: 'Telugu',
    publisher: 'Navodaya Publishers',
    genre: 'Literary Fiction',
    image: '/images/bk2.png',
    isFeatured: false,
    shortDesc: 'An introspective novel exploring the complex relationship between a fading classical musician and his rebellious daughter in modern Hyderabad.',
    desc: 'An introspective novel exploring the complex relationship between a fading classical musician and his rebellious daughter in modern Hyderabad.'
  }
];

export function getBookById(id: string | null | undefined): Book {
  return BOOKS.find((book) => book.id === id) ?? BOOKS[0];
}
