import React, { useState } from 'react';
import Input from './components/Input';
import Todo from './components/Todo';

const App = () => {
  const [list, setList] = useState([]); // Initialize state for the list

  // Function to add an item to the list
  const addToList = (input) => {
    if (input.trim()) {
      setList((prevList) => [...prevList, input.trim()]);
    }
  };

  // Function to delete an item from the list
  const deleteFromList = (index) => {
    setList((prevList) => prevList.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center p-4">
      {/* Input Component */}
      <Input onAdd={addToList} />

      {/* Header */}
      <h1 className="text-3xl font-bold text-blue-600 my-4">TODO List</h1>
      <hr className="w-full border-gray-300 mb-4" />

      {/* Todo Items */}
      {list.length > 0 ? (
        <div className="w-full space-y-2">
          {list.map((item, i) => (
            <Todo 
              key={item + i} // Use a more unique key
              index={i} 
              task={item} 
              onDelete={deleteFromList} 
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Your todo list is empty. Add a task above!</p>
      )}
    </div>
  );
};

export default App;
