# XOX Game App

> Klasik XOX (Tic Tac Toe) oyununu modern arayüz ve işleyişle sunan, kullanıcı girişi ve skor takibi destekli bir oyun uygulaması.

## Proje Özeti

Bu projede kullanıcılar çeşitli oyunlardan birini seçerek giriş yapar ve ardından XOX oyununu oynayabilirler. Oyuncu giriş yaptıktan sonra istediği işareti (X veya O) seçer. Uygulama kuralı gereği her zaman **X** ilk başlar. Oyun sırasında kazanma, kaybetme ve beraberlik durumları takip edilir ve skorlar kaydedilir. Oyuncu isterse round sıfırlanabilir ancak skorlar korunur.

## Ana Özellikler

- Ana sayfada oyun seçme paneli.

![image](https://github.com/user-attachments/assets/a95d7c39-55a5-4259-b6b9-64dd7d842cf1)

- **Login/Register** ekranı: Oynamadan önce kullanıcı girişi zorunludur.

![image](https://github.com/user-attachments/assets/91718f9d-a440-49e2-bf95-d3f3f3d40fd7)
![image](https://github.com/user-attachments/assets/5151b995-ab88-41db-9f45-940ffd227f20)

- Oyuncunun istediği işareti seçmesi (X veya O).

![image](https://github.com/user-attachments/assets/f7a6b7f2-8885-442f-921b-e422f327d26e)

- Seçim yapılmadan oyuna geçilirse uyarı mesajı gösterilir.

![image](https://github.com/user-attachments/assets/62995d8d-951c-4f49-a1e7-f163c3752f6a)

- X her zaman ilk başlar. Seçilen işarete göre oyunun sırası ve işleyişi ayarlanır.

- Skor tablosu ile **kullanıcı**, **beraberlik** ve **CPU** puanları izlenir.

![image](https://github.com/user-attachments/assets/f0812456-3929-4508-8a68-6b314d7763d0)

- Oyun bittiğinde **kazanan**, **beraberlik** veya **kaybeden** ekranı görüntülenir.

![image](https://github.com/user-attachments/assets/87327964-2225-4a58-ab9a-cca029d6e255)

- “Next Round” ile bir sonraki elde skorlar korunarak yeni oyun başlatılabilir.
- “Reset” butonu ile round tekrar başlatılabilir (skorlar sıfırlanmaz).

## Takım Katkıları

### Gaye Dinç

- **Login** ve **Register** ekranlarını oluşturdu.
- **Game.jsx** sayfasındaki tüm oyun kurallarını ve state yönetimini yazmaya katkı sağladı.
- Kullanıcı seçim ekranı (**ChoicePage**) geliştirdi.
- Oyuncunun işaretini seçmeden oyuna geçmesini engelleyen uyarı sistemini entegre etti.
- Kazanma/kaybetme/beraberlik tespiti ve skor güncellemeleri.
- LocalStorage ile kullanıcı işareti bilgisini yönetmeyi sağladı.
- **GameBanner** ekranının tasarımı ve sayfa geçiş sistemini oluşturdu.
- Slick Carousel entegresiyle oyun tanıtım kartlarını dinamikleştirdi.
- Kullanıcının oyun başlangıcında seçtiği işarete göre hamle sıralamasını doğru şekilde ayarlayan algoritmayı geliştirmeye katkıda bulundu.
- CPU'nun hamle yaparken yaşadığı senkronizasyon sorunlarını gidererek oyunun akışını kararlı hale getirmeye katkıda bulundu.

### Ömer Kuluç

- **Game.jsx** sayfasındaki tüm oyun kurallarını ve state yönetimini yazmaya katkı sağladı.
- Context API ile işaretlerin global olarak paylaşımını sağladı.
- Mobil uyumlu stil düzenlemelerinde bulundu.
- Kazanma/kaybetme/beraberlik tespiti ve skor güncellemeleri.
- Resetleme mantığını kurdu.
- Kullanıcının oyun başlangıcında seçtiği işarete göre hamle sıralamasını doğru şekilde ayarlayan algoritmayı geliştirmeye katkıda bulundu.
- CPU'nun hamle yaparken yaşadığı senkronizasyon sorunlarını gidererek oyunun akışını kararlı hale getirmeye katkıda bulundu.

### Buse Savaş

- **Game.jsx** sayfasındaki tüm oyun kurallarını ve state yönetimini yazmaya katkı sağladı.
- **Login** ve **Register** ekranlarını bağladı, stillendirdi.
- Sayfa navigasyonuna uygun kullanıcı akışı oluşturdu.
- CSS düzenlemeleri ve responsive davranışlarda görev aldı.
- Tüm modalları oluşturdu ve stillendirdi.
- Kullanıcıya anlık geri bildirim sağlamak amacıyla **Toastify** kütüphanesini projeye entegre etti.
- Kullanıcının oyun başlangıcında seçtiği işarete göre hamle sıralamasını doğru şekilde ayarlayan algoritmayı geliştirmeye katkıda bulundu.

## Kullanım Akışı

1. Uygulama açıldığında kullanıcı oyun seçer.
2. XOX oyununa girildiğinde kullanıcı girişi istenir.
3. Giriş yaptıktan sonra kullanıcı X veya O işaretini seçer.
4. Oyun, X'in ilk başlaması kuralına göre başlar.
5. Her hamleden sonra kazanma/beraberlik kontrolü yapılır.
6. Skorlar güncellenir ve oyun devam eder.
7. Oyun sonucu modal ile gösterilir, kullanıcı isterse sonraki round’a geçer veya oyunu sıfırlar.

## Kullanılan Teknolojiler

- **React.js** – Arayüz ve bileşen yapısı
- **Context API** – Global state yönetimi (işaret paylaşımı vs.)
- **React Router** – Sayfa geçişleri
- **LocalStorage** – Kullanıcı seçimi ve işaretlerin kaydedilmesi
- **Custom CSS** – Tasarım ve responsive yapı
- **Slick Carousel** – Ana sayfadaki oyun seçim slaytları
- **SVG Icon Components** – İşaret ikonları (X ve O)

## Projeyi Çalıştırma

### 1. Repozitoyu klonla

```bash
git clone https://github.com/kullanici-adi/xox-game-app.git
```

### 2. Proje klasörüne geç

```bash
cd xox-game-app
```

### 3. Bağımlılıkları yükle

```bash
npm install
# veya
yarn install
```

### 4. Geliştirme sunucusunu başlat

```bash
npm run dev
# veya
yarn dev
```

### 5. Uygulamayı aç

Tarayıcınızda şu adresi açarak kullanmaya başlayabilirsiniz:  
[http://localhost:5173](http://localhost:5173)

## Proje Dosya Yapısı

```bash
src
 ┣ assets
 ┃ ┣ img
 ┃ ┣ Game.css
 ┃ ┗ reset.css
 ┣ pages
 ┃ ┣ Game.jsx
 ┃ ┣ ChoicePage.jsx
 ┃ ┣ GameBanner.jsx
 ┃ ┣ LoginRegister.jsx
 ┃ ┣ StartPage.jsx
 ┃ ┗ GameContext.jsx
 ┣ Svg.jsx              # X ve O SVG bileşenleri
 ┣ Router.jsx           # Sayfa yönlendirme mantığı
 ┣ App.jsx              # Root bileşen
 ┣ App.css              # Genel stiller
 ┣ helper.js            # Yardımcı fonksiyonlar
 ┗ main.jsx             # Uygulama giriş noktası

README.md
index.html
vite.config.js
package.json
```

## Sonuç

**XOX Game App** sade ve sezgisel kullanıcı arayüzüyle klasik bir oyunu modern hâle getiriyor. Kayıt/giriş sistemi, kullanıcı seçimi, skor takibi ve responsive tasarımıyla oyun deneyimi hem mobilde hem masaüstünde rahatlıkla kullanılabiliyor. Takım çalışmasıyla ortaya çıkan bu proje, React ekosisteminin temel bileşenlerini etkili şekilde birleştiriyor.
