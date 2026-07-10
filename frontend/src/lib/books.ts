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
  image?: string;
  images?: string[];
  desc: string;
  shortDesc: string;
  isFeatured?: boolean;
};

export const BOOKS: Book[] = [
  {
    id: 'aaru-velu',
    title: 'Natya Vedana',
    subtitle: 'Bharatiya Nritya Kala Vaibhavam',
    category: 'Novel',
    year: '2018',
    pages: '128',
    language: 'Telugu',
    publisher: 'Visalandhra Publishing House',
    genre: 'Literary Fiction',
    images: ['/images/nataya0.png', '/images/nataya1.jpeg', '/images/nataya2.jpeg', '/images/nataya3.jpeg', '/images/nataya4.jpeg'],
    isFeatured: true,
    shortDesc: 'Natya Vedana is a thought-provoking book in which Duppalli Sri Ramulu shares his deep concern for the declining values of Telugu theatre. He reflects on how dramas, once a powerful medium for inspiring ethics, responsibility, and noble living, have gradually become mere sources of entertainment. According to him, a true play should educate, inspire, and reflect the realities of society, encouraging audiences toward moral and meaningful lives. Through this book, he expresses his heartfelt pain over the changing nature of Telugu drama and calls for the revival of its artistic and social purpose.',
    desc: 'Natya Vedana is a thought-provoking book in which Duppalli Sri Ramulu shares his deep concern for the declining values of Telugu theatre. He reflects on how dramas, once a powerful medium for inspiring ethics, responsibility, and noble living, have gradually become mere sources of entertainment. According to him, a true play should educate, inspire, and reflect the realities of society, encouraging audiences toward moral and meaningful lives. Through this book, he expresses his heartfelt pain over the changing nature of Telugu drama and calls for the revival of its artistic and social purpose.'
  },
  {
    id: 'nadhi-theeram',
    title: 'Bala Natikalu',
    subtitle: '',
    category: 'Short Plays',
    year: '----',
    pages: '142',
    language: 'Telugu',
    publisher: 'Sahitya Akademi',
    genre: 'Poetry',
    images: ['/images/balanatakalu0.jpeg', '/images/balanatakalu.jpeg', '/images/balanatakalu1.jpeg', '/images/balanatakalu2.jpeg'],
    isFeatured: true,
    shortDesc: 'Bala Natikalu* is a collection of short plays written by Duppalli Sri Ramulu to nurture moral values and character among children. Drawing inspiration from the Puranas, Itihasas, and social themes, these plays encourage ethical conduct, responsibility, discipline, and compassion. Each play, ranging from 5 to 30 minutes only, is designed to be engaging, educational, and easy to perform, making the book an excellent resource for schools, cultural programs, and young theatre enthusiasts.',
    desc: 'Bala Natikalu* is a collection of short plays written by Duppalli Sri Ramulu to nurture moral values and character among children. Drawing inspiration from the Puranas, Itihasas, and social themes, these plays encourage ethical conduct, responsibility, discipline, and compassion. Each play, ranging from 5 to 30 minutes only, is designed to be engaging, educational, and easy to perform, making the book an excellent resource for schools, cultural programs, and young theatre enthusiasts.'
  },
  {
    id: 'raktakshi',
    title: 'Palamuru Jilla Nataka Kala Vaibhavam',
    subtitle: '',
    category: 'Theatre History',
    year: '2005',
    pages: '128',
    language: 'Telugu',
    publisher: 'National Book Trust',
    genre: 'Drama',
    images: ['/images/pala0.jpeg', '/images/pala1.jpeg', '/images/pala2.jpeg', '/images/pala3.jpeg'],
    isFeatured: true,
    shortDesc: 'Palamuru Jilla Nataka Kala Vaibhavam is a tribute to the rich theatrical heritage of the Palamuru region. Through this book, Duppalli Sri Ramulu introduces and documents the lives and contributions of eminent Telugu theatre artists from the district, preserving their legacy for future generations. Inspired by Palamuru Jilla Devalayalu, authored by Kapilavai Lingamurthy, this work serves as a valuable record of Palamuru\'s vibrant contribution to Telugu theatre and its cultural history.',
    desc: 'Palamuru Jilla Nataka Kala Vaibhavam is a tribute to the rich theatrical heritage of the Palamuru region. Through this book, Duppalli Sri Ramulu introduces and documents the lives and contributions of eminent Telugu theatre artists from the district, preserving their legacy for future generations. Inspired by Palamuru Jilla Devalayalu, authored by Kapilavai Lingamurthy, this work serves as a valuable record of Palamuru\'s vibrant contribution to Telugu theatre and its cultural history.'
  },
  {
    id: 'sapta-sagaralu',
    title: 'Vishwakarma Kula Deepakulu',
    subtitle: '',
    category: 'Cultural Heritage',
    year: '2016',
    pages: '112',
    language: 'Telugu',
    publisher: 'Sahitya Akademi',
    genre: 'Poetry',
    images: ['/images/vis00.jpeg', '/images/vis0.jpeg'],
    isFeatured: true,
    shortDesc: 'Vishwakarma Kula Deepakulu celebrates the rich heritage and outstanding contributions of the five traditional communities of the Vishwakarma lineage — Manu (Blacksmiths), Maya (Carpenters), Tvastar (Bronzesmiths), Shilpi (Stonemasons), and Visvajna (Goldsmiths). The book highlights distinguished artisans and skilled professionals from the Palamuru region, recognizing their craftsmanship, dedication, and lifelong service to their respective fields. It also documents numerous temples dedicated to Sri Veerabrahmendra Swamy across the Palamuru district, describing their history, construction, and the collective efforts of temple committees and local communities in establishing and preserving these sacred places. This work serves as both a tribute to the Vishwakarma community and a valuable record of Palamuru\'s cultural, spiritual, and architectural heritage.',
    desc: 'Vishwakarma Kula Deepakulu celebrates the rich heritage and outstanding contributions of the five traditional communities of the Vishwakarma lineage — Manu (Blacksmiths), Maya (Carpenters), Tvastar (Bronzesmiths), Shilpi (Stonemasons), and Visvajna (Goldsmiths). The book highlights distinguished artisans and skilled professionals from the Palamuru region, recognizing their craftsmanship, dedication, and lifelong service to their respective fields. It also documents numerous temples dedicated to Sri Veerabrahmendra Swamy across the Palamuru district, describing their history, construction, and the collective efforts of temple committees and local communities in establishing and preserving these sacred places. This work serves as both a tribute to the Vishwakarma community and a valuable record of Palamuru\'s cultural, spiritual, and architectural heritage.'
  },
  {
    id: 'swayambhu-sri-lakshmi-venkateshwareeyamu',
    title: 'Swayambhu Sri Lakshmi Venkateshwareeyamu',
    subtitle: '',
    category: 'History',
    year: '2017',
    pages: '---',
    language: 'Telugu',
    publisher: 'Self Published',
    genre: 'Devotional History',
    images: ['/images/kal0.jpeg', '/images/kal1.jpeg', '/images/kal2.jpeg', '/images/kal3.jpeg', '/images/kal4.jpeg'],
    isFeatured: false,
    shortDesc: 'Swayambhu Sri Lakshmi Venkateshwareeyamu chronicles the history of the revered Sri Lakshmi Venkateswara Swamy Temple, Amadabakula and the devotion behind its construction. The book narrates how the temple was built through the generous contributions and collective efforts of devotees. One of its most memorable chapters recounts the sacred journey of the temple\'s principal deity (Moola Virat), which was ceremoniously brought from Tirumala Venkateswara Swamy Temple, Tirupati to Amadabakula. Placed on a beautifully decorated chariot adorned with flowers, the deity was taken in a devotional procession that lasted nearly two months. Accompanied by bhajans and continuous worship, the yatra inspired and united countless villages along its route. Duppalli Sri Ramulu played a significant role in this sacred movement, and through this book he preserves the history, devotion, and collective spirit that gave rise to this remarkable temple.',
    desc: 'Swayambhu Sri Lakshmi Venkateshwareeyamu chronicles the history of the revered Sri Lakshmi Venkateswara Swamy Temple, Amadabakula and the devotion behind its construction. The book narrates how the temple was built through the generous contributions and collective efforts of devotees. One of its most memorable chapters recounts the sacred journey of the temple\'s principal deity (Moola Virat), which was ceremoniously brought from Tirumala Venkateswara Swamy Temple, Tirupati to Amadabakula. Placed on a beautifully decorated chariot adorned with flowers, the deity was taken in a devotional procession that lasted nearly two months. Accompanied by bhajans and continuous worship, the yatra inspired and united countless villages along its route. Duppalli Sri Ramulu played a significant role in this sacred movement, and through this book he preserves the history, devotion, and collective spirit that gave rise to this remarkable temple.'
  },
  {
    id: 'kambagiri-lakshmi-narasimha-swamy-paruveta-padyalu',
    title: 'Kambagiri Lakshmi Narasimha Swamy Paruveta Padyalu',
    subtitle: '',
    category: 'Spiritual',
    year: '2020',
    pages: '---',
    language: 'Telugu',
    publisher: 'Self Published',
    genre: 'Religious Poetry',
    image: '/images/bk2.png',
    isFeatured: false,
    shortDesc: 'Kambagiri Lakshmi Narasimha Swamy Paruveta Padyalu was written by Duppalli Sri Ramulu at the order of Sri Swamy Rammohana Acharya. The book is associated with the revered Kambagiri Lakshmi Narasimha Swamy Temple, a renowned temple celebrated for its annual Rathotsavam. During the festival, the sacred *Paruveta Padyalu* are traditionally recited in Sanskrit. Since their meaning is not easily understood by many devotees, Duppalli Sri Ramulu prepared clear and accessible explanations in Telugu, enabling ordinary readers to appreciate the spiritual significance and literary beauty of these verses. This work reflects his commitment to making sacred literature understandable and accessible to the wider public.',
    desc: 'Kambagiri Lakshmi Narasimha Swamy Paruveta Padyalu was written by Duppalli Sri Ramulu at the order of Sri Swamy Rammohana Acharya. The book is associated with the revered Kambagiri Lakshmi Narasimha Swamy Temple, a renowned temple celebrated for its annual Rathotsavam. During the festival, the sacred *Paruveta Padyalu* are traditionally recited in Sanskrit. Since their meaning is not easily understood by many devotees, Duppalli Sri Ramulu prepared clear and accessible explanations in Telugu, enabling ordinary readers to appreciate the spiritual significance and literary beauty of these verses. This work reflects his commitment to making sacred literature understandable and accessible to the wider public.'
  },
  {
    id: 'manoharam',
    title: 'Manoharam',
    subtitle: '',
    category: 'Speeches',
    year: '2018',
    pages: '---',
    language: 'Telugu',
    publisher: 'Self Published',
    genre: 'Humor / Biography',
    image: '/images/bk1.png',
    isFeatured: false,
    shortDesc: 'Manoharam is a collection of humorous and spontaneous speeches delivered by Sri Vallapureddy Manohara Reddy Garu. Known for his wit, eloquence, and engaging style. Sri Manohara Reddy is a respected advocate, a passionate patron of Telugu theatre, and a well-known personality in the Palamuru region. Through this book, Duppalli Sri Ramulu preserves these memorable speeches, allowing readers to enjoy the humor, wisdom, and vibrant personality of Sri Manohara Reddy while celebrating his contribution to Telugu literary and cultural traditions.',
    desc: 'Manoharam is a collection of humorous and spontaneous speeches delivered by Sri Vallapureddy Manohara Reddy Garu. Known for his wit, eloquence, and engaging style. Sri Manohara Reddy is a respected advocate, a passionate patron of Telugu theatre, and a well-known personality in the Palamuru region. Through this book, Duppalli Sri Ramulu preserves these memorable speeches, allowing readers to enjoy the humor, wisdom, and vibrant personality of Sri Manohara Reddy while celebrating his contribution to Telugu literary and cultural traditions.'
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
