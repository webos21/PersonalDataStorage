/**
 * License Plate Component
 * - Displays vehicle license plate with standard styling
 * @param {string} number - Vehicle number (e.g. "경기 80바 1234")
 * @param {string} type - 'white' (default) | 'yellow' (commercial) | 'green' (eco)
 */
const LicensePlate = ({ number, type = 'white', className = '' }) => {

    const styles = {
        white: 'bg-white text-zinc-900 border-zinc-300',
        yellow: 'bg-yellow-400 text-zinc-900 border-yellow-500', // Commercial
        green: 'bg-blue-100 text-blue-900 border-blue-200', // Electric (simplified)
    };

    const baseStyle = "inline-block px-2 py-0.5 rounded border border-b-2 font-bold text-sm tracking-tight shadow-sm";

    return (
        <span className={`${baseStyle} ${styles[type] || styles.white} ${className}`}>
            {number}
        </span>
    );
};

export default LicensePlate;
