import {useState, useEffect} from 'react';
import TextBox from './components/TextBox'
import Arrows from './components/Arrows'
import Button from './components/Button'
import Modal from './components/Modal'
import axios from 'axios'

const App = () => {
  const [inputLanguage, setInputLanguage] = useState('English');
  const [outputLanguage, setOutputLanguage] = useState('Arabic');
  const [showModal, setShowModal] = useState(null);
  const [languages, setLanguages] = useState(null);
  const [textToTranslate, setTextToTranslate] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const getLanguages = () => {
    var options = {
      method: 'GET',
      url: 'https://google-translate20.p.rapidapi.com/languages',
      headers: {
        'X-RapidAPI-Host': 'google-translate20.p.rapidapi.com',
        'X-RapidAPI-Key': '8d0226c163msha8f759716b439e7p11dd28jsn11fce3ee060e'
      }
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data);
      const dataArray = Object.keys(response.data.data).map(key => response.data.data[key]);
      setLanguages(dataArray);
    }).catch(function (error) {
      console.error(error);
    });
  }

  const translate = () => {

    const options = {
      method: 'GET',
      url: 'https://google-translate20.p.rapidapi.com/translate',
      params: {
        text: textToTranslate,
        tl: outputLanguage,
        sl: inputLanguage
      },
      headers: {
        'X-RapidAPI-Host': 'google-translate20.p.rapidapi.com',
        'X-RapidAPI-Key': '8d0226c163msha8f759716b439e7p11dd28jsn11fce3ee060e'
      }
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
      setTranslatedText(response.data.data.translation);
    }).catch(function (error) {
      console.error(error);
    });
  }

  useEffect(() => {
    getLanguages();
  }, [])

  const handleClick = () => {
    setInputLanguage(outputLanguage);
    setOutputLanguage(inputLanguage);
  }

  return (
    <div className="app">
      {!showModal && <>
        <TextBox 
          style="input" 
          selectedLanguage={inputLanguage} 
          setShowModal={setShowModal}
          setTextToTranslate={setTextToTranslate}
          textToTranslate={textToTranslate}
          setTranslatedText={setTranslatedText}
        />
        <div className="arrow-container" onClick={handleClick}>
          <Arrows/>
        </div>
        <TextBox 
          style="output" 
          selectedLanguage={outputLanguage} 
          setShowModal={setShowModal} 
          translatedText={translatedText}
          setTranslatedText={setTranslatedText}
        />
        <div className="button-container" onClick={translate}>
          <Button/>
        </div>
      </>}

      {showModal && 
      <Modal 
        setShowModal={setShowModal} 
        languages={languages} 
        chosenLanguage={showModal == 'input' ? inputLanguage : outputLanguage}
        setChosenLanguage={showModal == 'input' ? setInputLanguage : setOutputLanguage}
      />}
    </div>
  );
}

export default App;
