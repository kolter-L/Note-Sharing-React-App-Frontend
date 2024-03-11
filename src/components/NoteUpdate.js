import React, { useState } from "react";
import production from "../constants";

export default function PostUpdate(props) {

    const initialFormData = Object.freeze({
        title: props.post.title,
        content: props.post.content
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

        const postToUpdate = {
            id: props.post.id,
            title: FormData.title,
            content: FormData.content
        };

        const url = production.API_URL_UPDATE_POST;

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postToUpdate)
          })
          
          .then(response => response.json())
          .then(responseFromServer => {
            console.log(responseFromServer)
          })
          .catch((error) => {
            console.error("Fetch error:", error);
            alert("Failed to fetch data. Check console for details.");
          });

          props.onPostUpdated(postToUpdate);
    };

    return(
        <div>
            <form className="w-100 px-5">
                <h1 className="mt-5">Update Note</h1>

                <div className="mt-5">
                    <label className="h3 form-label">Note Title</label>
                    <input value={FormData.title} name="title" type="text" className="form-control" onChange={handleChange} />
                </div>

                <div className="mt-4">
                    <label className="h3 form-label">Note Content</label>
                    <input value={FormData.content} name="content" type="text" className="form-control" onChange={ handleChange} />
                </div>

                <button onClick={handleSubmit} className="btn btn-dark btn-large w-100">Submit</button>
                <button onClick={() => props.onPostUpdated(null)} className="btn btn-secondary btn-large w-100 mt-3">Cancel</button>

            </form>
        </div>
    )
}