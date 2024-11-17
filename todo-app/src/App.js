
import './App.css';
import { useState } from 'react';
import { BiSolidTrash } from "react-icons/bi";
import { BiPencil } from "react-icons/bi";



function App() {
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsediting] = useState(false);
  const [edittedId, setEdittedID] = useState(0);
  let completed = false;
  

  function handleSubmit(e) {
    e.preventDefault();
    if (isEditing) {
      setTodos(todos.map(todo => {
        if(todo.id === edittedId) {
          return ({...todo, name, content, date});
        }
        return todo;
      }));
      setIsediting(false);
    } else {
      setTodos([
        ...todos,
        {
          id: id,
          name: name,
          content: content,
          date: date,
          completed: completed,
        }
      ]);
      setId(id + 1);
    }
    setName('');
    setDate('');
    setContent('');
  }

  function handleDelete(id) {
    setTodos(todos.filter(todo => todo.id !== id));
    console.log("test");
  }

  function handleEdit(todo) {
    setIsediting(true);
    setName(todo.name);
    setDate(todo.date);
    setContent(todo.content);
    setEdittedID(todo.id);
  }

  function handleComplete(id) {
    setTodos(todos => todos.map(todo => {
      if(todo.id === id) {
        return ({...todo, completed: !todo.completed});
      }
      return todo;
    }));
  }

  return (
    <div className="App">
      <h1>Todo App</h1>
      <form onSubmit={handleSubmit}>
        <div className="left-section">
          <input type="text" placeholder="Add your name" required value={name} onChange={e => setName(e.target.value)}></input>
          <input type="text" placeholder="Add content" required value={content} onChange={e => setContent(e.target.value)}></input>
          <input type="date" value={date} onChange={e => setDate(e.target.value)}></input>
        </div>
        <div className="left-section">
          <button type="submit">{isEditing ? "Edit" : "Submit"}</button>
        </div>
      </form>
      <div id="content">

          {todos.map((todo, index) => {
            return (
              <div className="card" key={index} >
                <div className="left-section">
                  <input type="checkbox" checked={todo.completed} onClick={() => handleComplete(todo.id)}></input>
                  <span　className={todo.completed ? "completed" : ""}><strong>{todo.name}</strong> {todo.content} {todo.date}</span>
                </div>
                <div className="right-section">
                  <button class="buttonIcon" onClick={() => handleEdit(todo)} disabled={isEditing}><BiPencil /></button>
                  <button class="buttonIcon" onClick={() => handleDelete(todo.id)} disabled={isEditing}><BiSolidTrash /></button>
                </div>
              </div>
          )}
          )}
        
      </div>
      
    </div>
  );
}

export default App;
