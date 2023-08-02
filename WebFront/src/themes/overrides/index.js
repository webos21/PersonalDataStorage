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
import TableCell from './TableCell';
import Tabs from './Tabs';
import Typography from './Typography';
import Table from './Table';
import TableContainer from './TableContainer';
import TableRow from './TableRow';
import Modal from './Modal';

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
        Modal(theme),
        OutlinedInput(theme),
        Tab(theme),
        Table(theme),
        TableCell(theme),
        TableContainer(theme),
        TableRow(theme),
        Tabs(),
        Typography()
    );
}
