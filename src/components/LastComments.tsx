import React from 'react';

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
  const lastComments = comments.slice(-10);

  return (
    <div>
      <h2>Последние 10 комментариев</h2>
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
  );
};

export default LastComments;
