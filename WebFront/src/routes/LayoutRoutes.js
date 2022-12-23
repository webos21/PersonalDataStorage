import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import MainLayout from '../layout/MainLayout';

// render - pages
const Home = Loadable(lazy(() => import('../pages/home')));
const Test = Loadable(lazy(() => import('../pages/test')));

const Dashboard = Loadable(lazy(() => import('../pages/Dashboard')));
const AccountClass = Loadable(lazy(() => import('../pages/AccountClass')));
const AccountCode = Loadable(lazy(() => import('../pages/AccountCode')));
const Anniversary = Loadable(lazy(() => import('../pages/Anniversary')));
const Bank = Loadable(lazy(() => import('../pages/Bank')));
const BankRecord = Loadable(lazy(() => import('../pages/BankRecord')));
const Budget = Loadable(lazy(() => import('../pages/Budget')));
const Card = Loadable(lazy(() => import('../pages/Card')));
const CardRecord = Loadable(lazy(() => import('../pages/CardRecord')));
const Insurance = Loadable(lazy(() => import('../pages/Insurance')));
const InsuranceRecord = Loadable(lazy(() => import('../pages/InsuranceRecord')));
const RealEstate = Loadable(lazy(() => import('../pages/RealEstate')));
const RealEstateRecord = Loadable(lazy(() => import('../pages/RealEstateRecord')));
const RegularPay = Loadable(lazy(() => import('../pages/RegularPay')));
const RegularRecord = Loadable(lazy(() => import('../pages/RegularRecord')));
const Stock = Loadable(lazy(() => import('../pages/Stock')));
const StockRecord = Loadable(lazy(() => import('../pages/StockRecord')));

const AddressBook = Loadable(lazy(() => import('../pages/AddressBook')));
const DiaryBoard = Loadable(lazy(() => import('../pages/DiaryBoard')));
const DiaryCalendar = Loadable(lazy(() => import('../pages/DiaryCalendar')));
const Memo = Loadable(lazy(() => import('../pages/Memo')));
const PasswordBook = Loadable(lazy(() => import('../pages/PasswordBook')));
const Record = Loadable(lazy(() => import('../pages/Record')));
const Schedule = Loadable(lazy(() => import('../pages/Schedule')));
const FileSystem = Loadable(lazy(() => import('../pages/FileSystem')));

const Logout = Loadable(lazy(() => import('../pages/Logout')));

// ==============================|| MAIN ROUTING ||============================== //

const LayoutRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <Home />
        },
        {
            path: '/test',
            element: <Test />
        }
    ]
};

export default LayoutRoutes;
