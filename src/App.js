import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import {useState} from 'react'
import './App.css';
import Getimagetext from './components/getimagetext';
import axios from 'axios';

function App() {
  const [image,setImage]=useState(null);
  const [text, setText]=useState('');
  const [text2, setText2]=useState('');
  const [name,setName]=useState('');
  const [suggestion,setSuggestion]=useState('');

  const handleClick=async (event)=>{
    const data={
      "text":text,
      "name":name
    }
    const response= await axios.post('http://127.0.0.1:5000/update',data,{
      headers: {
        'Content-Type': 'application/json'
      }
    });
    toast.success(response.data.response);
    
  }
  const handleSuggestion=async ()=>{
        const response= await axios.post('http://127.0.0.1:5000/suggestion',{"text":text},{
          headers: {
            'Content-Type': 'application/json'
          }
        });
        setSuggestion(response.data.suggestion);

  }
  return (
    <div className="App">
      <div className="background-image"></div>
      <Getimagetext setText={setText} setText2={setText2} setImage={setImage} setName={setName}/>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
          {image && (
            <div>
              <h2 style={{ color: 'rgb(21, 170, 21)' }} >Uploaded Image:</h2>
              <img src={image && URL.createObjectURL(image)} alt="Uploaded" style={{ maxWidth: '600px' }} />
            </div>
          )}
          
          <div>
              {text && (
                <div>
                  <h2 style={{ color: 'rgb(21, 170, 21)' }}>Tesseract Text:</h2>
                  <p contentEditable={true} onBlur={(e) => setText(e.target.innerText)} >{text}</p>
                  <button className="App-button"onClick={handleClick}>Save</button>
                  <button className="App-button" onClick={handleSuggestion}>Suggestions</button>
                </div>
              )}
              {text2 && (
                <div>
                  <h2 style={{ color: 'rgb(21, 170, 21)' }}>Paddle Text:</h2>
                  <p contentEditable={true} onBlur={(e) => setText2(e.target.innerText)} >{text2}</p>
                  <button className="App-button"onClick={handleClick}>Save</button>
                  <button className="App-button" onClick={handleSuggestion}>Suggestions</button>
                </div>
              )}
              {suggestion && (
                <div>
                  <h2 style={{ color: 'rgb(21, 170, 21)' }}>GPT-3.5-turbo Suggestions:</h2>
                  <p className="App-paragraph">{suggestion}</p>
                </div>
              )}
        </div>

      </div>
    <ToastContainer />
    </div>
  );
}

export default App;
