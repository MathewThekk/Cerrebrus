import './ckeditor.css'
import React from "react"
import Editor from "ckeditor5-custom-build/build/ckeditor"
import { CKEditor } from "@ckeditor/ckeditor5-react"

const CKEditor5 = ({ content, editable, setContent, setPageType, limit }) => {
  const editorConfiguration = {
  
  }
  return (
    <div className="ck-content">
      <CKEditor
        editor={Editor}
        config={ editorConfiguration }
        disabled={!editable}
        data="<p>Hello from CKEditor 5!</p>"
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          editor.setData(content)
          console.log("Editor is ready to use!", editor)
        }}
        onChange={(event, editor) => {
          const data = editor.getData()
          setContent(data)
          console.log({ event, editor, data })
        }}
        onBlur={(event, editor) => {
          console.log("Blur.", editor)
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", editor)
        }}
      />
    </div>
  )
}

export default CKEditor5
