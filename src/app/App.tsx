import { RouterProvider } from 'react-router-dom';
import { router } from '@/app/router';
import { PreferencesProvider } from '@/features/preferences/context/PreferencesContext';

export default function App() {
  return (
    <PreferencesProvider>
      <RouterProvider router={router} />
    </PreferencesProvider>
  );
}
