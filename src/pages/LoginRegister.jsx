import { useEffect, useState } from "react";
import { Link } from "../Router";
import { supabase } from "../main";

export default function LoginRegister() {
  const [isRegister, setRegister] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

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
        return;
      }

      console.log("Kayıt başarılı, kullanıcı:", data.user);

      // Kullanıcı başarıyla kayıt olduktan sonra 'users' tablosuna veri ekle
      if (data?.user) {
        const { data: userData, error: userError } = await supabase.auth.getUser();

        // Eğer kullanıcı doğrulandıysa 'users' tablosuna veri ekle
        if (userData) {
          console.log("Users tablosuna veri ekleniyor...");
          const { error: insertError } = await supabase
            .from('users')
            .upsert([{ id: userData.id, name: userInfo.name, created_at: new Date() }]);

          if (insertError) {
            console.error("Users tablosuna ekleme hatası:", insertError);
          } else {
            console.log("Users tablosuna ekleme başarılı.");
          }
        } else {
          console.error("Kullanıcı bilgileri alınamadı.");
        }
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
        return;
      }

      console.log("Giriş başarılı, kullanıcı:", data.user);
    }
  }



  return (
    <>
      {isRegister ?
        <>
          <h2>Kayıt ol</h2>
          <p>Kişisel bilgilerini girerek yeni kayıt oluşturabilirsin. Kayıt olduktan sonra e-postanı doğrulamayı unutma!</p>
        </> :
        <>
          <h2>Giriş yap</h2>
          <p>Kullanıcı bilgilerin ile sisteme giriş yapabilirsin. Eğer bilgilerini hatırlamıyorsan <Link href="/sifremi-unuttum">şifreni sıfırla</Link>yabilirsin.</p>
        </>
      }

      <p><label><input type="checkbox" onChange={() => setRegister(!isRegister)} checked={isRegister} /> Yeni kayıt oluyorum.</label></p>

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <form autoComplete="off" onSubmit={handleSubmit}>
        {isRegister && <p><input required type="text" name="name" placeholder='Ad soyad' /></p>}
        <p><input required type="email" name="email" placeholder='E-posta adresi' /></p>
        <p><input required type="password" name="password" placeholder='Şifre' /></p>
        <p>
          <button>{isRegister ? 'Kayıt' : 'Giriş'}</button>
          {!isRegister ?
            <Link href="/sifremi-unuttum" className="btn btn-ghost">Şifremi unuttum</Link>
            : <button type="button" className="btn-ghost" onClick={() => setRegister(false)}>Vazgeç</button>
          }
        </p>
      </form>
    </>
  )
}