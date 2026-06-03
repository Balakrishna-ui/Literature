import DetailPageLayout from '@/components/DetailPageLayout';
import { BIOGRAPHY_PARAGRAPHS } from '@/lib/about';

export default function AboutPage() {
  return (
    <DetailPageLayout
      title="Biography"
      paragraphs={BIOGRAPHY_PARAGRAPHS}
      backHref="/"
      backLabel="← Back to Home"
    />
  );
}
