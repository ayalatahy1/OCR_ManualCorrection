import React from 'react';
import axios from "axios";

function Getimagetext({setText,setImage,setName}){


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
       
  
}


return(

<form onSubmit={HandleSubmit}>
    <label>Image to convert</label>
    <input  type="file" accept="image/*" onChange={HandleChange}/>
    <button type="submit">Submit</button>
</form>

);

}

export default Getimagetext;