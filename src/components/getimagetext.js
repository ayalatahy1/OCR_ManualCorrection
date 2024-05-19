import React from 'react';
import axios from "axios";
import './getimagetext.css';

function Getimagetext({setText,setText2,setImage,setName}){


const HandleChange= (event)=>{ 
  
    setImage(event.target.files[0]);
    setName(event.target.files[0].name)
}

const HandleSubmit=async (event)=>{

    event.preventDefault()
    const formData= new FormData();
    formData.append("file", event.target[0].files[0]);
    
   
    const response = await axios.post('http://127.0.0.1:5000/text', formData, {
        headers: {
        'Content-Type': 'multipart/form-data'
        }
    });
      
    setText(response.data.text);
    
    const response2 = await axios.post('http://127.0.0.1:5000/text2', formData, {
        headers: {
        'Content-Type': 'multipart/form-data'
        }
    });
    
      
    setText2(response2.data.text);

       
  
}


return(

<form className="image-form" onSubmit={HandleSubmit}>
    <label className="upload-label">Image To Convert</label>
    <input className="file-input" type="file" accept="image/*" onChange={HandleChange}/>
    <button className="submit-button" type="submit">Submit</button>
</form>

);

}

export default Getimagetext;