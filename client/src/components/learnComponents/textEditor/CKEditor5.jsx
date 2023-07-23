/* eslint-disable react-hooks/exhaustive-deps */
import "./ckeditor.css"
import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"

// import ClassicEditor from './ckeditor.js';
import { CKEditor } from "@ckeditor/ckeditor5-react"
import Editor from 'ckeditor5-custom-build/build/ckeditor';
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic"

const CKEditor5 = ({ content, setContent }) => {
  const [editor, setEditor] = useState(null)
  const editMode = useSelector((state) => state.editMode)

  useEffect(() => {
    editor?.setData(content ? content : "Add content")
  }, [content])

  return (
    <div className="ck-content">
      <CKEditor
        editor={Editor}
        config={{
          // This will conditionally hide or show the toolbar based on editMode.
          toolbar: editMode ? undefined : []
        }}
        disabled={!editMode}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          setEditor(editor)
          editor.setData(content ? content : "Add content")
        }}
        onChange={(event, editor) => {
          const data = editor.getData()
          setContent(data)
        }}
        // onBlur={(event, editor) => {}}
        // onFocus={(event, editor) => {}}
      />
    </div>
  )
}

export default CKEditor5
