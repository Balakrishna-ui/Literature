export type AwardDetail = {
  id: string;
  title: string;
  badge: string;
  shortDesc: string;
  subtitle: string;
  img: string;
  paragraphs: string[];
};

export const AWARDS: AwardDetail[] = [
  {
    id: 'sahitya',
    title: 'Sahitya Akademi Award',
    badge: '2018 · National',
    shortDesc: "India's highest literary honor for the novel Echoes of Silence",
    subtitle: '2018 · National Honor',
    img: '/images/aw1.jpeg',
    paragraphs: [
      "In 2018, Dr. Rajesh Varma was honored with the prestigious Sahitya Akademi Award, India's highest literary honor, for his groundbreaking novel, Echoes of Silence.",
      'The award recognized his profound ability to capture the unspoken nuances of rural Indian life while addressing universal themes of resilience and human connection. Echoes of Silence was praised by the jury for its lyrical prose and the deep empathy it demonstrated toward its marginalized characters.',
      "This recognition cemented Dr. Varma's position as one of the most important contemporary voices in modern Indian literature, bringing his work to a significantly wider national audience.",
    ],
  },
  {
    id: 'booker',
    title: 'Booker Prize Shortlist',
    badge: '2020 · International',
    shortDesc: 'Shortlisted for the masterpiece Shadows of Tomorrow',
    subtitle: '2020 · International Recognition',
    img: '/images/aw2.jpeg',
    paragraphs: [
      "In 2020, Dr. Varma's masterpiece Shadows of Tomorrow earned a spot on the highly competitive Booker Prize Shortlist, bringing his work to the forefront of global literary conversations.",
      'The novel was applauded for its sweeping narrative that seamlessly intertwined multi-generational history with modern ethical dilemmas. Being shortlisted for the Booker Prize not only highlighted his storytelling mastery on an international stage but also introduced South Asian cultural intricacies to a massive global audience.',
    ],
  },
  {
    id: 'jnanpith',
    title: 'Jnanpith Award',
    badge: '2021 · Lifetime',
    shortDesc: 'For outstanding contribution to Indian literature',
    subtitle: '2021 · Lifetime Achievement',
    img: '/images/aw3.jpeg',
    paragraphs: [
      'Recognized as the highest literary award in India, the Jnanpith Award was presented to Dr. Rajesh Varma in 2021 for his lifetime of outstanding contribution to Indian literature.',
      'The award celebrated not just a single book, but his entire body of work that has profoundly enriched the cultural and literary fabric of the nation. The citation highlighted his dedication to portraying the diverse voices and realities of India with unmatched authenticity and emotional depth.',
    ],
  },
  {
    id: 'padma',
    title: 'Padma Shri',
    badge: '2019 · Civilian',
    shortDesc: 'Distinguished service in literature — Government of India',
    subtitle: '2019 · Civilian Honor',
    img: '/images/ins4.jpeg',
    paragraphs: [
      'In 2019, the Government of India conferred the Padma Shri—the fourth-highest civilian award in the Republic of India—upon Dr. Rajesh Varma.',
      'He was recognized for his distinguished service in the field of literature and education. The President of India presented the award at a ceremony in Rashtrapati Bhavan, acknowledging his efforts not only as a writer but as a cultural ambassador who has continuously mentored young writers and promoted literature in education.',
    ],
  },
];

export function getAwardById(id: string | null | undefined): AwardDetail | undefined {
  return AWARDS.find((award) => award.id === id);
}

export const AWARD_IDS = AWARDS.map((award) => award.id);
