import { Link } from 'react-router-dom';
import Container from '@/components/atoms/Container';
import Button from '@/components/atoms/Button';
import LogoMark from '@/components/atoms/LogoMark';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] text-[var(--foreground)] px-4 transition-colors">
      <Container size="sm" className="text-center py-16">
        <LogoMark className="mb-6 justify-center" />

        <span className="font-mono text-xs font-semibold tracking-widest text-[var(--accent)] uppercase block mb-3">
          404 &middot; Page Not Found
        </span>

        <h1 className="text-3xl sm:text-4xl font-bold font-sans tracking-tight mb-4">
          A Little Detour
        </h1>

        <p className="text-[var(--muted-foreground)] text-base sm:text-lg mb-8 max-w-md mx-auto leading-relaxed">
          The page you are looking for does not exist in Luca&apos;s story.
          Let&apos;s guide you back to his main journey.
        </p>

        <Link to="/">
          <Button variant="primary" size="lg">
            Back to Home
          </Button>
        </Link>
      </Container>
    </div>
  );
}
