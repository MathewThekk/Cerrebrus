import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
  }

  return req;
});



export const deleteTutorial = (currentUrl, page) => API.delete(currentUrl, {page});

export const getSubjects = () => API.get('/learn/subjectselect');
export const addSubject = (subject) => API.post('/learn/subjectselect', {subject});
export const deleteSubject = (subject) => API.delete('/learn', {subject});

export const getFields = (subject) => API.get(`/learn/${subject}/fieldSelect`);
export const addField = (field, subject) => API.post(`/learn/${subject}/fieldSelect/addfield?field=${field}`);
export const deleteField = (field, subject) => API.delete(`/learn/${subject}/deletefield?field=${field}`, {field});

export const getUnits = (field, subject) => API.get(`/learn/${subject}/${field}/unitSelect`);
export const addUnit = (unit, field, subject) => API.post(`/learn/${subject}/${field}/addunit?unit=${unit}`);
export const deleteUnit = (unit, field, subject) => API.delete(`/learn/${subject}/${field}/deleteunit?unit=${unit}`);

export const getTutorials = (unit,field, subject) => API.get(`/learn/${subject}/${field}/${unit}`);
export const getTutorialPage = (page, chapter, unit,field, subject) => API.get(`/learn/${subject}/${field}/${unit}?chapter=${chapter}&page=${page}`);
export const addTutorialPage = (pageType, content, page, chapter, unit, field, subject) => API.post(`/learn/${subject}/${field}/${unit}?chapter=${chapter}&page=${page}`, {pageType, content});



// export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
// export const fetchPostsByCreator = (name) => API.get(`/posts/creator?name=${name}`);
// export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
// export const createPost = (newPost) => API.post('/posts', newPost);
// export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
// export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value });
// export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
// export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
