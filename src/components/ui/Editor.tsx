"use client";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Editor = () => {
  return (
    <div>
      <h2>CKEditor Example</h2>
      <CKEditor
        editor={ClassicEditor}
        data="<p>Hello, world!</p>"
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log({ event, editor, data });
        }}
      />
    </div>
  );
};

export default Editor;