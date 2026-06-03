export type Book = {
  id: string;
  title: string;
  category: string;
  year: string;
  pages: string;
  language: string;
  genre: string;
  image: string;
  desc: string;
  shortDesc: string;
  imageContainerClass?: string;
};

export const BOOKS: Book[] = [
  {
    id: 'echoes-of-silence',
    title: 'Echoes of Silence',
    category: 'Contemporary Fiction',
    year: '2018',
    pages: '432',
    language: 'English',
    genre: 'Contemporary Fiction',
    image: '/images/bk1.png',
    shortDesc:
      "A profound exploration of human resilience and the power of unspoken emotions. This award-winning novel follows the journey of a mute artist who finds his voice...",
    desc: 'A profound exploration of human resilience and the power of unspoken emotions. This award-winning novel follows the journey of a mute artist who finds his voice in colors.',
  },
  {
    id: 'shadows-of-tomorrow',
    title: 'Shadows of Tomorrow',
    category: 'Literary Fiction',
    year: '2020',
    pages: '512',
    language: 'English',
    genre: 'Literary Fiction',
    image: '/images/bk2.png',
    imageContainerClass: 'work-card__image-container--show-name',
    shortDesc:
      'A gripping narrative that weaves together past and future, exploring themes of identity, memory, and the choices that define us. Shortlisted for the International...',
    desc: 'A gripping narrative that weaves together past and future, exploring themes of identity, memory, and the choices that define us.',
  },
  {
    id: 'whispers-of-the-soul',
    title: 'Whispers of the Soul',
    category: 'Poetry Collection',
    year: '2017',
    pages: '224',
    language: 'English',
    genre: 'Poetry Collection',
    image:
      'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=900',
    shortDesc:
      'An exquisite collection of 100 poems that delve into love, loss, hope, and the eternal human quest for meaning. Winner of the World Poetry Prize.',
    desc: 'An exquisite collection of poems that delve into love, loss, hope, and the eternal human quest for meaning.',
  },
  {
    id: 'the-rivers-memory',
    title: "The River's Memory",
    category: 'Historical Fiction',
    year: '2015',
    pages: '624',
    language: 'English',
    genre: 'Historical Fiction',
    image:
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=900',
    shortDesc:
      'Set against the backdrop of pre-independence India, this epic tale chronicles three generations of a family and their unbreakable bond with the sacred river that shape...',
    desc: 'Set against pre-independence India, this epic tale follows three generations and their unbreakable bond with the sacred river that shapes their destiny.',
  },
  {
    id: 'monsoon-dreams',
    title: 'Monsoon Dreams',
    category: 'Short Stories',
    year: '2019',
    pages: '288',
    language: 'English',
    genre: 'Short Stories',
    image:
      'https://images.unsplash.com/photo-1456615074700-1dc12aa7364d?auto=format&fit=crop&q=80&w=900',
    shortDesc:
      'A mesmerizing collection of 15 short stories that capture the essence of Indian life, from bustling cities to serene villages, each tale a gem of literary craftsmanship.',
    desc: 'A mesmerizing collection of stories capturing Indian life from bustling cities to serene villages.',
  },
  {
    id: 'letters-to-my-daughter',
    title: 'Letters to My Daughter',
    category: 'Essays & Memoir',
    year: '2022',
    pages: '256',
    language: 'English',
    genre: 'Essays & Memoir',
    image:
      'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=900',
    shortDesc:
      'An intimate collection of essays and letters exploring fatherhood, wisdom, and life lessons. A deeply personal work that resonates with readers across ages.',
    desc: 'An intimate collection of essays and letters exploring fatherhood, wisdom, and life lessons.',
  },
];

export function getBookById(id: string | null | undefined): Book {
  return BOOKS.find((book) => book.id === id) ?? BOOKS[0];
}
