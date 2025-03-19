import { useEffect, useState, useContext } from "react";
import { supabase } from "../main";
import { Link, usePage } from '../Router'
import { UserContext } from "../App";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginRegister() {
  const [errorMessage, setErrorMessage] = useState(null);
  const authUser = useContext(UserContext);
  const page = usePage();
  const isRegister = page.path === "/signup";

  useEffect(() => {
    console.log("Sayfa Değişti: ", page.path);
    setErrorMessage(null);
  }, [page.path]);

  useEffect(() => {
    setErrorMessage(null);
  }, [isRegister]);

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage(null);

    const formData = new FormData(e.target);
    const userInfo = Object.fromEntries(formData);

    if (isRegister) {
      console.log("Kayıt işlemi başlatılıyor...");
      const { data, error } = await supabase.auth.signUp({
        email: userInfo.email,
        password: userInfo.password,
        options: {
          data: {
            name: userInfo.name
          }
        }
      });

      if (error) {
        console.error("Kayıt hatası:", error.message);
        setErrorMessage(error.message);
        toast.error(error.message); // Hata mesajı göster
        return;
      }

      console.log("Kayıt başarılı, kullanıcı:", data.user);

      if (data?.user) {
        const { error: insertError } = await supabase
          .from('users')
          .upsert([{ name: userInfo.name }]);

        if (insertError) {
          console.error("Users tablosuna ekleme hatası:", insertError);
          toast.error("Database error: " + insertError.message);
        } else {
          console.log("Users tablosuna ekleme başarılı.");
          toast.success("Registration successful! Redirecting to login...");
        }

        // 2 saniye sonra giriş sayfasına yönlendir
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      }
    } else {
      console.log("Giriş yapılıyor...");
      const { data, error } = await supabase.auth.signInWithPassword({
        email: userInfo.email,
        password: userInfo.password,
      });

      if (error) {
        console.error("Giriş hatası:", error.message);
        setErrorMessage(error.message);
        toast.error(error.message); // Hata mesajı göster
        return;
      }

      console.log("Giriş başarılı, kullanıcı:", data.user);
      toast.success("Login successful! Redirecting...");
      
      // Giriş yaptıktan sonra yönlendirme
      setTimeout(() => {
        window.location.href = "/game";
      }, 3000);
    }
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      
      {isRegister ?
        <div className="signUpTitle">
          <h2>Sign Up</h2>
          <p>You can create a new registration by entering your personal information. Are you already a member? <Link href="/login">Login</Link></p>
        </div> :
        <div className="loginTitle">
          <h2>Login</h2>
          <p>You can log in to the system with your user information. Not a member yet? <Link href="/signup">Sign Up</Link></p>
        </div>
      }

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <form autoComplete="off" onSubmit={handleSubmit} className={isRegister ? 'signUpForm' : 'loginForm'}>
        {isRegister && <p><input required type="text" name="name" placeholder='Username' /></p>}
        <p><input required type="email" name="email" placeholder='E-mail Address' /></p>
        <p><input required type="password" name="password" placeholder='Password' /></p>
        <p>
          <button>{isRegister ? 'Sign Up' : (authUser ? <Link href="/game">Login</Link> : 'Giriş')}</button>
          <div className="forgotPasBtn">
          {!isRegister ?
            <Link href="/forgot-my-password">Forgot Password</Link>
            : ''
          }
          </div>
        </p>
      </form>
    </>
  )
}
