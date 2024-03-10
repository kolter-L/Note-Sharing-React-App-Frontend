import React, { useState } from "react";
import production from "../constants";

export default function PostCreate(props) {

    const initialFormData = Object.freeze({
        title: "Note x",
        content: "This is post x, and it is super scrummy"
    });

    const [FormData, setFormData]= useState(initialFormData);

    const handleChange = (e) => {
        setFormData({
            ...FormData, 
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const postToCreate = {
            id: 0,
            title: FormData.title,
            content: FormData.content
        };

        const url = production.API_URL_CREATE_POST;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postToCreate)
          })
          
          .then(response => response.json())
          .then(responseFromServer => {
            console.log(responseFromServer)
          })
          .catch((error) => {
            console.error("Fetch error:", error);
            alert("Failed to fetch data. Check console for details.");
          });

          props.onPostCreated(postToCreate);
    };

    return(
        <div>
            <form className="w-100 px-5">
                <h1 className="mt-5">Create New Note</h1>

                <div className="mt-5">
                    <label className="h3 form-label">Note Title</label>
                    <input value={FormData.title} name="title" type="text" className="form-control" onChange={handleChange} />
                </div>

                <div className="mt-4">
                    <label className="h3 form-label">Note Content</label>
                    <input value={FormData.content} name="content" type="text" className="form-control" onChange={ handleChange} />
                </div>

                <button onClick={handleSubmit} className="btn btn-dark btn-large w-100">Submit</button>
                <button onClick={() => props.onPostCreated} className="btn btn-secondary btn-large w-100 mt-3">Cancel</button>

            </form>
        </div>
    )
}