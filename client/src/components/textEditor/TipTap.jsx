import "./styles.css";
import { useEditor, EditorContent } from "@tiptap/react";
import React, { useState } from "react";
import StarterKit from "@tiptap/starter-kit";
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
import { FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify } from "react-icons/fa";
import { FaBold, FaHeading, FaItalic, FaListOl, FaListUl, FaQuoteLeft, FaRedo, FaStrikethrough, FaUnderline, FaUndo, FaImage, FaIndent, FaOutdent, FaTable } from "react-icons/fa";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="menuBar">
      <div>
        <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive("bold") ? "is_active" : ""}>
          <FaBold />
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive("italic") ? "is_active" : ""}>
          <FaItalic />
        </button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive("underline") ? "is_active" : ""}>
          <FaUnderline />
        </button>
        <button onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive("strike") ? "is_active" : ""}>
          <FaStrikethrough />
        </button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive("heading", { level: 1 }) ? "is_active" : ""}>
          <FaHeading className="heading1" />
        </button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive("heading", { level: 2 }) ? "is_active" : ""}>
          <FaHeading />
        </button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editor.isActive("heading", { level: 3 }) ? "is_active" : ""}>
          <FaHeading className="heading3" />
        </button>
     <button onClick={() => editor.chain().focus().setTextAlign("left").run()} className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}>
  <FaAlignLeft />
</button>
<button onClick={() => editor.chain().focus().setTextAlign("center").run()} className={editor.isActive({ textAlign: "center" }) ? "is-active" : ""}>
  <FaAlignCenter />
</button>
<button onClick={() => editor.chain().focus().setTextAlign("right").run()} className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}>
  <FaAlignRight />
</button>
<button onClick={() => editor.chain().focus().setTextAlign("justify").run()} className={editor.isActive({ textAlign: "justify" }) ? "is-active" : ""}>
  <FaAlignJustify />
</button>


        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive("bulletList") ? "is_active" : ""}>
          <FaListUl />
        </button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive("orderedList") ? "is_active" : ""}>
          <FaListOl />
        </button>
        <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editor.isActive("blockquote") ? "is_active" : ""}>
          <FaQuoteLeft />
        </button>
        <button
          onClick={() => {
            const url = window.prompt("URL of the image");
            if (url) {
              editor.chain().focus().setImage({ src: url }).run();
            }
          }}
        >
          <FaImage />
        </button>
      
        <button
          onClick={() => {
            editor.chain().focus().insertTable().run();
          }}
        >
          <FaTable />
        </button>
      </div>

      <div>
        <button onClick={() => editor.chain().focus().undo().run()}>
          <FaUndo />
        </button>
        <button onClick={() => editor.chain().focus().redo().run()}>
          <FaRedo />
        </button>
      </div>
    </div>
  );
};

export const TipTap = () => {
  const [slide, setSlide] = useState();
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
      const html = editor.getHTML();
      setSlide(html);
      console.log(slide);
    },
  });

  return (
    <div className="textEditor">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TipTap;
