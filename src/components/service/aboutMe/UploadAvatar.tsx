import React from 'react';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, message, Spin, Upload } from 'antd';
import { useAddAvatarMutation, useGetAvatarQuery, usePutAvatarMutation } from '../../../store/api/aboutMe/forAboutMe';
import { t } from 'i18next';

const UploadAvatar = ({dataAboutMe}:any) => {
  const { data: avatarUrl } = useGetAvatarQuery();
  const [addAvatar, { isLoading }] = useAddAvatarMutation();
  const [putAvatar, { isLoading: isLoadingPut }] = usePutAvatarMutation();
  
  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith('image/');
    const isLt5M = file.size / 1024 / 1024 < 5;

    if (!isImage) {
      message.error('Можно загружать только изображения!');
      return false;
    }

    if (!isLt5M) {
      message.error('Файл должен быть меньше 5MB!');
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
  console.log('avatarUrl111',avatarUrl)
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
            className='!rounded-[50%]'
            icon={<UploadOutlined />}
            loading={isLoading}
          />
        </Upload>
      </div>
    </Spin>
  );
};

export default UploadAvatar;