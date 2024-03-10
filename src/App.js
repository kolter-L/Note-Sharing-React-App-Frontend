import React, { useState } from "react";
import production from "./constants";


function App() {

  const [posts, setPosts] = useState([]);

  // test function to get all posts from the API

  function getPosts() {
    const url = production.API_URL_GET_ALL_POSTS;
  
    fetch(url, {
      method: 'GET'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then(noteFromServer => {
      console.log(noteFromServer);
      setPosts(noteFromServer);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      alert("Failed to fetch data. Check console for details.");
    });
  }

  return (
    <div className="container">
      <h1>greetings, human</h1>

      <div className="mt-5">
        <button onClick={getPosts} className="btn btn-dark btn-large w-100">Get The Notes</button>
      </div>

      {posts.length > 0 && renderTable()}

    </div>
  );

  function renderTable() {
    return (
      <div className="table-responsive mt-5">
        <table className="table table-bordered border-dark">
          <thead>
            <tr>
              <th scope='col'>Id</th>
              <th scope='col'>Title</th>
              <th scope='col'>Content</th>
              <th scope='col'>CRUD Operation</th>
            </tr>
          </thead>

          <tbody>
           {posts.map((post) => (

              <tr key={post.id}>
                <th scope="row">{post.id}</th>
                <td>{post.title}</td>
                <td>{post.content}</td>
                <td>
                  <button className="btn btn-dark btn-large mx-3 my-3">Update Me</button>
                  <button className="btn btn-secondarty btn-large">Delete Me</button>
                </td>
              </tr>

           ))}
          </tbody>
        </table>
        <button onClick={() => setPosts([])} className="btn btn-dark btn-large w-100">Empty The Array</button>
      </div>
    )};
  
}

export default App;
