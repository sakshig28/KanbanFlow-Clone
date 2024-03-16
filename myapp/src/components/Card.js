import React, { useState } from 'react';
import { useDrag } from 'react-dnd';

const Card = ({ card, onCardDrop, onUpdateCardContent, onDeleteCard }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: { cardId: card.id, listId: card.listId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(card.content);
  const [showConfirmation, setShowConfirmation] = useState(false);


  const handleSave = () => {
    const trimmedContent = content.trim();
    if (trimmedContent !== '') {
      onUpdateCardContent(card.id, trimmedContent);
      setIsEditing(false);
    } else {
      alert('Content cannot be blank!');
    }
  };

  const handleDelete = () => {
    onDeleteCard(card.id);
  };

  const confirmDelete = () => {
    onDeleteCard(card.id);
    setShowConfirmation(false);
  };

  return (
    <div ref={drag} className={`card ${isDragging ? 'dragging' : ''}`}>
      {showConfirmation ? (
        <div>
          <p>Are you sure you want to delete this card?</p>
          <button onClick={confirmDelete}>Yes</button>
          <button onClick={() => setShowConfirmation(false)}>No</button>
        </div>
      ) : (
        <>
          {isEditing ? (
            <>
              <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
              <button onClick={handleDelete}>Delete</button>
            </>
          ) : (
            <>
              <div onClick={() => setIsEditing(true)}>{card.content}</div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Card;