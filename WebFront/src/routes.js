import React from 'react';

const Toaster = React.lazy(() => import('./views/notifications/toaster/Toaster'));
const Tables = React.lazy(() => import('./views/base/tables/Tables'));

const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'));
const Cards = React.lazy(() => import('./views/base/cards/Cards'));
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'));
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'));
const BasicForms = React.lazy(() => import('./views/base/forms/BasicForms'));

const Jumbotrons = React.lazy(() => import('./views/base/jumbotrons/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'));
const Navbars = React.lazy(() => import('./views/base/navbars/Navbars'));
const Navs = React.lazy(() => import('./views/base/navs/Navs'));
const Paginations = React.lazy(() => import('./views/base/paginations/Pagnations'));
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'));
const ProgressBar = React.lazy(() => import('./views/base/progress-bar/ProgressBar'));
const Switches = React.lazy(() => import('./views/base/switches/Switches'));

const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'));
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'));
const BrandButtons = React.lazy(() => import('./views/buttons/brand-buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/buttons/button-dropdowns/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'));
const Charts = React.lazy(() => import('./views/charts/Charts'));
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/icons/flags/Flags'));
const Brands = React.lazy(() => import('./views/icons/brands/Brands'));
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'));
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'));
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'));
const Colors = React.lazy(() => import('./views/theme/colors/Colors'));
const Typography = React.lazy(() => import('./views/theme/typography/Typography'));
const Widgets = React.lazy(() => import('./views/widgets/Widgets'));
const Users = React.lazy(() => import('./views/users/Users'));
const User = React.lazy(() => import('./views/users/User'));

const Dashboard = React.lazy(() => import('./service/Dashboard'));
const AccountClass = React.lazy(() => import('./service/AccountClass'));
const AccountCode = React.lazy(() => import('./service/AccountCode'));
const Anniversary = React.lazy(() => import('./service/Anniversary'));
const Bank = React.lazy(() => import('./service/Bank'));
const BankRecord = React.lazy(() => import('./service/BankRecord'));
const Budget = React.lazy(() => import('./service/Budget'));
const Card = React.lazy(() => import('./service/Card'));
const CardRecord = React.lazy(() => import('./service/CardRecord'));
const Insurance = React.lazy(() => import('./service/Insurance'));
const InsuranceRecord = React.lazy(() => import('./service/InsuranceRecord'));
const RealEstate = React.lazy(() => import('./service/RealEstate'));
const RealEstateRecord = React.lazy(() => import('./service/RealEstateRecord'));
const RegularPay = React.lazy(() => import('./service/RegularPay'));
const RegularRecord = React.lazy(() => import('./service/RegularRecord'));
const Stock = React.lazy(() => import('./service/Stock'));
const StockRecord = React.lazy(() => import('./service/StockRecord'));

const AddressBook = React.lazy(() => import('./service/AddressBook'));
const DiaryBoard = React.lazy(() => import('./service/DiaryBoard'));
const DiaryCalendar = React.lazy(() => import('./service/DiaryCalendar'));
const Memo = React.lazy(() => import('./service/Memo'));
const PasswordBook = React.lazy(() => import('./service/PasswordBook'));
const Record = React.lazy(() => import('./service/Record'));
const Schedule = React.lazy(() => import('./service/Schedule'));
const FileSystem = React.lazy(() => import('./service/FileSystem'));
const Logout = React.lazy(() => import('./service/Logout'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/theme', exact: true, name: 'Theme', component: Colors },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', exact: true, name: 'Base', component: Cards },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/forms', name: 'Forms', component: BasicForms },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', exact: true, name: 'Buttons', component: Buttons },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'Dropdowns', component: ButtonDropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/brands', name: 'Brands', component: Brands },
  { path: '/notifications', exact: true, name: 'Notifications', component: Alerts },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/notifications/toaster', name: 'Toaster', component: Toaster },
  { path: '/widgets', name: 'Widgets', component: Widgets },
  { path: '/users', exact: true, name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },

  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/accountClass', name: 'AccountClass', component: AccountClass },
  { path: '/accountCode', name: 'AccountCode', component: AccountCode },
  { path: '/anniversary', name: 'Anniversary', component: Anniversary },
  { path: '/bank', name: 'Bank', component: Bank },
  { path: '/bankRecord', name: 'BankRecord', component: BankRecord },
  { path: '/budget', name: 'Budget', component: Budget },
  { path: '/card', name: 'Card', component: Card },
  { path: '/cardRecord', name: 'CardRecord', component: CardRecord },
  { path: '/insurance', name: 'Insurance', component: Insurance },
  { path: '/insuranceRecord', name: 'InsuranceRecord', component: InsuranceRecord },
  { path: '/realestate', name: 'RealEstate', component: RealEstate },
  { path: '/realestateRecord', name: 'RealEstateRecord', component: RealEstateRecord },
  { path: '/regularPay', name: 'RegularPay', component: RegularPay },
  { path: '/regularRecord', name: 'RegularRecord', component: RegularRecord },
  { path: '/stock', name: 'Stock', component: Stock },
  { path: '/stockRecord', name: 'StockRecord', component: StockRecord },

  { path: '/addressbook', name: 'AddressBook', component: AddressBook },
  { path: '/diary-board', name: 'DiaryBoard', component: DiaryBoard },
  { path: '/diary-calendar', name: 'DiaryCalendar', component: DiaryCalendar },
  { path: '/memo', name: 'Memo', component: Memo },
  { path: '/passwordbook', name: 'PasswordBook', component: PasswordBook },
  { path: '/record', name: 'Record', component: Record },
  { path: '/schedule', name: 'Schedule', component: Schedule },
  { path: '/fs', name: 'FileSystem', component: FileSystem },
  { path: '/logout', name: 'Logout', component: Logout },
];

export default routes;
