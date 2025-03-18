import { createRoot } from 'react-dom/client'
import { createClient } from '@supabase/supabase-js';
import App from './App.jsx'
import Router from './Router.jsx';
import LoginRegister from './pages/LoginRegister.jsx';
import Game from './pages/Game.jsx';
import ChoicePage from './pages/ChoicePage.jsx';
import './assets/reset.css'

export const supabase = createClient(
  'https://yoknnsdmknjaqbpodjow.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlva25uc2Rta25qYXFicG9kam93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyMjI2MzYsImV4cCI6MjA1Nzc5ODYzNn0.EQsQkR6chR-etkWuCH10u7ooGk0KBrU6HBMsEEvpfI4'
);

const routes = [
  {
    url: '/login',
    component: <LoginRegister />
  },
  {
    url: '/choice-page',
    component: <ChoicePage />
  },
  {
    url: '/game',
    component: <Game />
  },
];

const rootElement = document.getElementById('root');

// **Burada createRoot çağrısını yalnızca bir kez yapıyoruz**
if (!rootElement.__root) {
  rootElement.__root = createRoot(rootElement);
}

// **Önceden oluşturulan root nesnesini kullanarak render işlemi yapıyoruz**
rootElement.__root.render(
  <Router routes={routes}>
    <App />
  </Router>
);
