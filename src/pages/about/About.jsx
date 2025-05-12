import styles from "./about.module.scss";

const About = () => {
  return (
    <div className={styles.container}>
      <div className={styles.aboutContent}>
        <h1 className={styles.title}>Hakkımızda</h1>
        <p className={styles.entrance}>
          Bibliyofil, kitaplara gönülden bağlı insanların bir araya geldiği,
          dijital bir topluluk platformudur. Biz, kitapların yalnızca okunmak
          için değil, paylaşılmak ve birlikte deneyimlenmek için var olduğuna
          inanıyoruz. Amacımız; kitap okuma kültürünü yaygınlaştırmak, bireysel
          okuma alışkanlıklarını topluluk içinde daha güçlü bir hale getirmek ve
          insanlar arasında kitaplar aracılığıyla anlamlı bağlar kurmaktır.{" "}
          <br />
          Kitap okumanın çoğu zaman sessiz ve kişisel bir eylem olarak
          görüldüğünü biliyoruz. Ancak Bibliyofil’de bu yalnızlığı birlikte
          öğrenmeye, tartışmaya ve ilham almaya dönüştürüyoruz. Çünkü inanıyoruz
          ki kitaplar bir araya geldiğinde, insanlar da birbirine yaklaşır.
        </p>

        <h2>Ne Sunuyoruz?</h2>
        <div className={styles.texts}>
          <div className={styles.text}>
            <div className={styles.textContent}>
              <h3>Topluluklar</h3>
              <p>
                Bibliyofil, kitap kulüplerini sadece bir okuma listesi değil,
                birlikte düşünen, hisseden ve üreten topluluklar olarak görür.{" "}
                <br />
                İlgi alanına göre topluluklara katılarak ya da kendi grubunu
                kurarak, kitaplar üzerine sohbet edebilir, etkinlikler
                düzenleyebilir ve birlikte okuma alışkanlıkları
                geliştirebilirsin. Her topluluk, yeni fikirlere açık bir buluşma
                noktasıdır.
              </p>
            </div>
            <div className={styles.image}>
              <img src="../../../public/images/about_communities.png" alt="" />
            </div>
          </div>

          <div className={styles.text}>
            <div className={styles.image}>
              <img src="../../../public/images/about_audiobooks.png" alt="" />
            </div>
            <div className={styles.textContent}>
              <h3>Sesli Kitap Deneyimi</h3>
              <p>
                Kimi zaman gözlerimizin değil, kulaklarımızın dünyasına
                bırakırız kendimizi. Bibliyofil’de topluluğunla birlikte aynı
                anda sesli kitaplar dinleyebilir, metin üzerinden eş zamanlı
                takip yapabilir, dinledikçe düşündüklerini paylaşabilirsin.
                <br /> Görsel ve işitsel deneyimin bir arada sunulduğu bu alan,
                özellikle erişilebilirlik açısından da birçok kullanıcı için
                büyük bir fırsat yaratır.
              </p>
            </div>
          </div>

          <div className={styles.text}>
            <div className={styles.textContent}>
              <h3>Özet ve Yorum Paylaşımı</h3>
              <p>
                Kitaplar bizde duygular, düşünceler ve sorular bırakır.
                Bibliyofil, bu izleri başkalarıyla paylaşabileceğin bir alan
                sunar. <br />
                Okuduğun kitapların özetlerini yazabilir, karakterler ve olaylar
                hakkındaki yorumlarını dile getirebilir, başkalarının bakış
                açılarını okuyarak kitapları farklı açılardan yeniden
                keşfedebilirsin. Burada her yorum, başka birine ilham olabilir.
              </p>
            </div>
            <div className={styles.image}>
              <img src="../../../public/images/about_summary.png" alt="" />
            </div>
          </div>

          <div className={styles.text}>
            <div className={styles.image}>
              <img src="../../../public/images/about_donation.png" alt="" />
            </div>
            <div className={styles.textContent}>
              <h3>Kitap Bağışı</h3>
              <p>
                Herkesin kitaplara erişimi eşit değil. Bibliyofil olarak biz,
                kitapların bir rafta tozlanmasındansa ihtiyacı olan bir
                okuyucunun ellerine ulaşması gerektiğine inanıyoruz. <br />
                Kütüphanende artık okumadığın, ama başkalarının hayatına
                dokunabilecek kitapları bağışlayabilir; öğrenciler,
                kütüphaneler, köy okulları ya da sosyal kurumlara ulaşmasını
                sağlayabilirsin. Bibliyofil, kitapların yolculuğunu
                sürdürebilmesi için güvenilir bir köprü kurar.
              </p>
            </div>
          </div>

          <div className={styles.text}>
            <div className={styles.textContent}>
              <h3>Kişisel Profil</h3>
              <p>
                Bibliyofil’deki deneyimin sana özeldir. Okuduğun kitapları,
                dinlediğin sesli içerikleri, oluşturduğun özetleri ve katıldığın
                toplulukları profilinde bir araya getirirsin. <br /> Kendine ait
                bir okuma haritası çıkartabilir, favori türlerini ve yazarlarını
                belirleyerek kitap geçmişini anlamlı bir hikâyeye
                dönüştürebilirsin. Senin kitap yolculuğun, bu topluluğun bir
                parçası olur.
              </p>
            </div>
            <div className={styles.image}>
              <img src="../../../public/images/about_profile.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
