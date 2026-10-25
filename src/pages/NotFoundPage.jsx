import Button from '../components/ui/Button.jsx';
import './NotFoundPage.css';

// Shown for any URL that no <Route> matches (path="*" in App.jsx).
export default function NotFoundPage() {
  return (
    <main className="notfound">
      <p className="notfound__code">404</p>
      <h1>Page not found</h1>
      <p>The page you're looking for doesn't exist or was moved.</p>
      <Button to="/">Back to home</Button>
    </main>
  );
}
