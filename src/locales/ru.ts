import { LocaleType } from '@/locales/en'
import { confirmEmailPage } from '@/locales/ru/confirm-email-page'
import { createNewPasswordForm } from '@/locales/ru/create-new-password-form'
import { createPostDialog } from '@/locales/ru/create-post-dialog'
import { deleteAvatarDialog } from '@/locales/ru/delete-avatar-dialog'
import { docsBackButtons } from '@/locales/ru/docsBackButtons'
import { emailConfirmationDialog } from '@/locales/ru/email-confirmation-dialog'
import { expiredLink } from '@/locales/ru/expired-link'
import { forgotPasswordPage } from '@/locales/ru/forgot-password-page'
import { logoutDialog } from '@/locales/ru/logout-dialog'
import { notifications } from '@/locales/ru/notifications'
import { postDialog } from '@/locales/ru/post-dialog'
import { privacyPolicyPage } from '@/locales/ru/privacy-policy-page'
import { profileAvatarDialog } from '@/locales/ru/profile-avatar-dialog'
import { profileSettings } from '@/locales/ru/profile-settings'
import { searchPage } from '@/locales/ru/search-page'
import { signInPage } from '@/locales/ru/sign-in-page'
import { signUpPage } from '@/locales/ru/sign-up-page'
import { termsOfServicePage } from '@/locales/ru/terms-of-service-page'
import { validation } from '@/locales/ru/validation'

import { profilePage } from './ru/profile-page'

export const ru: LocaleType = {
  appHeader: {
    signInButton: 'Войти',
    signUpButton: 'Зарегистрироваться',
  },
  appSidebar: {
    createButton: 'Создать',
    favouritesLink: 'Избранное',
    homeLink: 'Главная',
    logOutButton: 'Выйти',
    loginButton: 'Войти',
    messagesLink: 'Сообщения',
    profileLink: 'Мой Профиль',
    profileSettings: 'Настройки',
    registerButton: 'Зарегистрироваться',
    searchButton: 'Поиск',
    statisticsLink: 'Статистика',
  },
  confirmEmailPage: confirmEmailPage,
  createNewPasswordForm: createNewPasswordForm,
  createPostDialog: createPostDialog,
  deleteAvatarDialog: deleteAvatarDialog,

  docsBackButtons: docsBackButtons,

  emailConfirmationDialog: emailConfirmationDialog,
  expiredLink: expiredLink,
  forgotPasswordPage: forgotPasswordPage,

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
  privacyPolicyPage: privacyPolicyPage,
  profileAvatarDialog: profileAvatarDialog,
  profilePage: profilePage,
  profileSettings: profileSettings,
  searchPage: searchPage,
  signInPage: signInPage,
  signUpPage: signUpPage,
  termsOfServicePage: termsOfServicePage,
  validation: validation,
}
