import "./styles.css";
import React, { useEffect } from "react";

import StarterKit from "@tiptap/starter-kit";
import { useEditor, EditorContent } from "@tiptap/react";
import MenuBar from "./MenuBar";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TextAlign from "@tiptap/extension-text-align";
import CharacterCount from '@tiptap/extension-character-count'

const TipTapEditor = ({ tutorial, editable, setContent, setPageType }) => {

  useEffect(() => {

    setPageType("Text");

  });
  const limit = 200
  
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
      CharacterCount.configure({
        limit,
      }),
    ],
    editable: editable,

    content: tutorial?.content? tutorial.content : "Go on..Write something...",

    onUpdate: ({ editor }) => {
      const editorJsonContent = editor.getJSON();
      setContent(editorJsonContent);
    },
  }, [tutorial]);
  useEffect(() => {
    if (!editor) {
      return undefined;
    }

    editor.setEditable(editable);
  }, [editor, editable]);

  return (
    <div >
      {editable ? (
        <div>
          <MenuBar editor={editor} />
        </div>
      ) : null}
      <EditorContent  editor={editor} />
      <div className="prose-mirror-character-count">
        {editor && editable && `${editor.storage.characterCount.characters()}/${limit} characters`}
      </div>
    </div>

  );
};

export default TipTapEditor;
