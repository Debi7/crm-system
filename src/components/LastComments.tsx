import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../styles.module.css';

// Этот интерфейс используется в компоненте LastComments для отображения данных комментариев в пользовательском интерфейсе
interface Comment {
  id: number;
  designerAvatar?: string;
  userName?: string;
  relativeTime?: string;
  task?: string;
  message: string;
  // Дополнительные поля, если необходимо
}

interface LastCommentsProps {
  comments: Comment[];
}

const LastComments: React.FC<LastCommentsProps> = ({ comments }) => {
  const { t } = useTranslation();

  const lastComments = comments.slice(-10);

  return (
    <>
      <h2 className={styles.lastComments__heading}>{t('lastComments.title')}</h2>
      <div className={styles.lastComments__wrapper}>
        {lastComments.map((comment) => (
          <div key={comment.id}>
            <img src={comment.designerAvatar} alt="avatar" />
            <span>{comment.userName}</span>
            <span>{comment.relativeTime}</span>
            <span>{comment.task}</span>
            <span>{comment.message}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default LastComments;
