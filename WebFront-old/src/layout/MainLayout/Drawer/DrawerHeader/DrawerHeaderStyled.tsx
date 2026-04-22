// ==============================|| DRAWER HEADER - STYLED ||============================== //

const DrawerHeaderStyled = ({ open, className = '', children }) => (
    <div className={`flex h-16 items-center ${open ? 'justify-start pl-3' : 'justify-center pl-0'} ${className}`}>
        {children}
    </div>
);

export default DrawerHeaderStyled;
