import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/app/App';
import '@/styles/globals.css';
import { showConsoleEasterEgg } from '@/lib/consoleEasterEgg';
import { initGlobalScrollRestoration } from '@/lib/scrollRestoration';

initGlobalScrollRestoration();
showConsoleEasterEgg();

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
