import {
  createBrowserRouter,
  Navigate,
  useParams,
  Outlet,
} from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import HomePage from '@/pages/HomePage';
import LogoPhilosophyPage from '@/pages/LogoPhilosophyPage';
import MomentsPage from '@/pages/MomentsPage';
import NotFoundPage from '@/pages/NotFoundPage';

function RootLayout() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}

function LogoPhilosophyRedirect() {
  const { lang } = useParams<{ lang?: string }>();
  return (
    <Navigate
      to={lang ? `/${lang}/logo-philosophy` : '/logo-philosophy'}
      replace
    />
  );
}

function MomentsRedirect() {
  const { lang } = useParams<{ lang?: string }>();
  return <Navigate to={lang ? `/${lang}/moments` : '/moments'} replace />;
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/:lang',
        element: <HomePage />,
      },
      {
        path: '/logo-philosophy',
        element: <LogoPhilosophyPage />,
      },
      {
        path: '/:lang/logo-philosophy',
        element: <LogoPhilosophyPage />,
      },
      {
        path: '/moments',
        element: <MomentsPage />,
      },
      {
        path: '/:lang/moments',
        element: <MomentsPage />,
      },
      // Backwards compatibility & alias redirects to /logo-philosophy
      {
        path: '/brand-mark',
        element: <Navigate to="/logo-philosophy" replace />,
      },
      {
        path: '/:lang/brand-mark',
        element: <LogoPhilosophyRedirect />,
      },
      {
        path: '/brand',
        element: <Navigate to="/logo-philosophy" replace />,
      },
      {
        path: '/:lang/brand',
        element: <LogoPhilosophyRedirect />,
      },
      {
        path: '/the-logo',
        element: <Navigate to="/logo-philosophy" replace />,
      },
      {
        path: '/:lang/the-logo',
        element: <LogoPhilosophyRedirect />,
      },
      {
        path: '/signature-logo',
        element: <Navigate to="/logo-philosophy" replace />,
      },
      {
        path: '/:lang/signature-logo',
        element: <LogoPhilosophyRedirect />,
      },
      {
        path: '/memories',
        element: <Navigate to="/moments" replace />,
      },
      {
        path: '/:lang/memories',
        element: <MomentsRedirect />,
      },
      {
        path: '/little-moments',
        element: <Navigate to="/moments" replace />,
      },
      {
        path: '/:lang/little-moments',
        element: <MomentsRedirect />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
