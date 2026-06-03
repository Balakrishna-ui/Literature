import { Suspense } from 'react';
import BooksPageContent from '@/components/BooksPageContent';

export default function BooksPage() {
  return (
    <Suspense fallback={<div className="books-page__loading">Loading books...</div>}>
      <BooksPageContent />
    </Suspense>
  );
}
