// import './styles.css'

// import { EditorContent, useEditor } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'
// import React, { useEffect, useState } from 'react'

// const TipTapReader = ({content}``) => {
//   const [editable, setEditable] = useState(false)
//   const editor = useEditor({
//     editable,
//     content: content,
//     extensions: [StarterKit],
//   })

//   useEffect(() => {
//     if (!editor) {
//       return undefined
//     }

//     editor.setEditable(editable)
//   }, [editor, editable])

//   if (!editor) {
//     return null
//   }

//   return (
//     <>
//       <div className="checkbox">
//         <input
//           type="checkbox"
//           id="editable"
//           value={editable}
//           onChange={event => setEditable(event.target.checked)}
//         />
//         <label htmlFor="editable">editable</label>
//       </div>
//       <EditorContent editor={editor} />
//     </>
//   )
// }

// export default TipTapReader