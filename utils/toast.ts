import { NotificationManager } from 'react-notifications';

export default (type, message, cb) => {
  const title = undefined;
  const time = 3000;
  switch (type) {
    case 'info':
      NotificationManager.info(message, title, time, cb ? cb() : undefined);
      break;
    case 'success':
      NotificationManager.success(message, title, time, cb ? cb() : undefined);
      break;
    case 'warning':
      NotificationManager.warning(message, title, time, cb ? cb() : undefined);
      break;
    case 'error':
      NotificationManager.error(message, title, time, cb ? cb() : undefined);
      break;
  }
}