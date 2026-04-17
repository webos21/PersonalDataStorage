import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import MainLayout from '../layout/MainLayout';

// render - pages
const Home = Loadable(lazy(() => import('../pages/home/index')));
const Test = Loadable(lazy(() => import('../pages/test/test')));
const AccountClass = Loadable(lazy(() => import('../pages/AccountClass/AccountClass')));
const AccountCode = Loadable(lazy(() => import('../pages/AccountCode/AccountCode')));
const AddressBook = Loadable(lazy(() => import('../pages/AddressBook/AddressBook')));
const Anniversary = Loadable(lazy(() => import('../pages/Anniversary/Anniversary')));
const Bank = Loadable(lazy(() => import('../pages/Bank/Bank')));
const BankRecord = Loadable(lazy(() => import('../pages/BankRecord/BankRecord')));
const Budget = Loadable(lazy(() => import('../pages/Budget/Budget')));
const Card = Loadable(lazy(() => import('../pages/Card/Card')));
const CardRecord = Loadable(lazy(() => import('../pages/CardRecord/CardRecord')));
const DiaryBoard = Loadable(lazy(() => import('../pages/DiaryBoard/DiaryBoard')));
const DiaryCalendar = Loadable(lazy(() => import('../pages/DiaryCalendar/DiaryCalendar')));
const FileSystem = Loadable(lazy(() => import('../pages/FileSystem/FileSystem')));
const Insurance = Loadable(lazy(() => import('../pages/Insurance/Insurance')));
const InsuranceRecord = Loadable(lazy(() => import('../pages/InsuranceRecord/InsuranceRecord')));
const Memo = Loadable(lazy(() => import('../pages/Memo/Memo')));
const PasswordBook = Loadable(lazy(() => import('../pages/PasswordBook/PasswordBook')));
const RealEstate = Loadable(lazy(() => import('../pages/RealEstate/RealEstate')));
const RealEstateRecord = Loadable(lazy(() => import('../pages/RealEstateRecord/RealEstateRecord')));
const Record = Loadable(lazy(() => import('../pages/Record/Record')));
const RegularPay = Loadable(lazy(() => import('../pages/RegularPay/RegularPay')));
const RegularRecord = Loadable(lazy(() => import('../pages/RegularRecord/RegularRecord')));
const Schedule = Loadable(lazy(() => import('../pages/Schedule/Schedule')));
const Stock = Loadable(lazy(() => import('../pages/Stock/Stock')));
const StockRecord = Loadable(lazy(() => import('../pages/StockRecord/StockRecord')));

// ==============================|| MAIN ROUTING ||============================== //

const LayoutRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        { path: '/', element: <Home /> },
        { path: '/accountClass', element: <AccountClass /> },
        { path: '/accountCode', element: <AccountCode /> },
        { path: '/addressBook', element: <AddressBook /> },
        { path: '/anniversary', element: <Anniversary /> },
        { path: '/bank', element: <Bank /> },
        { path: '/bankRecord', element: <BankRecord /> },
        { path: '/budget', element: <Budget /> },
        { path: '/card', element: <Card /> },
        { path: '/cardRecord', element: <CardRecord /> },
        { path: '/diaryBoard', element: <DiaryBoard /> },
        { path: '/diaryCalendar', element: <DiaryCalendar /> },
        { path: '/fileSystem', element: <FileSystem /> },
        { path: '/insurance', element: <Insurance /> },
        { path: '/insuranceRecord', element: <InsuranceRecord /> },
        { path: '/memo', element: <Memo /> },
        { path: '/passwordBook', element: <PasswordBook /> },
        { path: '/realEstate', element: <RealEstate /> },
        { path: '/realEstateRecord', element: <RealEstateRecord /> },
        { path: '/record', element: <Record /> },
        { path: '/regularPay', element: <RegularPay /> },
        { path: '/regularRecord', element: <RegularRecord /> },
        { path: '/schedule', element: <Schedule /> },
        { path: '/stock', element: <Stock /> },
        { path: '/stockRecord', element: <StockRecord /> },
        { path: '/test', element: <Test /> }
    ]
};

export default LayoutRoutes;
