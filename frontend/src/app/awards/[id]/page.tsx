import { notFound } from 'next/navigation';
import DetailPageLayout from '@/components/DetailPageLayout';
import { AWARD_IDS, getAwardById } from '@/lib/awards';

type AwardPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return AWARD_IDS.map((id) => ({ id }));
}

export default async function AwardPage({ params }: AwardPageProps) {
  const { id } = await params;
  const award = getAwardById(id);

  if (!award) {
    notFound();
  }

  return (
    <DetailPageLayout
      title={award.title}
      subtitle={award.subtitle}
      paragraphs={award.paragraphs}
      backHref="/#awards"
      backLabel="← Back to Awards"
    />
  );
}
