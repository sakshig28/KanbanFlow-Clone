import React from 'react';
import Card from './Card';
import Dropdown from './Dropdown';
import { useDrop, useDrag } from 'react-dnd';

const List = ({ list, cards, onCardDrop, onCreateCard, onDeleteColumn, onUpdateCardContent, onListDrop, onDeleteCard }) => {
  const [, cardDrop] = useDrop({
    accept: 'CARD',
    drop: (item) => onCardDrop(item.cardId, list.id),
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'LIST',
    item: { listId: list.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, listDrop] = useDrop({
    accept: 'LIST',
    drop: (item) => onListDrop(item.listId, list.id),
  });

  return (
    <div ref={drag} className={`list ${isDragging ? 'dragging' : ''}`}>
      <div ref={listDrop} className="list1"> 
      <div ref={cardDrop} className="list1">
        <h5 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>{list.title}
        <Dropdown>
          <button class="dropdown-item" type="button" onClick={() => onDeleteColumn(list.id)}>Delete Column</button>
        </Dropdown>
        </h5>
        {cards.map((card) => (
          <Card key={card.id} card={card} onUpdateCardContent={onUpdateCardContent} onDeleteCard={onDeleteCard} // Pass the onDeleteCard function to the Card component
          />
        ))}
        <button onClick={() => onCreateCard(list.id)}>Add New Card</button>
        </div>
      </div>
    </div>
  );
};

export default List;
