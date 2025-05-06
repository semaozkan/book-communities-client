import { useState } from "react";
import Comments from "../../components/comments/Comments";
import styles from "./bookDetail.module.scss";
import { FaHeadphonesAlt } from "react-icons/fa";
import Summaries from "../../components/summaries/Summaries";
import { useNavigate } from "react-router-dom";

const bookData = {
  id: 1,
  img: "/images/kucuk_prens.jpeg",
  title: "Küçük Prens",
  author: "Antoine de Saint-Exupéry",
  publishingHouse: "Can Yayınları",
  time: "1sa 30dk",
  language: "Türkçe",
  format: ["audio", "read"],
  category: "Çocuk",
  introduction: `"Hoşça git," dedi tilki. "Vereceğim sır çok basit: İnsan ancak yüreğiyle baktığı zaman doğruyu görebilir. Gerçeğin mayası gözle görülmez." Küçük Prens unutmamak için tekrarladı: "Gerçeğin mayası gözle görülmez."
Küçük Prens yıllardır beklenen Cemal Süreya ve Tomris Uyar çevirisiyle Can Çocuk Yayınlar'ında.`,
  translatedBy: "Tomris Uyar, Cemal Süreya",
  summaries: [
    {
      id: "1",
      bookId: "101",
      title: "Küçük Prens",
      author: "Semanur Özkan",
      date: "01.05.2025",
      content: `Küçük Prens, Fransız yazar Antoine de Saint-Exupéry’nin hem çocuklara hem de yetişkinlere hitap eden, derin anlamlar içeren bir masal kitabıdır. Hikâye, anlatıcının çocukken çizdiği bir resmin büyükler tarafından anlaşılmamasıyla başlar. Çocukken sanatçı olmak isteyen anlatıcı, büyüklerin anlayışsızlığı yüzünden bu hayalinden vazgeçer ve pilot olur. Yıllar sonra uçağı Sahra Çölü’ne düşer ve burada, sarı saçlı, gizemli bir çocuk olan Küçük Prens ile karşılaşır. Küçük Prens, ondan bir koyun çizmesini ister. Bu isteğiyle anlatıcının hayatında özel bir yer edinmeye başlar.

    Küçük Prens, kendi gezegeni olan Asteroit B-612’de yaşar. Bu gezegen çok küçüktür ve üç yanardağ ile bir gül bulunur. Gül, çok güzel ama bir o kadar da kibirlidir. Küçük Prens, gülüyle ilgilenir, onu korur ve sever. Ancak gülün kaprisli davranışları Küçük Prens’i üzer ve bu yüzden gezegeninden ayrılmaya karar verir. Amacı, evrendeki başka gezegenleri keşfetmek ve bazı sorularına cevap bulmaktır.

    Yolculuğu sırasında farklı gezegenlere uğrar ve her birinde farklı bir yetişkinle tanışır. Bu yetişkinler aslında insan dünyasındaki bazı karakter özelliklerinin birer sembolüdür. Bir kral ile tanışır; bu kral, hükmedeceği kimse olmamasına rağmen sürekli emir verir. Sonra kendini beğenmiş biriyle karşılaşır; bu kişi sadece alkışlanmak ve övülmek ister. Ardından, içki içtiği için utanıp, utandığı için daha fazla içen bir ayyaş ile tanışır. Bu da mantıksız döngülere ve alışkanlıkların köleliğine bir eleştiridir. Bir diğer gezegende, yıldızlara sahip olduğunu sanan ve onları sayan bir iş adamı vardır. Sadece sayı ve sahip olmakla ilgilidir. Fenerci ise sürekli feneri yakıp söndürmek zorundadır çünkü gezegeni çok hızlı dönmektedir. Küçük Prens onu en anlamlı kişi olarak görür çünkü başkaları için bir şey yapan tek kişidir. Son olarak bir coğrafyacı ile tanışır. Ancak bu coğrafyacı, gezip görmek yerine sadece başkalarının anlattıklarını yazıya döker, yani bilgiyi eylemsiz şekilde toplar.

    Küçük Prens sonunda Dünya’ya gelir. Burada bir yılanla tanışır. Yılan, ölümün ve geçişin sembolüdür. Küçük Prens’e, isterse bir gün ona yardım ederek yıldızına dönmesini sağlayabileceğini söyler. Daha sonra Küçük Prens, çölde bir tilkiyle tanışır. Bu karşılaşma, onun hayatındaki en önemli dönüm noktalarından biri olur. Tilki, ona “evcilleştirmek” kavramını öğretir. Bu, bağ kurmak, birini özel kılmak demektir. Tilki’nin öğrettiği en önemli şey, “İnsan ancak yüreğiyle baktığında doğruyu görebilir. En önemli şeyler gözle görülmez.” sözüdür. Küçük Prens, bu sözle sevgiyi, sadakati ve sorumluluğu anlamaya başlar. Gülünün değerini, onunla kurduğu bağ sayesinde fark eder. O gül, evrende tek değildir ama onun için özeldir çünkü onu sevmektedir.

    Sonunda anlatıcının uçağı tamir olur. Küçük Prens ise kendi gezegenine dönmek ister. Dönüş yolu, yılanın yardımını gerektirir. Küçük Prens, veda eder ve yılan tarafından sokularak bedenini Dünya’da bırakır. Anlatıcı için Küçük Prens’in bedeni kaybolmuş olsa da ruhu gökyüzündeki yıldızlara dönmüştür. Anlatıcı, yıllar geçse de Küçük Prens’i unutamaz. Gökyüzüne her baktığında, onun gülüşünü hatırlar ve yıldızlara bakarken artık hep onun varlığını düşünür.`,
    },

    {
      id: "2",
      bookId: "101",
      title: "Küçük Prens",
      author: "Ufuk Can Kurt",
      date: "04.05.2025",
      content: `Küçük Prens, Fransız yazar Antoine de Saint-Exupéry’nin hem çocuklara hem de yetişkinlere hitap eden, derin anlamlar içeren bir masal kitabıdır. Hikâye, anlatıcının çocukken çizdiği bir resmin büyükler tarafından anlaşılmamasıyla başlar. Çocukken sanatçı olmak isteyen anlatıcı, büyüklerin anlayışsızlığı yüzünden bu hayalinden vazgeçer ve pilot olur. Yıllar sonra uçağı Sahra Çölü’ne düşer ve burada, sarı saçlı, gizemli bir çocuk olan Küçük Prens ile karşılaşır. Küçük Prens, ondan bir koyun çizmesini ister. Bu isteğiyle anlatıcının hayatında özel bir yer edinmeye başlar.

    Küçük Prens, kendi gezegeni olan Asteroit B-612’de yaşar. Bu gezegen çok küçüktür ve üç yanardağ ile bir gül bulunur. Gül, çok güzel ama bir o kadar da kibirlidir. Küçük Prens, gülüyle ilgilenir, onu korur ve sever. Ancak gülün kaprisli davranışları Küçük Prens’i üzer ve bu yüzden gezegeninden ayrılmaya karar verir. Amacı, evrendeki başka gezegenleri keşfetmek ve bazı sorularına cevap bulmaktır.

    Yolculuğu sırasında farklı gezegenlere uğrar ve her birinde farklı bir yetişkinle tanışır. Bu yetişkinler aslında insan dünyasındaki bazı karakter özelliklerinin birer sembolüdür. Bir kral ile tanışır; bu kral, hükmedeceği kimse olmamasına rağmen sürekli emir verir. Sonra kendini beğenmiş biriyle karşılaşır; bu kişi sadece alkışlanmak ve övülmek ister. Ardından, içki içtiği için utanıp, utandığı için daha fazla içen bir ayyaş ile tanışır. Bu da mantıksız döngülere ve alışkanlıkların köleliğine bir eleştiridir. Bir diğer gezegende, yıldızlara sahip olduğunu sanan ve onları sayan bir iş adamı vardır. Sadece sayı ve sahip olmakla ilgilidir. Fenerci ise sürekli feneri yakıp söndürmek zorundadır çünkü gezegeni çok hızlı dönmektedir. Küçük Prens onu en anlamlı kişi olarak görür çünkü başkaları için bir şey yapan tek kişidir. Son olarak bir coğrafyacı ile tanışır. Ancak bu coğrafyacı, gezip görmek yerine sadece başkalarının anlattıklarını yazıya döker, yani bilgiyi eylemsiz şekilde toplar.

    Küçük Prens sonunda Dünya’ya gelir. Burada bir yılanla tanışır. Yılan, ölümün ve geçişin sembolüdür. Küçük Prens’e, isterse bir gün ona yardım ederek yıldızına dönmesini sağlayabileceğini söyler. Daha sonra Küçük Prens, çölde bir tilkiyle tanışır. Bu karşılaşma, onun hayatındaki en önemli dönüm noktalarından biri olur. Tilki, ona “evcilleştirmek” kavramını öğretir. Bu, bağ kurmak, birini özel kılmak demektir. Tilki’nin öğrettiği en önemli şey, “İnsan ancak yüreğiyle baktığında doğruyu görebilir. En önemli şeyler gözle görülmez.” sözüdür. Küçük Prens, bu sözle sevgiyi, sadakati ve sorumluluğu anlamaya başlar. Gülünün değerini, onunla kurduğu bağ sayesinde fark eder. O gül, evrende tek değildir ama onun için özeldir çünkü onu sevmektedir.

    Sonunda anlatıcının uçağı tamir olur. Küçük Prens ise kendi gezegenine dönmek ister. Dönüş yolu, yılanın yardımını gerektirir. Küçük Prens, veda eder ve yılan tarafından sokularak bedenini Dünya’da bırakır. Anlatıcı için Küçük Prens’in bedeni kaybolmuş olsa da ruhu gökyüzündeki yıldızlara dönmüştür. Anlatıcı, yıllar geçse de Küçük Prens’i unutamaz. Gökyüzüne her baktığında, onun gülüşünü hatırlar ve yıldızlara bakarken artık hep onun varlığını düşünür.`,
    },

    {
      id: "2",
      bookId: "101",
      title: "Küçük Prens",
      author: "Semanur Özkan Kurt",
      date: "04.05.2025",
      content: `Küçük Prens, Fransız yazar Antoine de Saint-Exupéry’nin hem çocuklara hem de yetişkinlere hitap eden, derin anlamlar içeren bir masal kitabıdır. Hikâye, anlatıcının çocukken çizdiği bir resmin büyükler tarafından anlaşılmamasıyla başlar. Çocukken sanatçı olmak isteyen anlatıcı, büyüklerin anlayışsızlığı yüzünden bu hayalinden vazgeçer ve pilot olur. Yıllar sonra uçağı Sahra Çölü’ne düşer ve burada, sarı saçlı, gizemli bir çocuk olan Küçük Prens ile karşılaşır. Küçük Prens, ondan bir koyun çizmesini ister. Bu isteğiyle anlatıcının hayatında özel bir yer edinmeye başlar.

    Küçük Prens, kendi gezegeni olan Asteroit B-612’de yaşar. Bu gezegen çok küçüktür ve üç yanardağ ile bir gül bulunur. Gül, çok güzel ama bir o kadar da kibirlidir. Küçük Prens, gülüyle ilgilenir, onu korur ve sever. Ancak gülün kaprisli davranışları Küçük Prens’i üzer ve bu yüzden gezegeninden ayrılmaya karar verir. Amacı, evrendeki başka gezegenleri keşfetmek ve bazı sorularına cevap bulmaktır.

    Yolculuğu sırasında farklı gezegenlere uğrar ve her birinde farklı bir yetişkinle tanışır. Bu yetişkinler aslında insan dünyasındaki bazı karakter özelliklerinin birer sembolüdür. Bir kral ile tanışır; bu kral, hükmedeceği kimse olmamasına rağmen sürekli emir verir. Sonra kendini beğenmiş biriyle karşılaşır; bu kişi sadece alkışlanmak ve övülmek ister. Ardından, içki içtiği için utanıp, utandığı için daha fazla içen bir ayyaş ile tanışır. Bu da mantıksız döngülere ve alışkanlıkların köleliğine bir eleştiridir. Bir diğer gezegende, yıldızlara sahip olduğunu sanan ve onları sayan bir iş adamı vardır. Sadece sayı ve sahip olmakla ilgilidir. Fenerci ise sürekli feneri yakıp söndürmek zorundadır çünkü gezegeni çok hızlı dönmektedir. Küçük Prens onu en anlamlı kişi olarak görür çünkü başkaları için bir şey yapan tek kişidir. Son olarak bir coğrafyacı ile tanışır. Ancak bu coğrafyacı, gezip görmek yerine sadece başkalarının anlattıklarını yazıya döker, yani bilgiyi eylemsiz şekilde toplar.

    Küçük Prens sonunda Dünya’ya gelir. Burada bir yılanla tanışır. Yılan, ölümün ve geçişin sembolüdür. Küçük Prens’e, isterse bir gün ona yardım ederek yıldızına dönmesini sağlayabileceğini söyler. Daha sonra Küçük Prens, çölde bir tilkiyle tanışır. Bu karşılaşma, onun hayatındaki en önemli dönüm noktalarından biri olur. Tilki, ona “evcilleştirmek” kavramını öğretir. Bu, bağ kurmak, birini özel kılmak demektir. Tilki’nin öğrettiği en önemli şey, “İnsan ancak yüreğiyle baktığında doğruyu görebilir. En önemli şeyler gözle görülmez.” sözüdür. Küçük Prens, bu sözle sevgiyi, sadakati ve sorumluluğu anlamaya başlar. Gülünün değerini, onunla kurduğu bağ sayesinde fark eder. O gül, evrende tek değildir ama onun için özeldir çünkü onu sevmektedir.

    Sonunda anlatıcının uçağı tamir olur. Küçük Prens ise kendi gezegenine dönmek ister. Dönüş yolu, yılanın yardımını gerektirir. Küçük Prens, veda eder ve yılan tarafından sokularak bedenini Dünya’da bırakır. Anlatıcı için Küçük Prens’in bedeni kaybolmuş olsa da ruhu gökyüzündeki yıldızlara dönmüştür. Anlatıcı, yıllar geçse de Küçük Prens’i unutamaz. Gökyüzüne her baktığında, onun gülüşünü hatırlar ve yıldızlara bakarken artık hep onun varlığını düşünür.`,
    },

    {
      id: "2",
      bookId: "101",
      title: "Küçük Prens",
      author: "Semanur Özkan Kurt",
      date: "04.05.2025",
      content: `Küçük Prens, Fransız yazar Antoine de Saint-Exupéry’nin hem çocuklara hem de yetişkinlere hitap eden, derin anlamlar içeren bir masal kitabıdır. Hikâye, anlatıcının çocukken çizdiği bir resmin büyükler tarafından anlaşılmamasıyla başlar. Çocukken sanatçı olmak isteyen anlatıcı, büyüklerin anlayışsızlığı yüzünden bu hayalinden vazgeçer ve pilot olur. Yıllar sonra uçağı Sahra Çölü’ne düşer ve burada, sarı saçlı, gizemli bir çocuk olan Küçük Prens ile karşılaşır. Küçük Prens, ondan bir koyun çizmesini ister. Bu isteğiyle anlatıcının hayatında özel bir yer edinmeye başlar.

    Küçük Prens, kendi gezegeni olan Asteroit B-612’de yaşar. Bu gezegen çok küçüktür ve üç yanardağ ile bir gül bulunur. Gül, çok güzel ama bir o kadar da kibirlidir. Küçük Prens, gülüyle ilgilenir, onu korur ve sever. Ancak gülün kaprisli davranışları Küçük Prens’i üzer ve bu yüzden gezegeninden ayrılmaya karar verir. Amacı, evrendeki başka gezegenleri keşfetmek ve bazı sorularına cevap bulmaktır.

    Yolculuğu sırasında farklı gezegenlere uğrar ve her birinde farklı bir yetişkinle tanışır. Bu yetişkinler aslında insan dünyasındaki bazı karakter özelliklerinin birer sembolüdür. Bir kral ile tanışır; bu kral, hükmedeceği kimse olmamasına rağmen sürekli emir verir. Sonra kendini beğenmiş biriyle karşılaşır; bu kişi sadece alkışlanmak ve övülmek ister. Ardından, içki içtiği için utanıp, utandığı için daha fazla içen bir ayyaş ile tanışır. Bu da mantıksız döngülere ve alışkanlıkların köleliğine bir eleştiridir. Bir diğer gezegende, yıldızlara sahip olduğunu sanan ve onları sayan bir iş adamı vardır. Sadece sayı ve sahip olmakla ilgilidir. Fenerci ise sürekli feneri yakıp söndürmek zorundadır çünkü gezegeni çok hızlı dönmektedir. Küçük Prens onu en anlamlı kişi olarak görür çünkü başkaları için bir şey yapan tek kişidir. Son olarak bir coğrafyacı ile tanışır. Ancak bu coğrafyacı, gezip görmek yerine sadece başkalarının anlattıklarını yazıya döker, yani bilgiyi eylemsiz şekilde toplar.

    Küçük Prens sonunda Dünya’ya gelir. Burada bir yılanla tanışır. Yılan, ölümün ve geçişin sembolüdür. Küçük Prens’e, isterse bir gün ona yardım ederek yıldızına dönmesini sağlayabileceğini söyler. Daha sonra Küçük Prens, çölde bir tilkiyle tanışır. Bu karşılaşma, onun hayatındaki en önemli dönüm noktalarından biri olur. Tilki, ona “evcilleştirmek” kavramını öğretir. Bu, bağ kurmak, birini özel kılmak demektir. Tilki’nin öğrettiği en önemli şey, “İnsan ancak yüreğiyle baktığında doğruyu görebilir. En önemli şeyler gözle görülmez.” sözüdür. Küçük Prens, bu sözle sevgiyi, sadakati ve sorumluluğu anlamaya başlar. Gülünün değerini, onunla kurduğu bağ sayesinde fark eder. O gül, evrende tek değildir ama onun için özeldir çünkü onu sevmektedir.

    Sonunda anlatıcının uçağı tamir olur. Küçük Prens ise kendi gezegenine dönmek ister. Dönüş yolu, yılanın yardımını gerektirir. Küçük Prens, veda eder ve yılan tarafından sokularak bedenini Dünya’da bırakır. Anlatıcı için Küçük Prens’in bedeni kaybolmuş olsa da ruhu gökyüzündeki yıldızlara dönmüştür. Anlatıcı, yıllar geçse de Küçük Prens’i unutamaz. Gökyüzüne her baktığında, onun gülüşünü hatırlar ve yıldızlara bakarken artık hep onun varlığını düşünür.`,
    },
  ],
};

