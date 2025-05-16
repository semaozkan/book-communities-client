import styles from "./messages.module.scss";
import MessageModal from "./../../components/MessageModal/MessageModal";
import MessagePreviewCard from "../../components/messagePreviewCard/MessagePreviewCard";
import { useState } from "react";

const Messages = () => {
  const [activeCardId, setActiveCardId] = useState(null);

  return (
    <div className={styles.messages}>
      <div className={styles.messagesContainer}>
        <div className={styles.header}>
          <p>Mesajlaşma</p>
        </div>

        <div className={styles.content}>
          <div className={styles.messagePreview}>
            <MessagePreviewCard
              isActive={activeCardId === 1}
              onClick={() => setActiveCardId(1)}
            />
            <MessagePreviewCard
              isActive={activeCardId === 2}
              onClick={() => setActiveCardId(2)}
            />
            <MessagePreviewCard
              isActive={activeCardId === 3}
              onClick={() => setActiveCardId(3)}
            />
            <MessagePreviewCard
              isActive={activeCardId === 3}
              onClick={() => setActiveCardId(3)}
            />
            <MessagePreviewCard
              isActive={activeCardId === 3}
              onClick={() => setActiveCardId(3)}
            />
            <MessagePreviewCard
              isActive={activeCardId === 3}
              onClick={() => setActiveCardId(3)}
            />
            <MessagePreviewCard
              isActive={activeCardId === 3}
              onClick={() => setActiveCardId(3)}
            />
            {/* <MessagePreviewCard
              isActive={activeCardId === 3}
              onClick={() => setActiveCardId(3)}
            />
            <MessagePreviewCard
              isActive={activeCardId === 3}
              onClick={() => setActiveCardId(3)}
            />
            <MessagePreviewCard
              isActive={activeCardId === 3}
              onClick={() => setActiveCardId(3)}
            />
            <MessagePreviewCard
              isActive={activeCardId === 3}
              onClick={() => setActiveCardId(3)}
            />
            <MessagePreviewCard
              isActive={activeCardId === 3}
              onClick={() => setActiveCardId(3)}
            /> */}
          </div>
          <div className={styles.messageContent}>
            <MessageModal customStyle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
