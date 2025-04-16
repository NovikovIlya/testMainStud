import React from 'react';
import { DeleteOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, message, Spin, Upload } from 'antd';
import { useAddAvatarMutation, useGetAvatarQuery, usePutAvatarMutation } from '../../../store/api/aboutMe/forAboutMe';
import { t } from 'i18next';
import { Un } from '../../../assets/svg/Un';

const UploadAvatar = ({dataAboutMe}:any) => {
  const { data: avatarUrl } = useGetAvatarQuery();
  const [addAvatar, { isLoading }] = useAddAvatarMutation();
  const [putAvatar, { isLoading: isLoadingPut }] = usePutAvatarMutation();
  
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
      if(avatarUrl){
        await putAvatar(formData).unwrap();
        message.success(t('avatarChange'));
      } else {
        await addAvatar(formData).unwrap();
        message.success(t('avatarChange'));
      }
      // await addAvatar(formData).unwrap();
      // message.success('Аватар успешно обновлен');
    } catch (error) {
      message.error(t('error'));
    }
  };
  
  return (
    <Spin spinning={isLoadingPut || isLoading} className='relative w-[180px] mb-4'>
      <Avatar
        className='bg-[#cbdaf1] rounded-[50%]'
        size={180}
        src={avatarUrl?.url}
        icon={!avatarUrl?.url && <UserOutlined />}
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

      {avatarUrl?.url ? <div className='absolute bottom-[43%] right-[-13px]'>
        <Button
              className='!rounded-[50%] bg-[#65A1FA] text-white   border-2 border-white border-solid w-[36px]'
              icon={<DeleteOutlined  />}
                type='primary'

            />
        </div> : ''}
    </Spin>
  );
};

export default UploadAvatar;
