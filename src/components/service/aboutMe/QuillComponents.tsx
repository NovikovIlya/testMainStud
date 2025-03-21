import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


function QuillComponents({ content, setContent ,isPreview, setIsPreview}: any ) {
  

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
   
      [{ 'align': [] }],
 
      ['clean']
    ],
  };

  return (
    <div className="  ">
      <div className="max-w-4xl mx-auto bg-white   overflow-hidden">
        {/* <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800"></h1>
          <button
            onClick={() => setIsPreview(!isPreview)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            {isPreview ? (
              <>
                <EditOutlined  size={18} /> Редактировать
              </>
            ) : (
              <>
                <EyeOutlined  size={18} /> Предпросмотр
              </>
            )}
          </button>
        </div> */}
        
        <div className="">
          {isPreview ? (
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          ) : (
            <ReactQuill 
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              className="h-[400px] mb-12 w-full"
            />
          )}
           
        </div>
       
      </div>
    </div>
  );
}

export default QuillComponents;