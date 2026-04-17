import Moment from 'moment';
import { useState } from 'react';
import Constant from '../../utils/Constant';
import CompanyTab from './CompanyTab';

const headCells = ['주문번호', '출발시간/도착시간'];

const OrderList = (props) => {
    const { dataFromParent, display } = props;
    const [rows, setRows] = useState([]);
    const [listControl, setListControl] = useState({
        rowsPerPage: 10,
        currentPage: 1,
        rowsTotal: 0
    });

    const fetchOrderList = (search, order, orderBy, page, limit, tab) => {
        let fetchUri = Constant.REQ_URI + '/api/v1/wwd/orderwwd/list?dummy=1';
        if (search) fetchUri += '&search=' + search;
        if (tab) fetchUri += '&tab=' + tab;
        if (page) fetchUri += '&page=' + page;
        if (limit) fetchUri += '&limit=' + limit;

        fetch(fetchUri, { method: 'GET', headers: { 'Content-type': 'application/json' } })
            .then(res => res.json())
            .then(resJson => {
                setListControl(prev => ({...prev, rowsTotal: resJson.totalCount, currentPage: resJson.requestPage}));
                setRows(resJson.result);
            });
    };

    return (
        <div className={`p-2 bg-white shadow-lg rounded ${display === 'none' ? 'hidden' : 'block'}`}>
            <h5 className="font-bold text-lg mb-2">주문목록</h5>
            <CompanyTab setListControl={(e) => setListControl({ ...listControl, tab: e.tab })} fetchOrderList={fetchOrderList} />
            <div className="overflow-auto max-h-[350px]">
                <table className="w-full border-collapse">
                    <thead className="bg-gray-100">
                        <tr>
                            {headCells.map((label, idx) => <th key={idx} className="p-2 border">{label}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row) => (
                            <tr key={row.id} onClick={() => dataFromParent(row)} className="hover:bg-gray-50 cursor-pointer border-b">
                                <td className="p-2 text-center">{row.name}</td>
                                <td className="p-2 text-center text-sm">
                                    <div>{row.tsStart ? Moment(row.tsStart).format('YY-MM-DD HH:mm') : '-'}</div>
                                    <div>{row.tsEnd ? Moment(row.tsEnd).format('YY-MM-DD HH:mm') : '-'}</div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderList;
