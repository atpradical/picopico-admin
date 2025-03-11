import { createPostDialog } from '@/locales/en/create-post-dialog'
import { deleteAvatarDialog } from '@/locales/en/delete-avatar-dialog'
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
export type LocaleValidationAboutMe = typeof en.validation.aboutMe
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

  createPostDialog: createPostDialog,

  deleteAvatarDialog: deleteAvatarDialog,

  language: {
    en: 'English',
    ru: ' Russian',
  },
  loading: 'Loading...',
  logoutDialog: logoutDialog,
  noPostsCreatedYet: 'No posts have been created yet',
  notifications: notifications,
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
