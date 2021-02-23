/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer'
    },
    {
      name: 'PasswordBook',
      url: '/passwordbook',
      icon: 'icon-key',
    },
    {
      name: 'DiaryBoard',
      url: '/diary-board',
      icon: 'icon-notebook',
    },
    {
      name: 'DiaryCalendar',
      url: '/diary-calendar',
      icon: 'icon-notebook',
    },
    {
      name: 'Memo',
      url: '/memo',
      icon: 'icon-note',
    },
    {
      name: 'Download App',
      url: 'https://webos21.github.io/PersonalDataStorage/',
      icon: 'icon-cloud-download',
      class: 'mt-auto',
      variant: 'success',
      attributes: { target: '_blank', rel: "noopener" },
    },
    {
      name: 'Logout',
      url: '/logout',
      icon: 'icon-lock',
      variant: 'danger',
    },
  ],

};
