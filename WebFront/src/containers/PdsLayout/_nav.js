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
    _tag: 'CSidebarNavItem',
    name: 'Anniversary',
    to: '/anniversary',
    icon: 'cil-calendar',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'DiaryBoard',
    to: '/diary-board',
    icon: 'cil-pencil',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'DiaryCalendar',
    to: '/diary-calendar',
    icon: 'cil-pencil',
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
