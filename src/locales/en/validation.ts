export const validation = {
  email: 'The email must match the format example@example.com',

  loginFailed: 'Login or password is incorrect',

  password: {
    maxLength: 'Maximum number of characters 20',
    minLength: 'Minimum number of characters 6',
    mustContain:
      'Password must contain 0-9, a-z, A-Z, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^\n' +
      '_` { | } ~',
    noWhiteSpace: 'Whitespace characters are not allowed',
  },

  postDescription: {
    maxLength: 'Maximum number of characters 500',
  },

  requiredField: 'Required field',
}
