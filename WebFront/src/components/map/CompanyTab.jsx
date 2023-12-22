import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, FormControlLabel, Radio, RadioGroup, Tab } from '@mui/material';
import { useState } from 'react';

const CompanyTab = (props) => {
    const { setListControl } = props;
    const companyList = {
        m2cloud: {
            companyId: 'm2cloud',
            companyName: 'm2cloud(배송)'
        },
        optilo_d: {
            companyId: 'optilo_delivery',
            companyName: 'Optilo(배송)'
        },
        optilo_r: {
            companyId: 'optilo_return',
            companyName: 'Optilo(수거)'
        }
    };

    const titleInfo = {
        healthCheck: {
            companyType: '국건영',
            companies: [companyList.m2cloud]
        },
        immune: {
            companyType: '이뮨셀',
            companies: [companyList.optilo_d, companyList.optilo_r]
        }
    };

    const [viewControl, setViewControl] = useState({
        selectedCompanyType: 'healthCheck',
        selectedCompanyId: undefined
    });

    return (
        <TabContext value={viewControl.selectedCompanyType}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList
                    onChange={(_e, value) => {
                        setViewControl({ ...viewControl, selectedCompanyType: value });
                    }}
                >
                    {Object.keys(titleInfo).map((k, index) => {
                        return <Tab key={'tabkey' + index + '-' + k} label={titleInfo[k].companyType} value={k} />;
                    })}
                </TabList>
            </Box>
            {Object.keys(titleInfo).map((k, kidx) => {
                return (
                    <TabPanel value={k} key={'tabpanel' + kidx + '-' + k}>
                        <RadioGroup
                            id={'radio_' + k}
                            row
                            onChange={(_e, cId) => {
                                console.log('RadioGroup.' + k, cId);
                                setViewControl({ ...viewControl, selectedCompanyId: cId });
                                let keyword;
                                if (cId === 'm2cloud') {
                                    keyword = '29';
                                }
                                if (cId === 'optilo_return') {
                                    keyword = 'optilo_return';
                                }
                                if (cId === 'optilo_delivery') {
                                    keyword = 'optilo_delivery';
                                }
                                setListControl({
                                    // ...listControl,
                                    tab: keyword
                                });
                                // // dataChangedCallback();
                                // fetchOrderList(
                                //     null,
                                //     listControl.order,
                                //     listControl.orderBy,
                                //     listControl.currentPage,
                                //     listControl.rowsPerPage,
                                //     keyword
                                // );
                            }}
                        >
                            {titleInfo[k].companies.map((c, index) => {
                                return (
                                    <FormControlLabel
                                        id={'radio_' + k}
                                        key={'radio_' + k + index + '-' + c.companyId}
                                        value={c.companyId}
                                        control={<Radio />}
                                        label={c.companyName}
                                    />
                                );
                            })}
                        </RadioGroup>
                    </TabPanel>
                );
            })}
        </TabContext>
    );
};

export default CompanyTab;
