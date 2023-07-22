import axios from "axios"
import firebase from "firebase/compat/app"

let baseURL
let logoutCallback

if (process.env.NODE_ENV === "production") {
  baseURL = "https://www.api.mindstair.com"
} else {
  baseURL = "http://localhost:8000"
}

const API = axios.create({ baseURL: baseURL })

API.setLogoutCallback = (callback) => {
  logoutCallback = callback
}

let userLoaded = false

firebase.auth().onAuthStateChanged((user) => {
  userLoaded = true
})

const waitForFirebase = () => {
  let attempts = 0
  const maxAttempts = 10

  return new Promise((resolve, reject) => {
    const checkFirebase = () => {
      if (userLoaded) resolve()
      else if (attempts < maxAttempts) {
        attempts++
        setTimeout(checkFirebase, 100) // check every 100 ms
      } else {
        reject(new Error("Firebase initialization failed after 10 attempts"))
      }
    }
    checkFirebase()
  })
}

API.interceptors.request.use(async (req) => {
  let token = localStorage.getItem("token")
  const tokenExpiresAt = parseInt(localStorage.getItem("tokenExpiresAt"))

  // Check if token is still valid
  if (token && new Date().getTime() < Number(tokenExpiresAt)) {
    await waitForFirebase() // wait for firebase to initialise, else currentUser will be null

    if (firebase.auth().currentUser) {
      if (new Date().getTime() > Number(tokenExpiresAt) - 10 * 60 * 1000)
        await firebase
          .auth()
          .currentUser.getIdToken(true)
          .then((idToken) => {
            token = idToken
          })
          .catch((error) => {
            console.log(error)
          })

      req.headers.Authorization = `Bearer ${token}` // Use the fresh idToken instead of the old token
      const twoHoursFromNow = new Date().getTime() + 2 * 60 * 60 * 1000 // 2 = 2 hours
      localStorage.setItem("tokenExpiresAt", twoHoursFromNow.toString())
    } else {
      console.log("firebase token expired, user must sign in again")
      localStorage.setItem("lastLocation", window.location.pathname)
      logoutCallback()
    }
  } else {
    if (logoutCallback) {
      console.log("stored token expired, logging out")
      localStorage.setItem("lastLocation", window.location.pathname)
      logoutCallback()
    }
  }
  return req
})

//learn apis

export const getSubjects = () => API.get("/learn/subjectselect")
export const addSubject = (subject) => API.post("/learn/subjectselect", { subject })
export const deleteSubject = (subject) => API.delete("/learn", { subject })

export const getFields = (subject) => API.get(`/learn/${subject}/fieldSelect`)
export const addField = (field, subject) => API.post(`/learn/${subject}/fieldSelect/addfield?field=${field}`)
export const deleteField = (field, subject) => API.delete(`/learn/${subject}/deletefield?field=${field}`, { field })

export const getUnits = (field, subject, populateTutorial) => API.get(`/learn/${subject}/${field}/unitSelect?populatetutorial=${populateTutorial}`)
export const addUnit = (unit, field, subject) => API.post(`/learn/${subject}/${field}/addunit?unit=${unit}`)
export const updateUnitName = (newUnitName, unit, field, subject) => API.put(`/learn/${subject}/${field}/${unit}/updateunitname`, { newUnitName })
export const deleteUnit = (unitName, field, subject) => API.delete(`/learn/${subject}/${field}/deleteunit?unitname=${unitName}`)

export const getTutorials = (unit, field, subject) => API.get(`/learn/${subject}/${field}/${unit}`)
export const addTutorialPage = (tutorialPageData) => API.post(`/learn/${tutorialPageData.subject}/${tutorialPageData.field}/${tutorialPageData.unit}?chapter=${tutorialPageData.chapterNumber}`, tutorialPageData)
export const updateChapter = (tutorialId, content) => API.put(`/learn/tutorials/${tutorialId}/update-chapter-content`, {content})
export const updateTutorialChapterName = (newChapterName, chapterNumber, unitName, field, subject) => API.put(`/learn/${subject}/${field}/${unitName}/updatechaptername?chapter=${chapterNumber}`, { newChapterName })
export const updateTutorialChapterNumber = (newChapterNumber, tutorialId) => API.put(`/learn/tutorials/${tutorialId}/update-chapter-number?newChapterNumber=${newChapterNumber}`, {})
export const deleteChapter = (tutorialId) => API.delete(`/learn/tutorials/${tutorialId}/delete-chapter`)

//comment APIs
export const getComments = (tutorialId) => API.get(`/learn/comments/${tutorialId}`)
export const deleteComment = (commentId, unit, field, subject) => API.delete(`/learn/${subject}/${field}/${unit}/comments/${commentId}`)
export const addComment = (content, tutorialId, unit, field, subject) => API.post(`/learn/${subject}/${field}/${unit}/comments/${tutorialId}`, { content })
export const updateComment = (content, commentId, unit, field, subject) => API.put(`/learn/${subject}/${field}/${unit}/comments/${commentId}`, { content })
export const likeComment = (commentId) => API.put(`/learn/likecomment/${commentId}`)
export const dislikeComment = (commentId) => API.put(`/learn/dislikecomment/${commentId}`)

//additionalInformation APIs
export const deleteAdditionalInformation = (tutorialId) => API.delete(`/learn/additionalinformation/${tutorialId}`)
export const addAdditionalInformation = (additionalInformationContent, tutorialId) => API.post(`/learn/additionalinformation/${tutorialId}`, { additionalInformationContent })
export const updateAdditionalInformation = (additionalInformationContent, tutorialId) => API.put(`/learn/additionalinformation/${tutorialId}`, { additionalInformationContent })

// auth apis
export const userLogin = (userData) => API.post("/auth/login", userData)

export default API
