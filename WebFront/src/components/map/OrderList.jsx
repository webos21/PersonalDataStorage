// library import
import {
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from '@mui/material';
import Moment from 'moment';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Constant from '../../utils/Constant';
import CompanyTab from './CompanyTab';

const headCells = [
    {
        id: 'order-name',
        align: 'center',
        disablePadding: false,
        label: '주문번호'
    },
    {
        id: 'time',
        align: 'center',
        disablePadding: false,
        label: '출발시간/도착시간'
    }
];

const TEST_PORT = ':18087';
Constant;
const REQ_URI =
    process.env.NODE_ENV !== 'production'
        ? '//' + window.location.hostname + TEST_PORT + '/api/v1/wwd/orderwwd/list'
        : '/api/v1/wwd/orderwwd/list';

const OrderList = (props) => {
    const { dataFromParent, display } = props;
    const [rows, setRows] = useState([]);
    const [listControl, setListControl] = useState({
        search: undefined,
        order: undefined,
        orderBy: undefined,
        rowsPerPage: 10,
        currentPage: 1,
        rowsTotal: 0,
        pageCount: 1
    });

    // ==============================|| Pouch TABLE - HEADER ||============================== //

    function ProductTableHead({ order, orderBy }) {
        return (
            <TableHead>
                <TableRow>
                    {headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.align}
                            padding={headCell.disablePadding ? 'none' : 'normal'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            {headCell.label.split('/').map((curs, idx) => (
                                <Typography key={'label-split-' + idx}>{curs}</Typography>
                            ))}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }

    ProductTableHead.propTypes = {
        order: PropTypes.string,
        orderBy: PropTypes.string
    };

    // useEffect(() => {
    //     fetchOrderList(listControl.search, listControl.order, listControl.orderBy, listControl.currentPage, listControl.rowsPerPage);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    const fetchOrderList = (search, order, orderBy, page, limit, tab) => {
        try {
            var fetchUri = REQ_URI + '?dummy=1';
            if (search) {
                fetchUri += '&search=' + search;
            }
            if (tab) {
                fetchUri += '&tab=' + tab;
            }
            if (order) {
                fetchUri += '&order=' + order;
            }
            if (orderBy) {
                fetchUri += '&orderBy=' + orderBy;
            }
            if (page) {
                fetchUri += '&page=' + page;
            }
            if (limit) {
                fetchUri += '&limit=' + limit;
            }

            fetch(fetchUri, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                }
            })
                .then((res) => {
                    // console.log('res : ', res);
                    return res.json();
                })
                .then((resJson) => {
                    var pageNo = Math.floor(resJson.totalCount / resJson.rowsPerPage);
                    pageNo += resJson.totalCount % resJson.rowsPerPage == 0 ? 0 : 1;
                    setListControl({
                        search: resJson.search,
                        order: resJson.order,
                        orderBy: resJson.orderBy,
                        rowsPerPage: resJson.rowsPerPage,
                        currentPage: resJson.requestPage,
                        rowsTotal: resJson.totalCount,
                        pageCount: pageNo,
                        tab: tab
                    });
                    // console.log(resJson);
                    setRows(resJson.result);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const handlePage = (e, newPage) => {
        console.log('handlePage', e, newPage, listControl.tab);
        fetchOrderList(listControl.search, listControl.order, listControl.orderBy, newPage + 1, listControl.rowsPerPage, listControl.tab);
    };

    const handleRowsPerPage = (e) => {
        console.log('handleRowsPerPage', e);
        const rowsPerPage = e.target.value;
        fetchOrderList(listControl.search, listControl.order, listControl.orderBy, listControl.currentPage, rowsPerPage, listControl.tab);
    };

    return (
        // <Card sx={{ p: 1, zIndex: 1000, position: 'absolute', bottom: 100 }}>
        <Card sx={{ p: 1, display: display }}>
            <CardContent>
                <Typography variant={'h5'}>주문목록</Typography>
                <CompanyTab
                    setListControl={(e) => {
                        // console.log('e : ', e);
                        setListControl({ ...listControl, tab: e.tab });
                        fetchOrderList(
                            listControl.search,
                            listControl.order,
                            listControl.orderBy,
                            listControl.currentPage,
                            listControl.rowsPerPage,
                            e.tab
                        );
                    }}
                    fetchOrderList={fetchOrderList}
                />
                <TableContainer
                    sx={{
                        width: '100%',
                        maxHeight: '350px',
                        overflowY: 'auto',
                        position: 'relative',
                        display: 'block',
                        maxWidth: '100%',
                        '& td, & th': { whiteSpace: 'nowrap' }
                    }}
                >
                    <Table
                        aria-labelledby="tableTitle"
                        sx={{
                            '& .MuiTableCell-root:first-of-type': {
                                pl: 2
                            },
                            '& .MuiTableCell-root:last-child': {
                                pr: 3
                            }
                        }}
                    >
                        <ProductTableHead />
                        <TableBody>
                            {rows.map((row, index) => {
                                // const isItemSelected = isSelected(row.uid);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        // aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        onClick={() => {
                                            // console.log(row);
                                            dataFromParent(row);
                                        }}
                                        // selected={isItemSelected}
                                    >
                                        <TableCell component="th" id={labelId} scope="row" align="center">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="inherit" sx={{ ml: 'auto' }}>
                                                {row.tsStart ? Moment(row.tsStart).format('yy-MM-DD hh:mm') : '-'}
                                            </Typography>
                                            <Typography variant="inherit" sx={{ ml: 'auto' }}>
                                                {row.tsEnd ? Moment(row.tsEnd).format('yy-MM-DD hh:mm') : '-'}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    count={listControl.rowsTotal}
                    page={listControl.currentPage - 1}
                    rowsPerPage={listControl.rowsPerPage}
                    onPageChange={handlePage}
                    onRowsPerPageChange={handleRowsPerPage}
                />
            </CardContent>
        </Card>
    );
};

export default OrderList;
