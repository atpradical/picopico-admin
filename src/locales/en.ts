import { logoutDialog } from '@/locales/en/logout-dialog'
import { notifications } from '@/locales/en/notifications'
import { postDialog } from '@/locales/en/post-dialog'
import { profilePage } from '@/locales/en/profile-page'
import { profileSettings } from '@/locales/en/profile-settings'
import { signInPage } from '@/locales/en/sign-in-page'
import { userDetailsPage } from '@/locales/en/userDetailsPage'
import { validation } from '@/locales/en/validation'

import { usersPage } from './en/users-page'

export type LocaleType = typeof en
export type LocaleValidation = typeof en.validation
export type LocaleValidationUserName = typeof en.validation.userName
export type LocaleValidationName = typeof en.validation.name
export type LocaleValidationPassword = typeof en.validation.password

export const en = {
  appHeader: {
    signInButton: 'Sign in',
  },
  appSidebar: {
    logOutButton: 'Log Out',
    loginButton: 'Sign in',
    paymentsList: 'Payments List',
    postsList: 'Posts List',
    statisticsLink: 'Statistics',
    userList: 'Users List',
  },

  follow: {
    tabNames: {
      link: 'Profile Link',
      subscribeDate: 'Subscription Date',
      userId: 'User ID',
      username: 'Username',
    },
  },

  language: {
    en: 'English',
    ru: ' Russian',
  },
  loading: 'Loading...',
  logoutDialog: logoutDialog,

  notifications: notifications,

  pagination: {
    textPerPage: 'per page',
    textShow: 'Show',
  },

  postDescription: {
    collapsePostDescriptionButton: 'Hide',
    expandPostDescriptionButton: 'Show more',
  },
  postDialog: postDialog, //delete
  profilePage: profilePage, //delete
  profileSettings: profileSettings, //delete
  signInPage: signInPage,

  userDetailsPage: userDetailsPage,
  usersPage: usersPage,
  validation: validation,
}
