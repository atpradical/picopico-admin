import { LocaleType } from '@/locales/en'
import { createPostDialog } from '@/locales/ru/create-post-dialog'
import { deleteAvatarDialog } from '@/locales/ru/delete-avatar-dialog'
import { logoutDialog } from '@/locales/ru/logout-dialog'
import { notifications } from '@/locales/ru/notifications'
import { postDialog } from '@/locales/ru/post-dialog'
import { profileSettings } from '@/locales/ru/profile-settings'
import { signInPage } from '@/locales/ru/sign-in-page'
import { usersPage } from '@/locales/ru/users-page'
import { validation } from '@/locales/ru/validation'

import { profilePage } from './ru/profile-page'

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

  createPostDialog: createPostDialog,

  deleteAvatarDialog: deleteAvatarDialog,

  language: {
    en: 'Английский',
    ru: ' Русский',
  },
  loading: 'Загрузка...',
  logoutDialog: logoutDialog,
  noPostsCreatedYet: 'Еще не создано ни одного поста',
  notifications: notifications,
  postDescription: {
    collapsePostDescriptionButton: 'Скрыть',
    expandPostDescriptionButton: 'Подробнее',
  },
  postDialog: postDialog,
  profilePage: profilePage,
  profileSettings: profileSettings,
  signInPage: signInPage,

  usersPage: usersPage,

  validation: validation,
}
