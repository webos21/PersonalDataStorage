import React from 'react';

// Basic utility wrappers
export const Skeleton: React.FC<any> = (props) => <div className="bg-gray-200 animate-pulse rounded" {...props} />;
export const Stack: React.FC<any> = ({ children, ...props }) => <div className="flex flex-col gap-4" {...props}>{children}</div>;
export const Grid: React.FC<any> = ({ children, ...props }) => <div className="grid grid-cols-12 gap-4" {...props}>{children}</div>;
export const Button: React.FC<any> = ({ children, ...props }) => <button className="px-4 py-2 bg-blue-600 text-white rounded" {...props}>{children}</button>;
export const Box: React.FC<any> = ({ children, component: Component = 'div', ...props }) => <Component {...props}>{children}</Component>;
export const Typography: React.FC<any> = ({ children, ...props }) => <p {...props}>{children}</p>;
export const IconButton: React.FC<any> = ({ children, ...props }) => <button {...props}>{children}</button>;

// Card components
export const Card: React.FC<any> = ({ children, ...props }) => <div className="bg-white shadow rounded-lg p-4" {...props}>{children}</div>;
export const CardContent: React.FC<any> = ({ children, ...props }) => <div className="p-4" {...props}>{children}</div>;
export const CardHeader: React.FC<any> = ({ title, ...props }) => <div className="font-bold text-lg mb-2" {...props}>{title}</div>;

// Form components
export const TextField: React.FC<any> = (props) => <input className="border p-2 rounded" {...props} />;
export const FormControl: React.FC<any> = ({ children, ...props }) => <div className="flex flex-col" {...props}>{children}</div>;
export const InputLabel: React.FC<any> = ({ children, ...props }) => <label {...props}>{children}</label>;
export const Select: React.FC<any> = ({ children, ...props }) => <select className="border p-2 rounded" {...props}>{children}</select>;
export const MenuItem: React.FC<any> = ({ children, ...props }) => <option {...props}>{children}</option>;

// Layout
export const AppBar: React.FC<any> = ({ children, ...props }) => <header className="bg-white shadow" {...props}>{children}</header>;
export const Toolbar: React.FC<any> = ({ children, ...props }) => <div className="flex items-center" {...props}>{children}</div>;

// Table
export const Table: React.FC<any> = ({ children, ...props }) => <table {...props}>{children}</table>;
export const TableBody: React.FC<any> = ({ children, ...props }) => <tbody {...props}>{children}</tbody>;
export const TableCell: React.FC<any> = ({ children, ...props }) => <td {...props}>{children}</td>;
export const TableHead: React.FC<any> = ({ children, ...props }) => <thead {...props}>{children}</thead>;
export const TableRow: React.FC<any> = ({ children, ...props }) => <tr {...props}>{children}</tr>;

export const useMediaQuery = () => false;
export const useTheme = () => ({ breakpoints: { down: () => false } });
export const CssBaseline = () => null;
export const StyledEngineProvider = ({ children }) => <>{children}</>;
