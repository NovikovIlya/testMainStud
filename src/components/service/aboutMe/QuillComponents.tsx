import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


function QuillComponents({ content, setContent }: any ) {
  

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link'],
      [{ 'align': [] }],
 
      ['clean']
    ],
  };

  return (
    <div className=" w-full ">
      <div className="w-full mx-auto bg-white   "> 
        <div className="w-full">
            <ReactQuill 
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              className="h-[400px] mb-12 !w-full"
            />
        </div>
      </div>
    </div>
  );
}

export default QuillComponents;