import Link from 'next/link';

export default function ErrorMessage({ message }) {
  return (
    <div className="container min-h-[50vh] flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-primary-foreground mb-4">
          {message || 'Something went wrong'}
        </h2>
        <Link 
          href="/news-and-updates" 
          className="text-primary hover:underline"
        >
          Return to Blog List
        </Link>
      </div>
    </div>
  );
}
