import { useEffect, useState } from 'react';
import './App.css'
import { Link, usePage } from './Router';
import { supabase } from './main';

function App() {
  const page = usePage();

  return (
    <div className="container">
      <header className="header">
        <h1><Link href="/">Game</Link></h1>
        <div className="loginSection">
          <Link href="/login" className="btn btn-ghost">Giriş</Link>
          {/* <Link href="/giris" className="btn">Kayıt Ol</Link> */}
        </div>
      </header>
      {page.component}
    </div>
  )
}

export default App;