import { registerRootComponent } from 'expo';
import App from './App';

// Capturar errores globales para debug en web
if (typeof window !== 'undefined') {
  window.addEventListener('error', (e) => {
    console.error('Global error:', e.error?.message || e.message);
    document.body.innerHTML = `<pre style="color:red;padding:20px;">ERROR: ${e.error?.stack || e.message}</pre>`;
  });
  window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled rejection:', e.reason);
  });
}

registerRootComponent(App);
