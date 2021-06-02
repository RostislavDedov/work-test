import { useEffect, useState } from 'react';
import './App.scss';
import { xmlData } from './xml_daily';

const fetchXml = async (url) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/xml; charset=UTF-8'
      }
    });

    const responseText = await response.text();
    // console.log('responseText', responseText);

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(responseText, "text/xml");

    return xmlDoc;
  }
  catch (err) {
    console.error(err);
  }
};

function App() {
  const [cash, setCash] = useState(0)
  const [valute, setValute] = useState({})
  const [result, setResult] = useState(0)
  const [valutes, setValutes] = useState([])

  useEffect(async () => {
    // это то, что хотелось бы, чтобы работало
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
      valuteObj.value = Number.parseFloat(valute.getElementsByTagName('Value')[0].innerHTML.replace(",", "."));

      valutes.push(valuteObj);
    }

    setValutes(valutes)
    setValute(valutes[0])
  }, [])

  useEffect(() => {
    setResult(cash * valute.value);
  }, [cash, valute, valutes])

  const handleInput = event => {
    if (Number(event.target.value)) {
      setCash(+event.target.value)
    }
    if (event.target.value == '') {
      setCash(0);
    }
  }

  const handleSelect = event => {
    setValute(valutes.find(el => el.charCode == event.target.value))
  }
  
  const handleSubmit = event => {
    event.preventDefault();
  }

  return (
    <div className="App">
      <header className="App-header tac">
        Конвертер валют на React
      </header>

      <div className="form-wrapper">
        <form className="test-form" onSubmit={handleSubmit}>
          <input className="form-input field" value={cash} onChange={handleInput} type="text" placeholder="Сумма в рублях" />

          <select className="form-select field" value={valute.charCode} onChange={handleSelect}>
            {valutes.map(valute => 
              <option value={valute.charCode}>{valute.name}</option>
            )}
          </select>

          <input className="form-input field" readOnly type="text" value={result} placeholder="Сумма в другой валюте" />
        </form>
      </div>
    </div>
  );
}

export default App;
