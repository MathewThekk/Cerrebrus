import axios from "axios"

const API = axios.create({ baseURL: "http://localhost:8000" })

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`
  }

  return req
})

export const deleteTutorial = (currentUrl, page) => API.delete(currentUrl, { page })

export const getSubjects = () => API.get("/learn/subjectselect")
export const addSubject = (subject) => API.post("/learn/subjectselect", { subject })
export const deleteSubject = (subject) => API.delete("/learn", { subject })

export const getFields = (subject) => API.get(`/learn/${subject}/fieldSelect`)
export const addField = (field, subject) => API.post(`/learn/${subject}/fieldSelect/addfield?field=${field}`)
export const deleteField = (field, subject) => API.delete(`/learn/${subject}/deletefield?field=${field}`, { field })

export const getUnits = (field, subject) => API.get(`/learn/${subject}/${field}/unitSelect`)
export const addUnit = (unit, field, subject) => API.post(`/learn/${subject}/${field}/addunit?unit=${unit}`)
export const deleteUnit = (unitName, field, subject) => API.delete(`/learn/${subject}/${field}/deleteunit?unitname=${unitName}`)

export const getTutorials = (unit, field, subject) => API.get(`/learn/${subject}/${field}/${unit}`)
export const getTutorialPage = (page, chapter, unit, field, subject) => API.get(`/learn/${subject}/${field}/${unit}?chapter=${chapter}&page=${page}`)
export const addTutorialPage = (tutorialPageData) => API.post(`/learn/${tutorialPageData.subject}/${tutorialPageData.field}/${tutorialPageData.unit}?chapter=${tutorialPageData.chapterNumber}&page=${tutorialPageData.currentPage}`, tutorialPageData)
export const updateTutorialPage = (tutorialPageData) => API.put(`/learn/${tutorialPageData.subject}/${tutorialPageData.field}/${tutorialPageData.unit}?chapter=${tutorialPageData.chapterNumber}&page=${tutorialPageData.currentPage}`, tutorialPageData)
export const deleteTutorialPage = (tutorial) => API.delete(`/learn/${tutorial.subject}/${tutorial.field}/${tutorial.unit}?chapter=${tutorial.chapterNumber}&pageId=${tutorial._id}`)
export const TutorialPage = (pageType, content, page, chapter, unit, field, subject) => API.post(`/learn/${subject}/${field}/${unit}?chapter=${chapter}&page=${page}`, { pageType, content })

export const signIn = (formData) => API.post("/user/signin", formData)
export const signUp = (formData) => API.post("/user/signup", formData)
