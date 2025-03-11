import { createPostDialog } from '@/locales/en/create-post-dialog'
import { deleteAvatarDialog } from '@/locales/en/delete-avatar-dialog'
import { logoutDialog } from '@/locales/en/logout-dialog'
import { notifications } from '@/locales/en/notifications'
import { postDialog } from '@/locales/en/post-dialog'
import { profileAvatarDialog } from '@/locales/en/profile-avatar-dialog'
import { profilePage } from '@/locales/en/profile-page'
import { profileSettings } from '@/locales/en/profile-settings'
import { searchPage } from '@/locales/en/search-page'
import { signInPage } from '@/locales/en/sign-in-page'
import { validation } from '@/locales/en/validation'

export type LocaleType = typeof en
export type LocaleValidation = typeof en.validation
export type LocaleValidationUserName = typeof en.validation.userName
export type LocaleValidationName = typeof en.validation.name
export type LocaleValidationAboutMe = typeof en.validation.aboutMe
export type LocaleValidationPassword = typeof en.validation.password

export const en = {
  appHeader: {
    signInButton: 'Sign in',
    signUpButton: 'Sign up',
  },
  appSidebar: {
    createButton: 'Create',
    favouritesLink: 'Favourites',
    homeLink: 'Home',
    logOutButton: 'Log Out',
    loginButton: 'Sign in',
    messagesLink: 'Messenger',
    profileLink: 'My Profile',
    profileSettings: 'Profile Settings',
    registerButton: 'Sign up',
    searchButton: 'Search',
    statisticsLink: 'Statistics',
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
  postDialog: postDialog,
  profileAvatarDialog: profileAvatarDialog,
  profilePage: profilePage,
  profileSettings: profileSettings,
  searchPage: searchPage,
  signInPage: signInPage,
  validation: validation,
}
