import React, { lazy } from 'react';

const WidgetsDropdown = lazy(() => import('../../views/widgets/WidgetsDropdown'));
const WidgetsBrand = lazy(() => import('../../views/widgets/WidgetsBrand'));
const MainChartExample = lazy(() => import('../../views/charts/MainChartExample'));

const Dashboard = () => {
    return (
        <div className="space-y-6">
            <WidgetsDropdown />
            
            <div className="bg-white shadow rounded">
                <div className="p-4 border-b">
                    <div className="flex justify-between items-center">
                        <div>
                            <h4 className="font-bold text-lg">Traffic</h4>
                            <div className="text-gray-500 text-sm">November 2017</div>
                        </div>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 border rounded hover:bg-gray-100">Download</button>
                            {['Day', 'Month', 'Year'].map(value => (
                                <button key={value} className={`px-4 py-2 border rounded ${value === 'Month' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}>
                                    {value}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="p-4">
                    <MainChartExample className="h-[300px] mt-10" />
                </div>
                <div className="p-4 border-t grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                    {[
                        { label: 'Visits', value: '29.703 Users (40%)', color: 'bg-green-500' },
                        { label: 'Unique', value: '24.093 Users (20%)', color: 'bg-sky-500' },
                        { label: 'Pageviews', value: '78.706 Views (60%)', color: 'bg-yellow-500' },
                        { label: 'New Users', value: '22.123 Users (80%)', color: 'bg-red-500' },
                        { label: 'Bounce Rate', value: 'Average Rate (40.15%)', color: 'bg-gray-500' },
                    ].map((item, i) => (
                        <div key={i}>
                            <div className="text-gray-500 text-sm">{item.label}</div>
                            <strong className="block my-1">{item.value}</strong>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div className={`${item.color} h-1.5 rounded-full`} style={{ width: '40%' }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <WidgetsBrand withCharts />

            <div className="bg-white shadow rounded">
                <div className="p-4 border-b font-bold">Traffic & Sales</div>
                <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 border-l-4 border-sky-500 bg-gray-50">
                                    <div className="text-gray-500 text-sm">New Clients</div>
                                    <div className="text-xl font-bold">9,123</div>
                                </div>
                                <div className="p-4 border-l-4 border-red-500 bg-gray-50">
                                    <div className="text-gray-500 text-sm">Recurring Clients</div>
                                    <div className="text-xl font-bold">22,643</div>
                                </div>
                            </div>
                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                                <div key={day} className="flex items-center gap-4">
                                    <span className="w-24 text-sm">{day}</span>
                                    <div className="flex-grow space-y-1">
                                        <div className="bg-sky-500 h-2 rounded" style={{ width: '50%' }}></div>
                                        <div className="bg-red-500 h-2 rounded" style={{ width: '80%' }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 border-l-4 border-yellow-500 bg-gray-50">
                                    <div className="text-gray-500 text-sm">Pageviews</div>
                                    <div className="text-xl font-bold">78,623</div>
                                </div>
                                <div className="p-4 border-l-4 border-green-500 bg-gray-50">
                                    <div className="text-gray-500 text-sm">Organic</div>
                                    <div className="text-xl font-bold">49,123</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;