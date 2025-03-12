import { logoutDialog } from '@/locales/en/logout-dialog'
import { notifications } from '@/locales/en/notifications'
import { postDialog } from '@/locales/en/post-dialog'
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

  paymentsPage: {
    autoupdate: 'Autoupdate',
    noData: 'No payments yet',
    searchLabel: 'Search',
    searchPlaceholder: 'Search',
    table: {
      header: {
        dateOfPayment: 'Added Date',
        paymentSystem: 'Payment Method',
        price: 'Amount,$',
        subscriptionDescription: 'Subscription',
        username: 'Username',
      },
    },
  },

  paymentsTab: {
    noData: 'No payments yet',
    table: {
      header: {
        dateOfPayment: 'Added Date',
        paymentSystem: 'Payment Method',
        price: 'Amount,$',
        subscriptionDescription: 'Subscription',
        subscriptionEndDate: 'End date of subscription',
      },
    },
  },

  postDescription: {
    collapsePostDescriptionButton: 'Hide',
    expandPostDescriptionButton: 'Show more',
  },
  postDialog: postDialog, //delete
  profileSettings: profileSettings, //delete

  signInPage: signInPage,

  statisticsPage: {
    tabNames: {
      posts: 'Photos',
      users: 'Users',
    },
  },

  userDetailsPage: userDetailsPage,

  usersPage: usersPage,
  validation: validation,
}
