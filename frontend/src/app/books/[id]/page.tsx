import { Suspense } from 'react';
import BooksPageContent from '@/components/BooksPageContent';
import { BOOKS } from '@/lib/books';
import { notFound } from 'next/navigation';

type BookDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function BookDetailPage({ params }: BookDetailPageProps) {
  const { id } = await params;
  const exists = BOOKS.some((book) => book.id === id);

  if (!exists) {
    notFound();
  }

  return (
    <Suspense fallback={<div className="books-page__loading">Loading books...</div>}>
      <BooksPageContent initialBookId={id} />
    </Suspense>
  );
}
