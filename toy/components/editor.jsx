import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import customEditor from 'ckeditor5-custom-build/build/ckeditor';

function Editor({  editorLoaded, name, value }) {

  return (
    <div>
      {editorLoaded ? (
        <CKEditor
          type=""
          name={name}
          editor={customEditor}
          data={value}
          onChange={(event, editor) => {
            const data = editor.getData();
          }}
          config={{
            mediaEmbed: {
              previewsInData: true,
            },
          
          }}
        />
      ) : (
        <div>Editor loading</div>
      )}
    </div>
  );
}

export default Editor;