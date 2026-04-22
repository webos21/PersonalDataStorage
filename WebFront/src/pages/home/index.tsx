import { House } from 'lucide-react';

import PageLayout from '@/shared/ui/layout/PageLayout';
import PageHeader from '@/shared/ui/layout/PageHeader';

const stats = [
    {
        title: '전체 운행 차량',
        value: '0 (0%)',
        hint: '전체 0대',
        color: 'bg-emerald-500',
        icon: '▶'
    },
    {
        title: '전체 운행 거리',
        value: '0 km',
        hint: '-',
        color: 'bg-blue-500',
        icon: '◎'
    },
    {
        title: '전체 운행 시간',
        value: '-',
        hint: '-',
        color: 'bg-violet-500',
        icon: '◔'
    },
    {
        title: '전체 트립 건수',
        value: '0',
        hint: '-',
        color: 'bg-amber-500',
        icon: '#'
    }
];

const HomeDefault = () => {
    return (
        <PageLayout>
            <PageHeader icon={House} title="대시보드" desc="시스템 현황 및 주요 지표 모니터링" iconClass="bg-blue-100 text-blue-600" />
            <div className="space-y-5">
                <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-xl font-semibold text-slate-800">대시보드</h1>
                            <p className="mt-1 text-sm text-slate-500">시스템 현황 및 주요 지표 모니터링</p>
                        </div>
                        <div className="rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-500">5일</div>
                    </div>
                </section>

                <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {stats.map((item) => (
                        <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                            <div className="flex items-start gap-3">
                                <div className={`mt-1 flex h-8 w-8 items-center justify-center rounded-lg text-white ${item.color}`}>
                                    {item.icon}
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">{item.title}</p>
                                    <p className="mt-1 text-2xl font-semibold text-slate-800">{item.value}</p>
                                    <p className="mt-1 text-xs text-slate-400">{item.hint}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>

                <section className="grid grid-cols-1 gap-3 xl:grid-cols-3">
                    <div className="h-56 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                        <p className="text-sm font-medium text-slate-700">운행 거리 Max 3</p>
                        <p className="mt-24 text-center text-sm text-slate-300">데이터 없음</p>
                    </div>
                    <div className="h-56 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                        <p className="text-sm font-medium text-slate-700">운행 시간 Max 3</p>
                        <p className="mt-24 text-center text-sm text-slate-300">데이터 없음</p>
                    </div>
                    <div className="h-56 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                        <p className="text-sm font-medium text-slate-700">운행 비교</p>
                        <p className="mt-24 text-center text-sm text-slate-300">데이터 없음</p>
                    </div>
                </section>
            </div>
        </PageLayout>
    );
};

export default HomeDefault;
