import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from '@/components/ui/sonner';
import { ErrorFallback } from '@/components/ErrorFallback';
import App from './app';
import AppProvider from './context/AppProvider';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <AppProvider>
          <App />
          <Toaster richColors position="top-center" />
        </AppProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>,
);
