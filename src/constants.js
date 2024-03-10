const API_FOR_PROD = 'https://koltersnotebook.azurewebsites.net/';

const ENDPOINTS = {
    GET_ALL_POSTS: 'get-all-notes',
    GET_POSTS_BY_ID: 'get-note-by-id',
    CREATE_POST: 'create-note',
    UPDATE_POST: 'update-note',
    DELETE_POST_BY_ID: 'delete-note-by-id'
};

const production = {
    API_URL_GET_ALL_POSTS: `${API_FOR_PROD}/${ENDPOINTS.GET_ALL_POSTS}`,
    API_URL_GET_POST_BY_ID: `${API_FOR_PROD}/${ENDPOINTS.GET_POSTS_BY_ID}`,
    API_URL_CREATE_POST: `${API_FOR_PROD}/${ENDPOINTS.CREATE_POST}`,
    API_URL_UPDATE_POST: `${API_FOR_PROD}/${ENDPOINTS.UPDATE_POST}`,
    API_URL_DELTE_POST_BY_ID: `${API_FOR_PROD}/${ENDPOINTS.DELETE_POST_BY_ID}`
};


export default production;