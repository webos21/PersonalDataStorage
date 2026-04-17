// icon imports
import { MdElectricMeter } from 'react-icons/md';

// ==============================|| MENU ITEMS - PDS ||============================== //

const icons = {
    ElectricMeter: MdElectricMeter
};

const pds = {
    id: 'group-pds',
    title: 'Personal Data Storage',
    type: 'collapse-group',
    icon: icons.ElectricMeter,
    children: [
        { id: 'accountClass', title: 'AccountClass', type: 'item', url: '/accountClass', icon: icons.ElectricMeter, level: 1.0 },
        { id: 'accountCode', title: 'AccountCode', type: 'item', url: '/accountCode', icon: icons.ElectricMeter, level: 1.0 },
        { id: 'addressBook', title: 'AddressBook', type: 'item', url: '/addressBook', icon: icons.ElectricMeter, level: 1.0 },
        { id: 'anniversary', title: 'Anniversary', type: 'item', url: '/anniversary', icon: icons.ElectricMeter, level: 1.0 },
        { id: 'bank', title: 'Bank', type: 'item', url: '/bank', icon: icons.ElectricMeter, level: 1.0 },
        { id: 'bankRecord', title: 'BankRecord', type: 'item', url: '/bankRecord', icon: icons.ElectricMeter, level: 1.0 },
        { id: 'budget', title: 'Budget', type: 'item', url: '/budget', icon: icons.ElectricMeter, level: 1.0 },
        { id: 'card', title: 'Card', type: 'item', url: '/card', icon: icons.ElectricMeter, level: 1.0 },
        { id: 'cardRecord', title: 'CardRecord', type: 'item', url: '/cardRecord', icon: icons.ElectricMeter, level: 1.0 },
        { id: 'diaryBoard', title: 'DiaryBoard', type: 'item', url: '/diaryBoard', icon: icons.ElectricMeter, level: 1.0 },
        { id: 'diaryCalendar', title: 'DiaryCalendar', type: 'item', url: '/diaryCalendar', icon: icons.ElectricMeter, level: 1.0 },
        { id: 'fileSystem', title: 'FileSystem', type: 'item', url: '/fileSystem', icon: icons.ElectricMeter, level: 1.0 },
        { id: 'insurance', title: 'Insurance', type: 'item', url: '/insurance', icon: icons.ElectricMeter, level: 1.0 },
        { id: 'insuranceRecord', title: 'InsuranceRecord', type: 'item', url: '/insuranceRecord', icon: icons.ElectricMeter, level: 1.0 },
        { id: 'memo', title: 'Memo', type: 'item', url: '/memo', icon: icons.ElectricMeter, level: 1.0 },
        { id: 'passwordBook', title: 'PasswordBook', type: 'item', url: '/passwordBook', icon: icons.ElectricMeter, level: 1.0 },
        { id: 'realEstate', title: 'RealEstate', type: 'item', url: '/realEstate', icon: icons.ElectricMeter, level: 1.0 },
        { id: 'realEstateRecord', title: 'RealEstateRecord', type: 'item', url: '/realEstateRecord', icon: icons.ElectricMeter, level: 1.0 },
        { id: 'record', title: 'Record', type: 'item', url: '/record', icon: icons.ElectricMeter, level: 1.0 },
        { id: 'regularPay', title: 'RegularPay', type: 'item', url: '/regularPay', icon: icons.ElectricMeter, level: 1.0 },
        { id: 'regularRecord', title: 'RegularRecord', type: 'item', url: '/regularRecord', icon: icons.ElectricMeter, level: 1.0 },
        { id: 'schedule', title: 'Schedule', type: 'item', url: '/schedule', icon: icons.ElectricMeter, level: 1.0 },
        { id: 'stock', title: 'Stock', type: 'item', url: '/stock', icon: icons.ElectricMeter, level: 1.0 },
        { id: 'stockRecord', title: 'StockRecord', type: 'item', url: '/stockRecord', icon: icons.ElectricMeter, level: 1.0 },
        { id: 'test', title: 'Test', type: 'item', url: '/test', icon: icons.ElectricMeter, level: 1.0 }
    ]
};

export default pds;
