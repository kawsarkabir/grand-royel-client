import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'sonner';
import { RouterProvider } from 'react-router';
import { router } from './routes/routes';
import './index.css';
import 'leaflet/dist/leaflet.css';
import { HeadProvider } from 'react-head';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeadProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Toaster richColors position="top-right" />
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </HeadProvider>
  </StrictMode>
);
