import "./styles.css";
import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addTutorialPage, updateTutorialPage } from "../../actions/tutorialActions";

import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./MenuBar";
import { useEditor, EditorContent } from "@tiptap/react";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TextAlign from "@tiptap/extension-text-align";

export const TipTapEditor = ({ tutorial }) => {
  const dispatch = useDispatch();

  const queryParams = new URLSearchParams(useLocation().search);
  const chapter = queryParams.get("chapter");
  const page = queryParams.get("page");
  const { subject, field, unit } = useParams();
  const pageType = "Text";

  const isNewTutorial = tutorial? false : true;
  const [editable, setEditable] = useState(false)


  const [content, setContent] = useState();
  // const [intialContent, setInitialContent] = useState(tutorial.content ?? "");

  

  const exitEditor = () => {
    console.log("Exiting the editor...");
    // Add your actual implementation for exiting the editor here.
  };

  const saveContent = () => {
    if (isNewTutorial) {
      console.log("Saving content...");
      dispatch(addTutorialPage(pageType, content, page, chapter, unit, field, subject));
    } else if (!isNewTutorial) {
      console.log("Updating content...");
      dispatch(addTutorialPage(pageType, content, page, chapter, unit, field, subject))
    }
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image,
      Table.configure({ resizable: true }),
      TableCell,
      TableHeader,
      TableRow,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    editable: editable,

    content: tutorial.content ?? "",

    onUpdate: ({ editor }) => {
      const editorJsonContent = editor.getJSON();
      setContent(editorJsonContent)
    },
  });
  useEffect(() => {
        if (!editor) {
          return undefined
        }
    
        editor.setEditable(editable)
      }, [editor, editable])
 
   
  return (
    <div className="textEditor">
      <div className="header">
        <h2 className="header__title">
          Chapter {chapter} - Page {page}
        </h2>
        <div className="header__buttons">
          {/* <button onClick={exitEditor}>Exit</button> */}
          <button
            onClick={() => {
              setEditable(!editable);
            }}
          >
            {editable ? "Exit Edit" : "Edit"}
          </button>
          <button onClick={saveContent}>{isNewTutorial ? "Save" : "Update"}</button>
        </div>
      </div>
      {editable || isNewTutorial ? (
        <div>
          <MenuBar editor={editor}  />
        </div>
      ) : null}
      <EditorContent editor={editor} />
    </div>
  );
};

export default TipTapEditor;
