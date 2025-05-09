import { useNavigate } from "react-router-dom";
import styles from "./summaryDetail.module.scss";

const data = {
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
};

const SummaryDetail = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.detailContainer}>
      <div className={styles.detailContent}>
        <div className={styles.header}>
          <h1>{data.title}</h1>
        </div>

        <div className={styles.meta}>
          <span>Yazar: {data.author}</span>
          <span>{data.date}</span>
        </div>
        <p className={styles.content}>{data.content}</p>

        <button onClick={() => navigate(-1)} className={styles.backButton}>
          ← Geri Dön
        </button>
      </div>
    </div>
  );
};

export default SummaryDetail;
