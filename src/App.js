import { useEffect, useState } from 'react';
import './App.scss';
import { xmlData } from './xml_daily';

const fetchXml = async (url) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/xml'
      }
    });

    const responseText = await response.text();
    console.log('responseText', responseText);

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(responseText, "text/xml");

    return xmlDoc;
  }
  catch (err) {
    console.error(err);
  }
};

function App() {
  const [cash, setCash] = useState('')
  const [valute, setValute] = useState({})
  const [valutes, setValutes] = useState([])

  useEffect(async () => {

    // const hack = 'https://cors-anywhere.herokuapp.com/';
    // const xmlDoc = await fetchXml(hack + 'https://www.cbr.ru/scripts/xml_daily.asp')

    const xmlString = xmlData;


    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");

    const valutesHtml = xmlDoc.getElementsByTagName('Valute');
    const valutes = []
    for (let valute of valutesHtml) {
      let valuteObj = {};

      valuteObj.numCode = valute.getElementsByTagName('NumCode')[0].innerHTML;
      valuteObj.charCode = valute.getElementsByTagName('CharCode')[0].innerHTML;
      valuteObj.nominal = valute.getElementsByTagName('Nominal')[0].innerHTML;
      valuteObj.name = valute.getElementsByTagName('Name')[0].innerHTML;
      valuteObj.value = valute.getElementsByTagName('Value')[0].innerHTML;

      // console.log('obj', valuteObj);
      valutes.push(valuteObj);
    }

    console.log(valutes);
    setValutes(valutes)

    // const valutes = Array.from(valutesHtml)
  }, [valute])

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
            {valutes.map(valute => 
              <option value={valute.charCode}>{valute.name}</option>
            )}
          </select>

          <input className="form-input field" type="text" placeholder="Сумма в другой валюте" />
          {/* <button type="submit">Отправить форму</button> */}
        </form>
      </div>
    </div>
  );
}

export default App;
