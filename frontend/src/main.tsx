import { createRoot } from 'react-dom/client'
import './global.css'
import { RouterProvider } from 'react-router/dom'
import router from './routes.ts';


createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
