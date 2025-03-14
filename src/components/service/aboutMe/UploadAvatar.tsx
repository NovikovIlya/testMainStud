import React, { useState } from 'react';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';
import { Flex, Divider, Form, Radio, Skeleton, Space, Switch } from 'antd';
import { PersonSvg } from '../../../assets/svg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@reduxjs/toolkit/query';
import i18next from 'i18next';
import { apiSlice } from '../../../store/api/apiSlice';



const UploadAvatar: React.FC = () => {
    const accessToken = useSelector((state: any) => state.auth.accessToken);
    const cleanedToken = accessToken?.replaceAll('"', '') || '';
    const dispatch = useDispatch();
    const [avatar,setAvatar]  = useState(null)

    const props: UploadProps = {
        name: 'file',
      
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        headers: {
          ...(cleanedToken && { Authorization: `Bearer ${cleanedToken}` }),
          'Accept-Language': i18next.language,
        },
        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
    
            console.log("Успешный ответ сервера:", info.file.response);
            setAvatar(info.file.response)

            // dispatch(apiSlice.util.invalidateTags(['']));
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
      
        itemRender: (originNode: React.ReactNode, file: any) => {
          // Обрезаем имя файла до 10 символов и добавляем многоточие
          const shortName = file.name.length > 10 ? `${file.name.slice(0, 10)}...` : file.name;
          return (
            <div>
              <span>{''}</span>
            </div>
          );
        },
      };
    
    return(
    <div className='relative w-[180px] mb-4 '>  
        <div className='w-[180px] h-[180px] bg-[#cbdaf1] rounded-[50%]'></div>
        <div className='absolute right-3 bottom-3 '>
            <Upload  maxCount={1} {...props} >
                <Button className=' !rounded-[50%]' icon={<UploadOutlined />}></Button>
             </Upload>
        </div>
    </div>
)}

export default UploadAvatar;