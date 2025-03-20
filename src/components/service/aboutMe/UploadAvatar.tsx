import React from 'react';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, message, Upload } from 'antd';
import { useAddAvatarMutation, useGetAvatarQuery, usePutAvatarMutation } from '../../../store/api/aboutMe/forAboutMe';

const UploadAvatar: React.FC = () => {
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
    console.log('avatarUrl',avatarUrl)
    try {
      if(avatarUrl){
        await putAvatar(formData).unwrap();
        message.success('Аватар успешно обновлен');
      } else {
        await addAvatar(formData).unwrap();
        message.success('Аватар успешно обновлен');
      }
      // await addAvatar(formData).unwrap();
      // message.success('Аватар успешно обновлен');
    } catch (error) {
      message.error('Ошибка при загрузке аватара');
    }
  };

  return (
    <div className='relative w-[180px] mb-4'>
      <Avatar
        className='bg-[#cbdaf1] rounded-[50%]'
        size={180}
        src={avatarUrl}
        icon={!avatarUrl && <UserOutlined />}
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
    </div>
  );
};

export default UploadAvatar;