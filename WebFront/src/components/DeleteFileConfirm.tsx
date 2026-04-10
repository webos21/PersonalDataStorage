let renderCount = 0;

const DeleteFileConfirm = ({ fileList, open, onClose }) => {
    renderCount++;

    if (!open) return null;

    const oneMega = 1024 * 1024;

    const handleCancel = () => onClose(false);
    const handleOk = () => onClose(true);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-sm">
                <div className="p-4 text-xl font-bold border-b">파일 삭제 확인</div>
                <div className="p-4">
                    <p className="text-yellow-600 mb-4">다음 파일(들)을 정말로 삭제하시겠습니까?</p>
                    <div className="flex flex-col gap-2">
                        {fileList?.map((file, index) => {
                            const size = file.size > oneMega 
                                ? (file.size / oneMega).toFixed(2) + ' Mb' 
                                : (file.size / 1024).toFixed(2) + ' Kb';

                            let iconText = '📄';
                            if (/\.(g?zip|tar|gz|rar)$/i.test(file?.name)) iconText = '📦';
                            if (/\.(mp.|midi|mkv|avi)$/i.test(file?.name)) iconText = '▶️';

                            return (
                                <div key={'fileitem' + index + '-' + file.name} className="flex items-center gap-2">
                                    <div className="w-16 h-16 flex items-center justify-center border rounded">
                                        {iconText}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-medium truncate">{file?.name}</span>
                                        <span className="text-xs"><b>{size}</b> | <b>{file?.contentType?.toLowerCase()}</b></span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="p-4 border-t flex justify-end gap-2">
                    <button onClick={handleOk} className="px-4 py-2 bg-red-600 text-white rounded">삭제</button>
                    <button onClick={handleCancel} className="px-4 py-2 bg-gray-500 text-white rounded">취소</button>
                    <span className="ml-auto text-xs self-center">Render: {renderCount}</span>
                </div>
            </div>
        </div>
    );
};

export default DeleteFileConfirm;
