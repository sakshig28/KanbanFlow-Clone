import React, { useState } from 'react';
import { useDrag } from 'react-dnd';

const Card = ({ card, onCardDrop, onUpdateCardContent }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: { cardId: card.id, listId: card.listId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(card.content);

  const handleSave = () => {
    onUpdateCardContent(card.id, content);
    setIsEditing(false);
  };

  return (
    <div ref={drag} className={`card ${isDragging ? 'dragging' : ''}`}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <div onClick={() => setIsEditing(true)}>{card.content}</div>
        </>
      )}
    </div>
  );
};

export default Card;
