import { useEffect, useState } from 'react';
import './App.css';

function createIframe(name, src) {
    const iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.name = name;
    // iframe.style.display = 'none';
    document.body.append(iframe);
    return iframe;
}


/**
 * Отправляет data по url методом Post
 **/
function iframePost(url) {
  return new Promise((resolve, reject) => {
    const iframeName = Math.random();
    const iframe = createIframe(iframeName, url);
    console.log(iframe);

    iframe.onload = () => {
      try {

        console.log(iframe);
        const data = iframe.contentDocument.body.innerHTML;
        console.log(data);
        return resolve(data);
      }
      catch {
        return reject(new Error('Ошибка загрузки данных!'));
      }
    }

    // postToIframe(url, data, iframeName);

    const timeoutReject = setTimeout(() => {
      reject(new Error('Превышено время ожидания'))
    }, 10000)
  })
}
const fetchXml = async (url) => {
  try {
    // url = 'https://jsonplaceholder.typicode.com/todos/1';
    const response = await fetch(url, {
      // crossDomain: true,
      method: 'POST',
      // mode: 'no-cors',
      headers: {
        'Content-Type': 'application/xml'
      }
    });

    const responseText = await response.text();
    console.log('responseText', responseText);
    
  }
  catch (err) {
    console.error(err);
  }
};

function App() {
  const [cash, setCash] = useState('')
  const [valute, setValute] = useState('')

  useEffect(() => {
    fetchXml('https://cors-anywhere.herokuapp.com/https://www.cbr.ru/scripts/xml_daily.asp')
  })

  const handleInput = event => {
    setCash(event.target.value)
  }

  const handleSelect = event => {
    setValute(event.target.value)
  }
  
  const handleSubmit = event => {
    event.preventDefault();
    console.log('form value', cash, valute);
  }

  return (
    <div className="App">
      <header className="App-header tac">
        Конвертер валют на React
      </header>

      <div className="form-wrapper">
        <form className="test-form" onSubmit={handleSubmit}>
          <input className="form-input field" value={cash} onChange={handleInput} type="text" placeholder="Сумма в рублях" />

          <select className="form-select field" value={valute} onChange={handleSelect}>
            <option value="grapefruit">Грейпфрут</option>
            <option value="lime">Лайм</option>
            <option value="coconut">Кокос</option>
            <option value="mango">Манго</option>
          </select>

          <button type="submit">Отправить форму</button>
        </form>
        {/* <iframe title='valute_frame' name='valute_frame' src="https://cors-anywhere.herokuapp.com/https://www.cbr.ru/scripts/xml_daily.asp"></iframe> */}
      </div>
    </div>
  );
}

export default App;
