import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import Notification from './Notification';

const HeaderContent = () => {
    const location = useLocation();

    const pageTitle = useMemo(() => {
        if (location.pathname === '/') return '대시보드';
        const raw = location.pathname.split('/').filter(Boolean).join(' / ');
        return raw || '대시보드';
    }, [location.pathname]);

    const subtitle = useMemo(() => '시스템 현황 및 주요 지표 모니터링', []);

    return (
        <div className="flex w-full items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-indigo-100 text-sm text-indigo-500">〰</div>
                <div>
                    <p className="truncate text-xl font-semibold text-slate-800">{pageTitle}</p>
                    <p className="text-xs text-slate-500">{subtitle}</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Notification />
            </div>
        </div>
    );
};

export default HeaderContent;
