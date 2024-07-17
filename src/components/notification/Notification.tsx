import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { hideNotification } from '../../store/reducers/notificationSlice';
import { notification } from 'antd';

export const Notification = () => {
  const [api, contextHolder] = notification.useNotification();
  const { message, type } = useAppSelector((state) => state.notification);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (message) {
      api.open({
        message: 'Внимание!',
        description: message,
        type: type,
        onClose: () => dispatch(hideNotification())
      });
    }
  }, [message, type, api, dispatch]);

  return <>{contextHolder}</>;
}
