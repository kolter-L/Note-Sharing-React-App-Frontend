import React, { useState } from "react";
import production from "./constants";
import PostCreate from "./components/NoteCreate";
import PostUpdate from "./components/NoteUpdate";


function App() {

  const [posts, setPosts] = useState([]);

  const [showingCreateNewPostForm, setShowingCreateNewPostForm] = useState(false);

  const [postCurrentlyBeingUpdated, setPostCurrentlyBeingUpdated] = useState(null);

  // test function to get all posts from the API

  function getPosts() {
    const url = production.API_URL_GET_ALL_POSTS;

    console.log(url);
  
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

  function deletePost(id) {

    const url = `${production.API_URL_DELTE_POST_BY_ID}?Id=${id}`;

    console.log(url);
  
    fetch(url, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(responseFromServer => {
      console.log(responseFromServer);
      onPostDeleted(id);
    })
    .catch((error) => {
      console.log(error);
      alert(error);
    });

  }

  return (
    <div className="container">
      <h1>greetings, human</h1>

      {(showingCreateNewPostForm === false && postCurrentlyBeingUpdated === null) && (
        <div className="mt-5">
          <button onClick={getPosts} className="btn btn-dark btn-large w-100">See All the Notes in the NoteBook</button>
          <button onClick={() => { setShowingCreateNewPostForm(true)}} className="btn btn-secondary btn-large w-100 mt-4">Create A New One</button>
        </div>

      )}

      {(posts.length > 0 && showingCreateNewPostForm === false && postCurrentlyBeingUpdated === null) && renderTable()}

      {showingCreateNewPostForm && <PostCreate onPostCreated={onPostCreated} />}

      {postCurrentlyBeingUpdated !== null && <PostUpdate post={postCurrentlyBeingUpdated} onPostUpdated={onPostUpdated} />}

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
                  <button onClick={ () => setPostCurrentlyBeingUpdated(post)} className="btn btn-dark btn-large mx-3 my-3">Update Me</button>
                  <button onClick={ () => { if(window.confirm("Are you certain that you want to delete this")) deletePost(post.id)}}className="btn btn-secondarty btn-large">Delete Me</button>
                </td>
              </tr>

           ))}
          </tbody>
        </table>
        <button onClick={() => setPosts([])} className="btn btn-dark btn-large w-100">Close the NoteBook</button>
      </div>
    )};

    // creating onPostDeleted function

    function onPostDeleted(deletedPostid) {
      
      let postsCopy = [...posts];

      const index = postsCopy.findIndex((postsCopyPost, currentIndex) => {

        if (postsCopyPost.id === deletedPostid) {
          
          return true;
        }
      });

      if (index !== -1) {
        postsCopy.splice(index, 1);
      }

      setPosts(postsCopy);

      alert("Note Deleted");
    }  

    // creating the onPostUpdated function

    function onPostCreated(createdPost) {

      setShowingCreateNewPostForm(false);

      if (createdPost === null) {
        return;
      }

      alert(`Post created successfully. "${createdPost.title}" will be saved.`);

      getPosts();
    }

    // creating the onPostCreated function

    function onPostUpdated(updatedPost) {
      setPostCurrentlyBeingUpdated(null);

      if(updatedPost === null) {
        return;
      }

      let postsCopy = [...posts];

      const index = postsCopy.findIndex((postsCopyPost, currentIndex) => {

        if (postsCopyPost.id === updatedPost.id) {
          
          return true;

        }
      });

      if (index !== -1) {
        postsCopy[index] = updatedPost;
      }

      setPosts(postsCopy);

      alert("Note Updated");
    }  
}

export default App;
