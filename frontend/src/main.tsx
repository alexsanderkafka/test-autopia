import { createRoot } from 'react-dom/client'
import './global.css'
import { RouterProvider } from 'react-router/dom'
import router from './routes/routes.tsx';
import { PokemonProvider } from './store/PokemonContext.tsx';


  createRoot(document.getElementById('root')!).render(
    <PokemonProvider>
      <RouterProvider router={router} />
    </PokemonProvider>
  );
