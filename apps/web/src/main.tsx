import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

const apiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';
function App() {
  const health = useQuery({ queryKey: ['health'], queryFn: async () => (await fetch(`${apiUrl}/health`)).json() });
  return <main><h1>Nexa ERP</h1><p>AI-powered business operating system</p><p>API status: {health.isLoading ? 'checking…' : health.data?.status === 'ok' ? 'online' : 'unavailable'}</p></main>;
}
createRoot(document.getElementById('root')!).render(<StrictMode><QueryClientProvider client={new QueryClient()}><BrowserRouter><App /></BrowserRouter></QueryClientProvider></StrictMode>);