const BookDetail = ({ book }) => {

  return (
    <div className={styles.bookDetail}>
      <div className={styles.bookInfo}>
        <div className={styles.imgContainer}>
          <div className={styles.image}>
          </div>

          <a href="">
            <button>Dinle</button>
          </a>
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.title}>
            <ul>
              <li>
              </li>
              <li>
              </li>
            </ul>
          </div>

          <div className={styles.features}>
            <dl>
              <dt>Süre</dt>
              <dd>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#5c5c5cff"
                  viewBox="0 0 18 18"
                >
                  <path
                    d="M9 .927A8.072 8.072 0 0 0 .927 9 8.072 8.072 0 0 0 9 17.073 8.072 8.072 0 0 0 17.073 9 8.072 8.072 0 0 0 9 .927ZM9 15.51A6.509 6.509 0 0 1 2.49 9 6.509 6.509 0 0 1 9 2.49 6.509 6.509 0 0 1 15.51 9 6.509 6.509 0 0 1 9 15.51Zm2.012-3.398-2.764-2.008a.393.393 0 0 1-.16-.316V4.443c0-.215.176-.39.391-.39h1.042c.215 0 .39.175.39.39v4.612l2.175 1.582a.39.39 0 0 1 .085.547l-.612.843a.393.393 0 0 1-.547.085Z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                {bookData.time}
              </dd>

              <dt>Dil</dt>
              <dd>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#5c5c5cff"
                  viewBox="0 0 18 18"
                >
                  <path d="M17.333 9A8.333 8.333 0 0 1 9 17.333 8.333 8.333 0 0 1 .667 9 8.333 8.333 0 0 1 9 .667 8.333 8.333 0 0 1 17.333 9ZM2.35 10.273l1.033.208c.256.052.52-.03.706-.215l.501-.501c.374-.404 1.012-.273 1.25.205l.303.602c.127.313.475.482.823.482.495 0 .85-.446.707-.921l-.192-.648a.78.78 0 0 1 .748-1.006h.075c.407 0 .843-.218 1.084-.58l.349-.523a.784.784 0 0 0-.027-.902l-.524-.7a.782.782 0 0 1 .437-1.227l.553-.166a.687.687 0 0 0 .537-.44l.53-1.331a6.788 6.788 0 0 0-2.271-.38C5.26 2.23 2.2 5.26 2.2 9c0 .436.07.863.149 1.273Zm12.979.172-.514.147a.516.516 0 0 1-.57-.218l-.065-.101c-.195-.306-.534-.521-.899-.521-.36 0-.729.215-.898.52l-.199.31c-.045.072-.107.133-.182.146l-1.207.684c-.56.329-.801 1.055-.554 1.67l.208.404c.28.625 1 .927 1.615.686l.11-.058c.33-.094.694-.042.977.163l.05.036a6.781 6.781 0 0 0 2.42-3.89.815.815 0 0 0-.292.022Zm-9.58 2.185 1.042.26a.517.517 0 0 0 .631-.378.517.517 0 0 0-.378-.631l-1.041-.26a.517.517 0 0 0-.632.377.517.517 0 0 0 .378.632Zm2.617-1.283a.517.517 0 0 0 .378.632.517.517 0 0 0 .631-.378l.26-1.042a.517.517 0 0 0-.377-.631.517.517 0 0 0-.632.377l-.26 1.042Zm2.774-6.748-.521 1.042a.52.52 0 0 0 .23.7.52.52 0 0 0 .7-.232l.521-1.041a.52.52 0 0 0-.23-.7.52.52 0 0 0-.7.231Z"></path>
                </svg>
                {bookData.language}
              </dd>

              <dt>Format</dt>
              <dd>
                {bookData.format.map((item) => {
                  return item === "audio" ? <FaHeadphonesAlt /> : "a";
                })}
              </dd>

              <dt>Kategori</dt>
              <dd>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#5c5c5cff"
                  viewBox="0 0 18 16"
                >
                  <path d="M15.481.5c1.022 0 1.852.829 1.852 1.852v11.111c0 1.021-.83 1.852-1.852 1.852H8.074a1.854 1.854 0 0 1-1.852-1.852V2.352C6.222 1.329 7.052.5 8.074.5h7.407ZM3.444 2.583a.694.694 0 1 1 1.39 0v10.649c0 .384-.31.694-.695.694a.693.693 0 0 1-.695-.694V2.583ZM.667 3.973a.694.694 0 1 1 1.388 0v7.87a.694.694 0 1 1-1.388 0v-7.87Z"></path>
                </svg>
                {bookData.category}
              </dd>
            </dl>
          </div>

          <div className={styles.content}>
            <p>{bookData.introduction}</p>
            {/* <p>
              Küçük Prens yıllardır beklenen Cemal Süreya ve Tomris Uyar
              çevirisiyle Can Çocuk Yayınlar'ında.
            </p> */}
            <p>{bookData.translatedBy}</p>
          </div>
        </div>
      </div>

      <div className={styles.tabContainer}>
        <div className={styles.tabs}>
          <button
            type="button"
            className={activeTab === "comments" ? styles.active : ""}
            onClick={() => setActiveTab("comments")}
          >
            Yorumlar ve Puanlamalar
          </button>
          <button
            type="button"
            className={activeTab === "summaries" ? styles.active : ""}
            onClick={() => setActiveTab("summaries")}
          >
            Özetler
          </button>
        </div>

        <div className={styles.tabContent}>
          {activeTab === "comments" && <Comments />}
          {activeTab === "summaries" && (
            <Summaries summaries={bookData.summaries} />
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
