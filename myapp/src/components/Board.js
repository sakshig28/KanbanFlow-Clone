import React, { useState, useEffect } from 'react';
import List from './List';
import Save from "./Save";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { v4 as uuidv4 } from 'uuid';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

const Board = () => {
  const [lists, setLists] = useState([
    { id: uuidv4(), title: 'Todo', cards: [] },
    { id: uuidv4(), title: 'In Progress', cards: [] },
    { id: uuidv4(), title: 'Done', cards: [] },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const listsCollection = collection(db, 'lists');
        const querySnapshot = await getDocs(listsCollection);
        const fetchedLists = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLists(fetchedLists);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      // Perform any cleanup if necessary
    };
  }, []);

  const handleCardDrop = (cardId, targetListId) => {
    setLists((prevLists) => {
      const updatedLists = [...prevLists];

      // Find the source list and card
      const sourceList = updatedLists.find((list) =>
        list.cards.find((card) => card.id === cardId)
      );
      const sourceCard = sourceList.cards.find((card) => card.id === cardId);

      // Remove the card from the source list
      sourceList.cards = sourceList.cards.filter((card) => card.id !== cardId);

      // Find the target list
      const targetList = updatedLists.find((list) => list.id === targetListId);

      // Add the card to the target list
      targetList.cards.push(sourceCard);
      console.log(updatedLists)
      return updatedLists;
    });
  };
  const handleListDrop = (sourceListId, targetListId) => {
    setLists((prevLists) => {
      const updatedLists = [...prevLists];
      const sourceIndex = updatedLists.findIndex((list) => list.id === sourceListId);
      const targetIndex = updatedLists.findIndex((list) => list.id === targetListId);
      const [removed] = updatedLists.splice(sourceIndex, 1);
      updatedLists.splice(targetIndex, 0, removed);
      console.log(updatedLists)
      return updatedLists;
    });
  };

  const handleCreateCard = (listId) => {
    setLists((prevLists) => {
      const updatedLists = prevLists.map((list) => {
        if (list.id === listId) {
          return {
            ...list,
            cards: [
              ...list.cards,
              {
                id: uuidv4(),
                content: 'New Card',
                listId,
              },
            ],
          };
        }
        return list;
      });

      return updatedLists;
    });
  };

  const handleDeleteColumn = (columnId) => {
    setLists((prevLists) => prevLists.filter((list) => list.id !== columnId));
  };

  const handleUpdateCardContent = (cardId, newContent) => {
    setLists((prevLists) => {
      const updatedLists = [...prevLists];

      // Find the list that contains the card
      const list = updatedLists.find((list) =>
        list.cards.find((card) => card.id === cardId)
      );

      // Find the card and update its content
      const card = list.cards.find((card) => card.id === cardId);
      card.content = newContent;

      return updatedLists;
    });
  };

  const addColumn = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewColumnTitle('');
  };

  const handleConfirmModal = () => {
    if (newColumnTitle.trim() !== '') {
      const newColumn = {
        id: uuidv4(),
        title: newColumnTitle.trim(),
        cards: [],
      };
      setLists((prevLists) => [...prevLists, newColumn]);
      setShowModal(false);
      setNewColumnTitle('');
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="board">
        {lists.map((list) => (
          <List
            key={list.id}
            list={list}
            cards={list.cards}
            onCardDrop={handleCardDrop}
            onCreateCard={handleCreateCard}
            onDeleteColumn={handleDeleteColumn}
            onUpdateCardContent={handleUpdateCardContent}
            onListDrop={handleListDrop}
          />
        ))}
        <button onClick={addColumn}>Add Another List</button>
        <Save lists={lists} />
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <input
                type="text"
                value={newColumnTitle}
                onChange={(e) => setNewColumnTitle(e.target.value)}
              />
              <div>
                <button onClick={handleConfirmModal}>Add List</button>
                <button className="close" onClick={handleCloseModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default Board;
