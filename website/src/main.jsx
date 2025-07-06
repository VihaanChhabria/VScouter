import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Register the service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register("/sw.js", { scope: "/ui/" })
      .then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch(error => {
        console.log('ServiceWorker registration failed: ', error);
      });
  });

  navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        // Unregister the service worker that is not scoped to /ui/
        // This is to ensure that the service worker is only active for the /ui/ path
        if (!registration.scope.includes("/ui/")) {
          registration.unregister();
          console.log(
            "Unregistered service worker not scoped to /ui/:",
            registration.scope
          );
          setTimeout(() => {}, 200);
        }
      }
    });
    
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);