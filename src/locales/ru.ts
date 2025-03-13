import { LocaleType } from '@/locales/en'
import { logoutDialog } from '@/locales/ru/logout-dialog'
import { notifications } from '@/locales/ru/notifications'
import { postDialog } from '@/locales/ru/post-dialog'
import { profileSettings } from '@/locales/ru/profile-settings'
import { signInPage } from '@/locales/ru/sign-in-page'
import { userDetailsPage } from '@/locales/ru/userDetailsPage'
import { usersPage } from '@/locales/ru/users-page'
import { validation } from '@/locales/ru/validation'

export const ru: LocaleType = {
  appHeader: {
    signInButton: 'Войти',
  },
  appSidebar: {
    logOutButton: 'Выйти',
    loginButton: 'Войти',
    paymentsList: 'Платежи',
    postsList: 'Посты',
    statisticsLink: 'Статистика',
    userList: 'Пользователи',
  },

  datePickerPlaceholder: 'Выберите дату',

  follow: {
    tabNames: {
      link: 'Ссылка на профиль',
      subscribeDate: 'Дата подписки',
      userId: 'ID пользователя',
      username: 'Имя пользователя',
    },
  },

  language: {
    en: 'Английский',
    ru: ' Русский',
  },

  loading: 'Загрузка...',
  logoutDialog: logoutDialog,
  notifications: notifications,

  pagination: {
    textPerPage: 'на странице',
    textShow: 'показать',
  },

  paymentsPage: {
    autoupdate: 'Автообновление',
    noData: 'Платежей пока нет',
    searchLabel: 'Поиск',
    searchPlaceholder: 'Поиск',
    table: {
      header: {
        dateOfPayment: 'Дата добавления',
        paymentSystem: 'Способ оплаты',
        price: 'Сумма, $',
        subscriptionDescription: 'Подписка',
        username: 'Имя пользователя',
      },
    },
  },

  paymentsTab: {
    noData: 'Платежей пока нет',
    table: {
      header: {
        dateOfPayment: 'Дата добавления',
        paymentSystem: 'Способ оплаты',
        price: 'Сумма, $',
        subscriptionDescription: 'Подписка',
        subscriptionEndDate: 'Дата окончания подписки',
      },
    },
  },

  postDescription: {
    collapsePostDescriptionButton: 'Скрыть',
    expandPostDescriptionButton: 'Подробнее',
  },

  postDialog: postDialog,
  profileSettings: profileSettings,

  signInPage: signInPage,

  statisticsPage: {
    charts: {
      legends: {
        primary: 'Текущий месяц',
        secondary: 'Прошлый месяц',
      },
      titles: {
        payments: 'Платные аккаунты',
        posts: 'Загруженные фото',
        users: 'Новые пользователи',
      },
    },
    tabNames: {
      posts: 'Фото',
      users: 'Пользователи',
    },
  },

  userDetailsPage: userDetailsPage,
  usersPage: usersPage,

  validation: validation,
}
