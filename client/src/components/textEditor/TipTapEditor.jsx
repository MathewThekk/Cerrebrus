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

const TipTapEditor = ({ tutorial, editable, setContent, setPageType }) => {

  useEffect(() => {
    setPageType("Text");
  }, []);
  
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
      setContent(editorJsonContent);
    },
  });
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
      <EditorContent editor={editor} />
    </div>
  );
};

export default TipTapEditor;
