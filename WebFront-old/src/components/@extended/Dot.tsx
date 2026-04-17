const Dot = ({ color, size = 8 }) => {
    const colorClasses = {
        primary: 'bg-blue-600',
        secondary: 'bg-gray-600',
        error: 'bg-red-600',
        warning: 'bg-yellow-500',
        info: 'bg-sky-500',
        success: 'bg-green-600',
    };

    return (
        <div
            className={`rounded-full ${colorClasses[color] || colorClasses.primary}`}
            style={{ width: size, height: size }}
        />
    );
};

export default Dot;
