
import React, { useEffect, useState } from 'react';
import { DeleteOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, message, Spin, Upload } from 'antd';
import { useAddAvatarMutation, useDeleteAvatarMutation, useGetAvatarQuery, usePutAvatarMutation } from '../../../store/api/aboutMe/forAboutMe';
import { t } from 'i18next';
import { Un } from '../../../assets/svg/Un';

const UploadAvatar = () => {
  const { data: avatarUrl,error,refetch,isSuccess,isFetching } = useGetAvatarQuery();
  const [avatarUrlLocal, setAvatarUrlLocal] = useState<any>({
    url: null,
    id: null,
  });
  const [addAvatar, { isLoading }] = useAddAvatarMutation();
  const [putAvatar, { isLoading: isLoadingPut }] = usePutAvatarMutation();
  const [deleteAvatar, { isLoading: isLoadingDelete }] = useDeleteAvatarMutation();
  console.log('avatarUrl',avatarUrl?.url)
  console.log('avatarUrlLocal',avatarUrlLocal)

  useEffect(()=>{
     if(!isFetching){
      console.log('test')
      setAvatarUrlLocal({
        url: avatarUrl?.url,
        id: Date.now(),
      })
     }
  },[isFetching])

  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith('image/');
    const isLt5M = file.size / 1024 / 1024 < 5;

    if (!isImage) {
      message.error(t('onlyImages'));
      return false;
    }

    if (!isLt5M) {
      message.error(t('fileSize'));
      return false;
    }

    return true;
  };

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      if(avatarUrl?.url === 'There is no photo') {
        await addAvatar(formData).unwrap();
        // message.success(t('avatarChange'));
      } else {
        await putAvatar(formData).unwrap();
        // message.success(t('avatarChange'));
      }
     
    } catch (error) {
      message.error(t('error'));
    }
  };
  
  return (
    <Spin spinning={isLoadingPut || isLoading} className='relative w-[180px] mb-4' key={avatarUrlLocal?.id}>
      <Avatar
        className='bg-[#cbdaf1] rounded-[50%]'
        size={180}
        src={avatarUrlLocal?.url}
        icon={
          avatarUrl?.url==='There is no photo' ? <UserOutlined /> 
          : avatarUrl===null ? <UserOutlined /> 
          : error ? <UserOutlined />
          : avatarUrlLocal?.url}
      />
      <div className='absolute right-3 bottom-3'>
        <Upload
          maxCount={1}
          showUploadList={false}
          beforeUpload={beforeUpload}
          accept="image/png, image/jpeg, image/webp"
          customRequest={({ file }) => handleUpload(file as File)}
        >
          <Button
            className='!rounded-[50%] bg-[#65A1FA] text-white !hover:text-black  border-2 border-white border-solid w-[36px]'
            icon={<Un />}
            loading={isLoading}
            type='primary'
          />
          
        </Upload>

        
      </div>

      {avatarUrl?.emptyAvatar  ? '' :<div className='absolute bottom-[43%] right-[-13px]'>
        <Button
              className='!rounded-[50%] bg-[#65A1FA] text-white   border-2 border-white border-solid w-[36px]'
              icon={<DeleteOutlined  />}
                type='primary'
                onClick={async () => {
                  try {
                    await deleteAvatar().unwrap();
                    // message.success(t('avatarDelete'));
                  } catch (error) {
                    // message.error(t('error'));
                    console.log(error);
                  }
                }}

            />
        </div> }
    </Spin>
  );
};

export default UploadAvatar;

