export const validation = {
  email: 'Email должен соответствовать формату example@example.com',

  loginFailed: 'Не верный логин или пароль',

  password: {
    maxLength: 'Максимальное количество символов 20',
    minLength: 'Минимальное количество символов 6',
    mustContain:
      'Пароль должен состоять из символов: 0-9, a-z, A-Z, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^\n' +
      '_` { | } ~',
    noWhiteSpace: 'Использование пробелов запрещено',
  },

  postDescription: {
    maxLength: 'Максимальное количество символов 500',
  },

  requiredField: 'Обязательное поле',
}
