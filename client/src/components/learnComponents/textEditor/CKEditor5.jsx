/* eslint-disable react-hooks/exhaustive-deps */
import "./ckeditor.css"
import React, { useState, useEffect } from "react"
// import Editor from  "ckeditor5-custom-build/build/ckeditor"
import { CKEditor } from "@ckeditor/ckeditor5-react"
// const Editor = require( '../../../../node_modules/ckeditor5-custom-build/build/ckeditor');
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"

const CKEditor5 = ({ content, editable, setContent, setPageType, limit }) => {
  const [editor, setEditor] = useState(null)

  useEffect(() => {
    editor?.setData(content ? content : "Add content")
  }, [content])

  return (
    <div className="ck-content">
      <CKEditor
        editor={ClassicEditor}
        disabled={!editable}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          setEditor(editor)
          editor.setData(content ? content : "Add content")
        }}
        onChange={(event, editor) => {
          const data = editor.getData()
          setContent(data)
        }}
        onBlur={(event, editor) => {}}
        onFocus={(event, editor) => {}}
      />
    </div>
  )
}

export default CKEditor5
