
import './App.css';
import { useState, useEffect } from 'react';
import { BiSolidTrash } from "react-icons/bi";
import { BiPencil } from "react-icons/bi";
import { supabase } from './supabaseClient';



function App() {
  //const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsediting] = useState(false);
  const [edittedId, setEdittedID] = useState(0);
  //let completed = false;

  //Fetching initial data from db
  useEffect(() => {
    const fetchTodos = async () => {
      const {data, error} = await supabase.from('todos').select('*');
      if (error) {
        console.error('Error fetching toos:', error);
      } else {
        setTodos(data);
      }
    };

    fetchTodos();
  }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      const { data, error } = await supabase
        .from('todos')
        .update({name, content, date})
        .eq('id', edittedId)
        .select();

      if (error) {
        console.error('Error updating todo:', error);
      } else {
        setTodos(prev => prev.map(todo => (todo.id === edittedId ? data[0] : todo)));
        setIsediting(false);
      }
    } else {
      // add todo
      const { data, error } = await supabase
        .from('todos')
        .insert([{ name, content, date, completed: false }])
        .select();

      if (error) {
        console.error("Error adding todo:", error);
      } else {
        setTodos(prev => [...prev, ...data]);
      }
      // setId(id + 1); delete this code since supabase add id automatically
    }
    setName('');
    setDate('');
    setContent('');
  }

  const handleDelete = async (id) => {
    const { error } = await supabase.from('todos').delete().eq('id', id);

    if (error) {
      console.error("Error deleting todo:", error);
    } else {
      setTodos(prev => prev.filter(todo => todo.id !== id));
      // setTodos(data); this increases the request of server and difficult to handle error.
    }
  }

  const handleEdit = (todo) => {
    setIsediting(true);
    setName(todo.name);
    setDate(todo.date);
    setContent(todo.content);
    setEdittedID(todo.id);
  }

  const handleComplete = async (id) => {
    const todo = todos.find(todo => todo.id === id);

    if (!todo) return;

    const { error } = supabase
      .from('todos')
      .update({completed: !todo.completed})
      .eq('id', id);
    
    if (error) {
      console.error("Error task completion:", error);
    } else {
      setTodos(prev => prev.map(todo => (
          todo.id === id ? {...todo, completed: !todo.completed} : todo
        )
      ));
    }
  }

  return (
    <div className="App">
      <h1>Todo App</h1>
      <form onSubmit={handleSubmit}>
        <div className="left-section">
          <input type="text" id="todo-name" name="name" placeholder="Add your name" required value={name} onChange={e => setName(e.target.value)} autoComplete="name"></input>
          <input type="text" id="todo-content" name="content" placeholder="Add content" required value={content} onChange={e => setContent(e.target.value)} autoComplete="off"></input>
          <input type="date" id="todo-date" name="date" value={date} onChange={e => setDate(e.target.value)}></input>
        </div>
        <div className="left-section">
          <button type="submit">{isEditing ? "Edit" : "Add"}</button>
        </div>
      </form>
      <div id="content">

          {todos.map((todo, index) => {
            return (
              <div className="card" key={index} >
                <div className="left-section">
                  <input type="checkbox" id={`${index}-check`} name="check" checked={todo.completed} onChange={() => handleComplete(todo.id)}></input>
                  <span className={todo.completed ? "completed" : ""}><strong>{todo.name}：</strong> {todo.content} [{todo.date}]</span>
                </div>
                <div className="right-section">
                  <button className="buttonIcon" onClick={() => handleEdit(todo)} disabled={isEditing}><BiPencil /></button>
                  <button className="buttonIcon" onClick={() => handleDelete(todo.id)} disabled={isEditing}><BiSolidTrash /></button>
                </div>
              </div>
          )}
          )}
        
      </div>
      
    </div>
  );
}

export default App;
