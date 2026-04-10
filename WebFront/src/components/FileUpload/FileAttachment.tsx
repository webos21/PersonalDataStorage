function FileAttachment(props) {
    const { file, index, disabled, onRemoveAttach } = props;

    const oneMega = 1024 * 1024;
    const size = file.size > oneMega 
        ? (file.size / oneMega).toFixed(2) + ' Mb' 
        : (file.size / 1024).toFixed(2) + ' Kb';

    let iconText = '📄';
    if (/\.(g?zip|tar|gz|rar)$/i.test(file?.name)) iconText = '📦';
    if (/\.(mp.|midi|mkv|avi)$/i.test(file?.name)) iconText = '▶️';

    return (
        <div className="flex items-center p-1 hover:bg-gray-100">
            <div className="flex flex-grow items-center">
                <div className="w-8 h-8 flex items-center justify-center m-1">
                    {iconText}
                </div>
                <div className="flex flex-col ml-2 overflow-hidden">
                    <span className="text-sm truncate">{file?.name}</span>
                    <span className="text-xs">
                        <b>{size}</b> | <b>{file?.contentType?.toLowerCase()}</b>
                    </span>
                </div>
            </div>
            <div className="text-right">
                <button 
                    disabled={disabled} 
                    onClick={() => onRemoveAttach(index)}
                    className="p-1 hover:bg-gray-200 rounded"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}

export default FileAttachment;
