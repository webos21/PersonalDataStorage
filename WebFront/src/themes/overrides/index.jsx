// third-party
import { merge } from 'lodash';

// project import
import Badge from './Badge';
import Button from './Button';
import CardContent from './CardContent';
import Checkbox from './Checkbox';
import Chip from './Chip';
import IconButton from './IconButton';
import InputLabel from './InputLabel';
import LinearProgress from './LinearProgress';
import Link from './Link';
import ListItemIcon from './ListItemIcon';
import OutlinedInput from './OutlinedInput';
import Tab from './Tab';
import TableContainer from './TableContainer';
import Table from './Table';
import TableRow from './TableRow';
import TableCell from './TableCell';
import Tabs from './Tabs';
import Typography from './Typography';
import Modal from './Modal';
import MuiDivider from './MuiDivider';

// ==============================|| OVERRIDES - MAIN ||============================== //

export default function ComponentsOverrides(theme) {
    return merge(
        Button(theme),
        Badge(theme),
        CardContent(),
        Checkbox(theme),
        Chip(theme),
        IconButton(theme),
        InputLabel(theme),
        LinearProgress(),
        Link(),
        ListItemIcon(),
        OutlinedInput(theme),
        Tab(theme),
        TableContainer(theme),
        Table(theme),
        TableRow(theme),
        TableCell(theme),
        Tabs(),
        Typography(theme),
        Modal(theme),
        MuiDivider(theme)
    );
}
