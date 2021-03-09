import React from 'react'
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'

const navItems = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Account Settings',
    route: '/accountClass',
    icon: <CIcon content={freeSet.cilAppsSettings} customClasses="c-sidebar-nav-icon" />,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'AccountClass',
        to: '/accountClass',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'AccountCode',
        to: '/accountCode',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Anniversary',
        to: '/anniversary',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Bank',
        to: '/bank',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'BankRecord',
        to: '/bankRecord',
      },
    ]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'AddressBook',
    to: '/addressbook',
    icon: <CIcon content={freeSet.cilAddressBook} customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Diary',
    icon: 'cil-pencil',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'DiaryCalendar',
        to: '/diary-calendar',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'DiaryBoard',
        to: '/diary-board',
      },
    ]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Memo',
    to: '/memo',
    icon: 'cil-notes',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'PasswordBook',
    to: '/passwordbook',
    icon: 'cil-puzzle',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Download App',
    href: 'https://webos21.github.io/PersonalDataStorage/',
    target: '_blank',
    rel: 'noreferrer noopener',
    icon: 'cil-cloud-download',
    className: 'mt-auto',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Logout',
    to: '/logout',
    icon: <CIcon content={freeSet.cilAccountLogout} customClasses="c-sidebar-nav-icon" />,
  },
];

export default navItems;
