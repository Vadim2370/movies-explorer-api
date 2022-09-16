const ERROR_MESSAGE = {
  BAD_REQUEST: 'Неверный запрос',
  AUTH_FAILED: 'Неверный пароль или email',
  NOT_FOUND_PAGE: 'Страница не найдена',
  NOT_FOUND_USER: 'Пользователь не найден',
  NOT_FOUND_MOVIE: 'Фильм не найден',
  FORBIDDEN_MOVIE: 'Чужой фильм удалять запрещено',
  DELETED_MOVIE: 'Фильм удален',
  BUSY_EMAIL: 'Этот email занят',
  INCORRECT_EMAIL: 'Некорректный email',
  INCORRECT_LINK: 'Некорректная ссылка',
  INTERNAL_SERVER_ERROR: 'Ошибка сервера',
};

const CHK_URL = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)?/;

module.exports = { ERROR_MESSAGE, CHK_URL };
