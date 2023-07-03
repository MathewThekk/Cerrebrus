/**
 * @license Copyright (c) 2014-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor.js"
import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment.js"
import Autoformat from "@ckeditor/ckeditor5-autoformat/src/autoformat.js"
import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote.js"
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold.js"
import CloudServices from "@ckeditor/ckeditor5-cloud-services/src/cloudservices.js"
import Code from "@ckeditor/ckeditor5-basic-styles/src/code.js"
import CodeBlock from "@ckeditor/ckeditor5-code-block/src/codeblock.js"
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials.js"
import FontColor from "@ckeditor/ckeditor5-font/src/fontcolor.js"
import FontFamily from "@ckeditor/ckeditor5-font/src/fontfamily.js"
import Heading from "@ckeditor/ckeditor5-heading/src/heading.js"
import Image from "@ckeditor/ckeditor5-image/src/image.js"
import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption.js"
import ImageInsert from "@ckeditor/ckeditor5-image/src/imageinsert.js"
import ImageResize from "@ckeditor/ckeditor5-image/src/imageresize.js"
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle.js"
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar.js"
import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload.js"
import Indent from "@ckeditor/ckeditor5-indent/src/indent.js"
import IndentBlock from "@ckeditor/ckeditor5-indent/src/indentblock"
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic.js"
import Link from "@ckeditor/ckeditor5-link/src/link.js"
import List from "@ckeditor/ckeditor5-list/src/list.js"
import ListProperties from "@ckeditor/ckeditor5-list/src/listproperties.js"
import MediaEmbed from "@ckeditor/ckeditor5-media-embed/src/mediaembed.js"
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph.js"
import PasteFromOffice from "@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice.js"
import RemoveFormat from "@ckeditor/ckeditor5-remove-format/src/removeformat.js"
import Table from "@ckeditor/ckeditor5-table/src/table.js"
import TableCaption from "@ckeditor/ckeditor5-table/src/tablecaption.js"
import TableCellProperties from "@ckeditor/ckeditor5-table/src/tablecellproperties"
import TableColumnResize from "@ckeditor/ckeditor5-table/src/tablecolumnresize.js"
import TableProperties from "@ckeditor/ckeditor5-table/src/tableproperties"
import TableToolbar from "@ckeditor/ckeditor5-table/src/tabletoolbar.js"
import TextTransformation from "@ckeditor/ckeditor5-typing/src/texttransformation.js"
import Title from "@ckeditor/ckeditor5-heading/src/title.js"
import { Style } from "@ckeditor/ckeditor5-style"
import { GeneralHtmlSupport } from "@ckeditor/ckeditor5-html-support"
import { Emoji, EmojiActivity, EmojiFlags, EmojiFood, EmojiNature, EmojiObjects, EmojiPeople, EmojiPlaces, EmojiSymbols } from "@phudak/ckeditor5-emoji/src"
import { AutoImage } from "@ckeditor/ckeditor5-image"
import AutoLink from '@ckeditor/ckeditor5-link/src/autolink.js';
import { FindAndReplace } from '@ckeditor/ckeditor5-find-and-replace';
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor.js';
import MediaEmbedToolbar from '@ckeditor/ckeditor5-media-embed/src/mediaembedtoolbar.js';
import SelectAll from '@ckeditor/ckeditor5-select-all/src/selectall.js';
import { ShowBlocks } from '@ckeditor/ckeditor5-show-blocks';
import { SourceEditing } from '@ckeditor/ckeditor5-source-editing';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough.js';
import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript.js';
import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript.js';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline.js';


class Editor extends ClassicEditor {}

// Plugins to include in the build.
Editor.builtinPlugins = [
  Alignment,
  AutoImage,
  Autoformat,
  AutoLink,
  BlockQuote,
  Bold,
  CloudServices,
  Code,
  CodeBlock,
  Essentials,
  FindAndReplace,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  GeneralHtmlSupport,
  Heading,
  Image,
  ImageCaption,
  ImageInsert,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  List,
  ListProperties,
  MediaEmbed,
  MediaEmbedToolbar,
  Paragraph,
  PasteFromOffice,
  RemoveFormat,
  SelectAll,
  ShowBlocks,
  SourceEditing,
  Strikethrough,
  Style,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextTransformation,
  Title,
  Underline,
  Emoji,
  EmojiPeople,
  EmojiNature,
  EmojiPlaces,
  EmojiFood,
  EmojiActivity,
  EmojiObjects,
  EmojiSymbols,
  EmojiFlags
]


// Editor configuration.
Editor.defaultConfig = {
  toolbar: {
    items: [
			'heading',
			'style',
			'|',
			'bold',
			'italic',
			'underline',
			'link',
			'bulletedList',
			'numberedList',
			'|',
			'outdent',
			'indent',
			'alignment',
			'fontFamily',
			'fontColor',
			'fontBackgroundColor',
      "emoji",
			'|',
			'codeBlock',
			'code',
			'imageUpload',
			'blockQuote',
			'insertTable',
			'mediaEmbed',
			'removeFormat',
			'showBlocks',
			'sourceEditing',
			'strikethrough',
			'subscript',
			'superscript',
			'imageInsert',
			'findAndReplace'
		],
    shouldNotGroupWhenFull: true
  },
  style: {
    definitions: [
      {
        name: "Article category",
        element: "h3",
        classes: ["category"],
      },
      {
        name: "Title",
        element: "h2",
        classes: ["document-title"],
      },
      {
        name: "Subtitle",
        element: "h3",
        classes: ["document-subtitle"],
      },
      {
        name: "Info box",
        element: "p",
        classes: ["info-box"],
      },
      {
        name: "Side quote",
        element: "blockquote",
        classes: ["side-quote"],
      },
      {
        name: "Marker",
        element: "span",
        classes: ["marker"],
      },
      {
        name: "Spoiler",
        element: "span",
        classes: ["spoiler"],
      },
      {
        name: "Code (dark)",
        element: "pre",
        classes: ["fancy-code", "fancy-code-dark"],
      },
      {
        name: "Code (bright)",
        element: "pre",
        classes: ["fancy-code", "fancy-code-bright"],
      },
    ],
  },
  htmlSupport: {
    allow: [
      // Enables all HTML features.
      {
        name: /.*/,
        attributes: true,
        classes: true,
        styles: true,
      },
    ],
    heading: {
      options: [
        { model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
        { model: "heading1", view: "h1", title: "Heading 1", class: "ck-heading_heading1" },
        { model: "heading2", view: "h2", title: "Heading 2", class: "ck-heading_heading2" },
        { model: "heading3", view: "h3", title: "Heading 3", class: "ck-heading_heading3" },
        { model: "heading4", view: "h4", title: "Heading 4", class: "ck-heading_heading4" },
        { model: "heading5", view: "h5", title: "Heading 5", class: "ck-heading_heading5" },
        { model: "heading6", view: "h6", title: "Heading 6", class: "ck-heading_heading6" },
      ],
    },
    disallow: [
      {
        attributes: [
          { key: /^on(.*)/i, value: true },
          { key: /.*/, value: /(\b)(on\S+)(\s*)=|javascript:|(<\s*)(\/*)script/i },
          { key: /.*/, value: /data:(?!image\/(png|jpeg|gif|webp))/i },
        ],
      },
      { name: "script" },
    ],
  },
  language: "en",
  list: {
    properties: {
      styles: true,
      startIndex: true,
      reversed: true,
    },
  },
  image: {
    styles: ["alignCenter", "alignLeft", "alignRight"],
    resizeOptions: [
      {
        name: "resizeImage:original",
        label: "Default image width",
        value: null,
      },
      {
        name: "resizeImage:50",
        label: "50% page width",
        value: "50",
      },
      {
        name: "resizeImage:75",
        label: "75% page width",
        value: "75",
      },
    ],
    toolbar: ["imageTextAlternative", "toggleImageCaption", "|", "imageStyle:inline", "imageStyle:wrapText", "imageStyle:breakText", "imageStyle:side", "|", "resizeImage"],
    insert: {
      integrations: ["insertImageViaUrl"],
    },
  },
  table: {
    contentToolbar: ["tableColumn", "tableRow", "mergeTableCells", "tableCellProperties", "tableProperties"],
  },
}

export default Editor

// SpecialCharacters,
//   SpecialCharactersEssentials,
//   "specialCharacters"
//   import SpecialCharacters from "@ckeditor/ckeditor5-special-characters/src/specialcharacters.js"
// import SpecialCharactersEssentials from "@ckeditor/ckeditor5-special-characters/src/specialcharactersessentials.js"
