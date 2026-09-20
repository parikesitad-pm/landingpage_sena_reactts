import { createBrowserRouter, Navigate, useParams } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import BrandMarkPage from '@/pages/BrandMarkPage';
import MomentsPage from '@/pages/MomentsPage';
import NotFoundPage from '@/pages/NotFoundPage';

function BrandRedirect() {
  const { lang } = useParams<{ lang?: string }>();
  return <Navigate to={lang ? `/${lang}/brand-mark` : '/brand-mark'} replace />;
}

function MomentsRedirect() {
  const { lang } = useParams<{ lang?: string }>();
  return <Navigate to={lang ? `/${lang}/moments` : '/moments'} replace />;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/:lang',
    element: <HomePage />,
  },
  {
    path: '/brand-mark',
    element: <BrandMarkPage />,
  },
  {
    path: '/:lang/brand-mark',
    element: <BrandMarkPage />,
  },
  {
    path: '/moments',
    element: <MomentsPage />,
  },
  {
    path: '/:lang/moments',
    element: <MomentsPage />,
  },
  // Backwards compatibility & alias redirects
  {
    path: '/brand',
    element: <Navigate to="/brand-mark" replace />,
  },
  {
    path: '/:lang/brand',
    element: <BrandRedirect />,
  },
  {
    path: '/the-logo',
    element: <Navigate to="/brand-mark" replace />,
  },
  {
    path: '/:lang/the-logo',
    element: <BrandRedirect />,
  },
  {
    path: '/signature-logo',
    element: <Navigate to="/brand-mark" replace />,
  },
  {
    path: '/:lang/signature-logo',
    element: <BrandRedirect />,
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
]);
