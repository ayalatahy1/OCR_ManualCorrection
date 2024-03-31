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
      <Getimagetext setText={setText} setImage={setImage} setName={setName}/>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
          {image && (
            <div>
              <h2>Uploaded Image:</h2>
              <img src={image && URL.createObjectURL(image)} alt="Uploaded" style={{ maxWidth: '600px' }} />
            </div>
          )}
          
          <div>
              {text && (
                <div>
                  <h2>Tesseract Text:</h2>
                  <p contentEditable={true} onBlur={(e) => setText(e.target.innerText)}>{text}</p>
                  <button onClick={handleClick}>Save</button>
                  <button onClick={handleSuggestion}>Suggestions</button>
                </div>
              )}
              {suggestion && (
                <div>
                  <h2>GPT-3.5-turbo Suggestions:</h2>
                  <p>{suggestion}</p>
                </div>
              )}
        </div>

      </div>
    <ToastContainer />
    </div>
  );
}

export default App;
