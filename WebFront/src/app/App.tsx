// library imports
import { Routes, Route, Navigate, useLocation } from 'react-router';

// in-project
import { useAuthStore } from '@/shared/stores';

import GlobalErrorBoundary from '@/shared/ui/feedback/GlobalErrorBoundary';
import { ToastProvider } from '@/shared/ui/feedback/Toast';

// in-package
import Layout from './Layout';

// pages
import Login from '../pages/Login';

import Home from '../pages/home/index';

import AccountClass from '../pages/AccountClass/AccountClass';
// import AccountCode from '../pages/AccountCode/AccountCode';
// import Bank from "../pages/Bank/Bank";
// import BankRecord from "../pages/BankRecord/BankRecord";
// import Budget from "../pages/Budget/Budget";
// import Card from "../pages/Card/Card";
// import CardRecord from "../pages/CardRecord/CardRecord";
// import Insurance from "../pages/Insurance/Insurance";
// import InsuranceRecord from "../pages/InsuranceRecord/InsuranceRecord";
// import RealEstate from "../pages/RealEstate/RealEstate";
// import RealEstateRecord from "../pages/RealEstateRecord/RealEstateRecord";
// import RegularPay from "../pages/RegularPay/RegularPay";
// import RegularRecord from "../pages/RegularRecord/RegularRecord";
// import Stock from "../pages/Stock/Stock";
// import StockRecord from "../pages/StockRecord/StockRecord";
// import Record from "../pages/Record/Record";

// import AddressBook from "../pages/AddressBook/AddressBook";
// import Anniversary from "../pages/Anniversary/Anniversary";
// import DiaryBoard from "../pages/DiaryBoard/DiaryBoard";
// import DiaryCalendar from "../pages/DiaryCalendar/DiaryCalendar";
// import Memo from "../pages/Memo/Memo";
// import PasswordBook from "../pages/PasswordBook/PasswordBook";
// import Schedule from "../pages/Schedule/Schedule";

// import FileSystem from "../pages/FileSystem/FileSystem";
// import Test from "../pages/test/test";

// import RealtimeMapPage from '../features/fleet/realtime-map/RealtimeMapPage'
// import TripHistoryPage from '../features/fleet/trip-history/TripHistoryPage'
// import TripReplayPage from '../features/fleet/trip-replay/TripReplayPage'
// import DashboardPage from '../features/fleet/dashboard/DashboardPage'

// import VehicleListPage from '../features/assets/vehicles/VehicleListPage'
// import DriverListPage from '../features/assets/drivers/DriverListPage'
// import DeviceListPage from '../features/assets/devices/DeviceListPage'
// import GroupListPage from '../features/system/groups/GroupListPage'
// import UserListPage from '../features/system/users/UserListPage'
// import PermissionListPage from '../features/system/permissions/PermissionListPage'
// import DrivingLogListPage from '../features/ops/driving-log/DrivingLogListPage'
// import LocationAuditPage from '../features/ops/location-audit/LocationAuditPage'
// import EtasListPage from '../features/ops/etas/EtasListPage'
// import StatisticsPage from '../features/ops/statistics/StatisticsPage'
// import RestLogListPage from '../features/ops/rest-log/RestLogListPage'
// import TermsAgreementPage from '../features/terms/TermsAgreementPage'

interface PrivateRouteProps {
    children: React.ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps) {
    const { authKey, authVal } = useAuthStore();
    const location = useLocation();

    if (!authKey && !authVal && location.pathname !== '/login') {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route
                path="/"
                element={
                    <PrivateRoute>
                        <Layout />
                    </PrivateRoute>
                }
            >
                <Route index element={<Home />} />

                {/* 📡 계정 */}
                <Route path="account">
                    <Route path="account-class" element={<AccountClass />} />
                    {/* <Route path="account-code" element={<AccountCode />} /> */}
                </Route>
            </Route>
        </Routes>
    );
};

export default function App() {
    return (
        <GlobalErrorBoundary>
            <ToastProvider>
                <AppRouter />
            </ToastProvider>
        </GlobalErrorBoundary>
    );
}
