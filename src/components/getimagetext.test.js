import React from 'react';
import {render, screen, fireEvent, act} from '@testing-library/react';
import axios from 'axios';
import Getimagetext from './getimagetext';
test("test the form appears", ()=>{

    render(<Getimagetext/>);
    const inputElement= screen.getByLabelText('Image to convert');
    const button= screen.getByText('Submit');
    expect(inputElement).toBeInTheDocument();
    expect(button).toBeInTheDocument();
})

test("Submitting image and getting text", async()=>{
    const mockResponse={data:{text: 'dummy text'}};
    axios.post.mockResponse(mockResponse);
    render(<Getimagetext/>);
    const file= new File(['Dummy image'], 'text.png',{type: 'image/png'});
    const inputElement= screen.getByLabelText('Image to convert');
    fireEvent.change(inputElement,{target:{files:[file]}});

    const submitButton=screen.getByText('submit');
    fireEvent.click(submitButton);
    await act(async()=>{
        await Promise.resolve();
    });

    expect(axios.post).toHaveBeenCalledWith('http://127.0.0.1:5000/text', expect.any(FormData),{ headers: {
        'Content-Type': 'multipart/form-data',
      }});

    const textElement= screen.getByText('dummy text');
    expect(textElement).toBeInTheDocument();
})