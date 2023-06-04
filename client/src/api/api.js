import axios from "axios"
import firebase from "firebase/compat/app"

let baseURL
let logoutCallback

if (process.env.NODE_ENV === "production") {
  baseURL = "https://cerrebrus.onrender.com"
} else {
  baseURL = "http://localhost:8000"
}

const API = axios.create({ baseURL: baseURL })

API.setLogoutCallback = (callback) => {
  logoutCallback = callback
}

API.interceptors.request.use(async (req) => {
  const token = localStorage.getItem("token")
  const tokenExpiresAt = localStorage.getItem("tokenExpiresAt")

  // Check if token is still valid
  if (token && new Date().getTime() < Number(tokenExpiresAt)) {
    req.headers.Authorization = `Bearer ${token}`
  } else {
    if (logoutCallback) {
      console.log("logging out")
      logoutCallback()
    }
  }

  return req
})

//learn apis
export const deleteTutorial = (currentUrl, page) => API.delete(currentUrl, { page })

export const getSubjects = () => API.get("/learn/subjectselect")
export const addSubject = (subject) => API.post("/learn/subjectselect", { subject })
export const deleteSubject = (subject) => API.delete("/learn", { subject })

export const getFields = (subject) => API.get(`/learn/${subject}/fieldSelect`)
export const addField = (field, subject) => API.post(`/learn/${subject}/fieldSelect/addfield?field=${field}`)
export const deleteField = (field, subject) => API.delete(`/learn/${subject}/deletefield?field=${field}`, { field })

export const getUnits = (field, subject) => API.get(`/learn/${subject}/${field}/unitSelect`)
export const addUnit = (unit, field, subject) => API.post(`/learn/${subject}/${field}/addunit?unit=${unit}`)
export const updateUnitName = (newUnitName, unit, field, subject) => API.put(`/learn/${subject}/${field}/${unit}/updateunitname`, { newUnitName })
export const deleteUnit = (unitName, field, subject) => API.delete(`/learn/${subject}/${field}/deleteunit?unitname=${unitName}`)

export const getTutorials = (unit, field, subject) => API.get(`/learn/${subject}/${field}/${unit}`)
export const getTutorialPage = (page, chapter, unit, field, subject) => API.get(`/learn/${subject}/${field}/${unit}?chapter=${chapter}&page=${page}`)
export const addTutorialPage = (tutorialPageData) => API.post(`/learn/${tutorialPageData.subject}/${tutorialPageData.field}/${tutorialPageData.unit}?chapter=${tutorialPageData.chapterNumber}&page=${tutorialPageData.currentPage}`, tutorialPageData)
export const updateTutorialPage = (tutorialPageData) => API.put(`/learn/${tutorialPageData.subject}/${tutorialPageData.field}/${tutorialPageData.unit}?chapter=${tutorialPageData.chapterNumber}&page=${tutorialPageData.currentPage}`, tutorialPageData)
export const updateTutorialChapterName = (newChapterName, chapterNumber, unitName, field, subject) => API.put(`/learn/${subject}/${field}/${unitName}/updatechaptername?chapter=${chapterNumber}`, { newChapterName })
export const deleteTutorialPage = (tutorial) => API.delete(`/learn/${tutorial.subject}/${tutorial.field}/${tutorial.unit}?chapter=${tutorial.chapterNumber}&pageId=${tutorial._id}`)

export const getComments = (tutorialId) => API.get(`/learn/comments/${tutorialId}`)
export const deleteComment = (commentId, unit, field, subject) => API.delete(`/learn/${subject}/${field}/${unit}/comments/${commentId}`)
export const addComment = (content, tutorialId, unit, field, subject) => API.post(`/learn/${subject}/${field}/${unit}/comments/${tutorialId}`, { content })
export const updateComment = (content, commentId, unit, field, subject) => API.put(`/learn/${subject}/${field}/${unit}/comments/${commentId}`, { content })

// auth apis
export const userLogin = (userData) => API.post("/auth/login", userData)

export default API
