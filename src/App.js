import { useEffect, useState } from 'react';
import './App.scss';
// import '../xml_daily.txt';

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

    const xmlString = '<?xml version="1.0" encoding="windows-1251"?><ValCurs Date="03.06.2021" name="Foreign Currency Market"><Valute ID="R01010"><NumCode>036</NumCode><CharCode>AUD</CharCode><Nominal>1</Nominal><Name>Австралийский доллар</Name><Value>56,7992</Value></Valute><Valute ID="R01020A"><NumCode>944</NumCode><CharCode>AZN</CharCode><Nominal>1</Nominal><Name>Азербайджанский манат</Name><Value>43,2595</Value></Valute><Valute ID="R01035"><NumCode>826</NumCode><CharCode>GBP</CharCode><Nominal>1</Nominal><Name>Фунт стерлингов Соединенного королевства</Name><Value>103,8893</Value></Valute><Valute ID="R01060"><NumCode>051</NumCode><CharCode>AMD</CharCode><Nominal>100</Nominal><Name>Армянских драмов</Name><Value>14,1160</Value></Valute><Valute ID="R01090B"><NumCode>933</NumCode><CharCode>BYN</CharCode><Nominal>1</Nominal><Name>Белорусский рубль</Name><Value>28,9818</Value></Valute><Valute ID="R01100"><NumCode>975</NumCode><CharCode>BGN</CharCode><Nominal>1</Nominal><Name>Болгарский лев</Name><Value>45,8131</Value></Valute><Valute ID="R01115"><NumCode>986</NumCode><CharCode>BRL</CharCode><Nominal>1</Nominal><Name>Бразильский реал</Name><Value>14,2673</Value></Valute><Valute ID="R01135"><NumCode>348</NumCode><CharCode>HUF</CharCode><Nominal>100</Nominal><Name>Венгерских форинтов</Name><Value>25,8663</Value></Valute><Valute ID="R01200"><NumCode>344</NumCode><CharCode>HKD</CharCode><Nominal>10</Nominal><Name>Гонконгских долларов</Name><Value>94,7199</Value></Valute><Valute ID="R01215"><NumCode>208</NumCode><CharCode>DKK</CharCode><Nominal>1</Nominal><Name>Датская крона</Name><Value>12,0480</Value></Valute><Valute ID="R01235"><NumCode>840</NumCode><CharCode>USD</CharCode><Nominal>1</Nominal><Name>Доллар США</Name><Value>73,4979</Value></Valute><Valute ID="R01239"><NumCode>978</NumCode><CharCode>EUR</CharCode><Nominal>1</Nominal><Name>Евро</Name><Value>89,6895</Value></Valute><Valute ID="R01270"><NumCode>356</NumCode><CharCode>INR</CharCode><Nominal>10</Nominal><Name>Индийских рупий</Name><Value>10,0496</Value></Valute><Valute ID="R01335"><NumCode>398</NumCode><CharCode>KZT</CharCode><Nominal>100</Nominal><Name>Казахстанских тенге</Name><Value>17,1562</Value></Valute><Valute ID="R01350"><NumCode>124</NumCode><CharCode>CAD</CharCode><Nominal>1</Nominal><Name>Канадский доллар</Name><Value>60,8527</Value></Valute><Valute ID="R01370"><NumCode>417</NumCode><CharCode>KGS</CharCode><Nominal>100</Nominal><Name>Киргизских сомов</Name><Value>87,0837</Value></Valute><Valute ID="R01375"><NumCode>156</NumCode><CharCode>CNY</CharCode><Nominal>1</Nominal><Name>Китайский юань</Name><Value>11,5074</Value></Valute><Valute ID="R01500"><NumCode>498</NumCode><CharCode>MDL</CharCode><Nominal>10</Nominal><Name>Молдавских леев</Name><Value>41,6419</Value></Valute><Valute ID="R01535"><NumCode>578</NumCode><CharCode>NOK</CharCode><Nominal>10</Nominal><Name>Норвежских крон</Name><Value>88,1714</Value></Valute><Valute ID="R01565"><NumCode>985</NumCode><CharCode>PLN</CharCode><Nominal>1</Nominal><Name>Польский злотый</Name><Value>20,0633</Value></Valute><Valute ID="R01585F"><NumCode>946</NumCode><CharCode>RON</CharCode><Nominal>1</Nominal><Name>Румынский лей</Name><Value>18,2133</Value></Valute><Valute ID="R01589"><NumCode>960</NumCode><CharCode>XDR</CharCode><Nominal>1</Nominal><Name>СДР (специальные права заимствования)</Name><Value>106,2067</Value></Valute><Valute ID="R01625"><NumCode>702</NumCode><CharCode>SGD</CharCode><Nominal>1</Nominal><Name>Сингапурский доллар</Name><Value>55,5120</Value></Valute><Valute ID="R01670"><NumCode>972</NumCode><CharCode>TJS</CharCode><Nominal>10</Nominal><Name>Таджикских сомони</Name><Value>64,4436</Value></Valute><Valute ID="R01700J"><NumCode>949</NumCode><CharCode>TRY</CharCode><Nominal>10</Nominal><Name>Турецких лир</Name><Value>85,1360</Value></Valute><Valute ID="R01710A"><NumCode>934</NumCode><CharCode>TMT</CharCode><Nominal>1</Nominal><Name>Новый туркменский манат</Name><Value>21,0294</Value></Valute><Valute ID="R01717"><NumCode>860</NumCode><CharCode>UZS</CharCode><Nominal>10000</Nominal><Name>Узбекских сумов</Name><Value>69,6015</Value></Valute><Valute ID="R01720"><NumCode>980</NumCode><CharCode>UAH</CharCode><Nominal>10</Nominal><Name>Украинских гривен</Name><Value>26,8869</Value></Valute><Valute ID="R01760"><NumCode>203</NumCode><CharCode>CZK</CharCode><Nominal>10</Nominal><Name>Чешских крон</Name><Value>35,2052</Value></Valute><Valute ID="R01770"><NumCode>752</NumCode><CharCode>SEK</CharCode><Nominal>10</Nominal><Name>Шведских крон</Name><Value>88,7324</Value></Valute><Valute ID="R01775"><NumCode>756</NumCode><CharCode>CHF</CharCode><Nominal>1</Nominal><Name>Швейцарский франк</Name><Value>81,6916</Value></Valute><Valute ID="R01810"><NumCode>710</NumCode><CharCode>ZAR</CharCode><Nominal>10</Nominal><Name>Южноафриканских рэндов</Name><Value>53,3638</Value></Valute><Valute ID="R01815"><NumCode>410</NumCode><CharCode>KRW</CharCode><Nominal>1000</Nominal><Name>Вон Республики Корея</Name><Value>66,0317</Value></Valute><Valute ID="R01820"><NumCode>392</NumCode><CharCode>JPY</CharCode><Nominal>100</Nominal><Name>Японских иен</Name><Value>66,9410</Value></Valute></ValCurs>';


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
