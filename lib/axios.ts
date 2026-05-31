import axios from 'axios';
import Cookies from 'js-cookie';
export const fetchUserProfile = async () => {
  const token = Cookies.get('token');
  console.log('Токен из куки перед отправкой:', token);

  if (!token) {
    throw new Error('Токен не найден! Пользователь не авторизован.');
  }

  const response = await axios.get(
    'https://kampustakas-backend-production-26c9.up.railway.app/api/auth/me',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};
