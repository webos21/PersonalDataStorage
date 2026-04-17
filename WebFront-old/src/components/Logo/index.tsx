import { Link } from 'react-router-dom';
import { CSSProperties } from 'react';

// project import
import Logo from './Logo2';
import config from '../../config';

interface LogoSectionProps {
    sx?: CSSProperties;
    to?: string;
}

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ sx, to }: LogoSectionProps) => (
    <Link to={!to ? config.defaultPath : to} className="block" style={sx}>
        <Logo />
    </Link>
);

export default LogoSection;
