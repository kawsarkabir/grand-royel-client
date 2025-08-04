import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] py-12 px-4 text-center">
      <img
        src="/placeholder.svg?height=300&width=400" // Replace with an exciting 404 GIF/JPG
        width={400}
        height={300}
        alt="404 Not Found"
        className="mb-8 rounded-lg shadow-lg"
      />
      <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-4">
        404 - Page Not Found
      </h1>
      <p className="max-w-md text-muted-foreground md:text-xl mb-8">
        Oops! The page you&apos;re looking for doesn&apos;t exist. It might have
        been moved or deleted.
      </p>
      <Link to="/">
        <Button size="lg">Back to Home</Button>
      </Link>
    </div>
  );
}
