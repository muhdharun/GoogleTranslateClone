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

  const getLanguages = async () => {
    const response = await axios('http://localhost:8000/languages');
    setLanguages(response.data);
  }

  const translate = async () => {
    const data = {
      textToTranslate, outputLanguage, inputLanguage
    }
    const response = await axios('http://localhost:8000/translate', {
      params: data
    });
    setTranslatedText(response.data);

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
