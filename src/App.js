import { useState } from 'react';
import './App.css';
import { foo } from "./typetest.ts";

function App() {
  const [input, setInput] = useState('')
  const [textarea, setTextarea] = useState('')

  const handleInput = event => {
    setInput(event.target.value)
  }

  const handleTextarea = event => {
    setTextarea(event.target.value)
  }
  
  const handleSubmit = event => {
    event.preventDefault();
    console.log('form value', input, textarea);
    foo(input);
  }

  return (
    <div className="App">
      <header className="App-header tac">
        Простая форма на React
      </header>

      <div className="form-wrapper">
        <form className="test-form" onSubmit={handleSubmit}>
          <input className="test-form-input field" value={input} onChange={handleInput} type="text" placeholder="Введите текст" />
          <textarea className="test-form-textare field" value={textarea} onChange={handleTextarea} placeholder="Тут тоже можно что-то ввести" />
          <button type="submit">Отправить форму</button>
        </form>
      </div>
    </div>
  );
}

export default App;
