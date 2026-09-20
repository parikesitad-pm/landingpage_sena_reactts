import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/app/App';
import '@/styles/globals.css';
import { initDevToolsEasterEgg } from '@/utils/devtoolsEasterEgg';

initDevToolsEasterEgg();

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
