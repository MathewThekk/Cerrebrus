import "./styles.css";
import React, { useState } from "react";
import {useParams, useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { addTutorialPage } from "../../actions/tutorialActions";

import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./MenuBar";
import { useEditor, EditorContent } from "@tiptap/react";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import TextAlign from "@tiptap/extension-text-align";



export const TipTap = (props) => {
  const dispatch = useDispatch()
  const queryParams = new URLSearchParams(useLocation().search);
  const chapter = queryParams.get('chapter');
  const page = queryParams.get('page');
  const { subject, field, unit } = useParams()
  const pageType = 'Text'

  const [content, setContent] = useState();

  const exitEditor = () => {
    console.log("Exiting the editor...");
    // Add your actual implementation for exiting the editor here.
  };

  const saveContent = () => {
    console.log("Saving content...");
    dispatch(addTutorialPage(pageType, content, page, chapter, unit, field, subject))
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
      Document,
      Paragraph,
      Text,
      Heading,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],

    content: ``,

    onUpdate: ({ editor }) => {
      const editorJsonContent = editor.getJSON();

      setContent(editorJsonContent);
    },
  });

  return (
    <div className="textEditor">
      <MenuBar editor={editor} exitEditor={exitEditor} saveContent={saveContent}/>
      <EditorContent editor={editor} />
    </div>
  );
};

export default TipTap;
