import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useAppDispatch, useAppSelector } from '../../store';
import { hideNotification } from '../../store/reducers/notificationSlice';

export const Notification = () => {
  const { message, type } = useAppSelector((state) => state.notification);
  const dispatch = useAppDispatch();

  if (!message) return null;

  const handleClose = () => {
    dispatch(hideNotification());
  };

  return (
    <div className={`notification ${type}`}>
      <p>{message}</p>
      <button onClick={handleClose}>Close</button>
    </div>
  );
}