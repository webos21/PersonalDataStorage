import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import FileAttachment from './FileAttachment.jsx';

const FileUpload = forwardRef(
    (
        {
            title, header, onError, disabled, multiFile, leftLabel, rightLabel, 
            buttonLabel, maxFileSize, defaultFiles, onFilesChange, maxUploadFiles, 
            errorSizeMessage, allowedMimeTypes, buttonRemoveLabel, filesContainerHeight, 
            maxFilesContainerHeight, customHandle, fileRemoveEvent, containerProps, ...others
        },
        ref
    ) => {
        useImperativeHandle(ref, () => ({ handleRemoveFile }));

        const [error, setError] = useState();
        const [animate, setAnimate] = useState(false);
        const [files, setFiles] = useState([]);
        const [orgFiles, setOrgFiles] = useState([]);

        const filesCardRef = useRef();
        const inputRef = useRef();

        const renderPreview = (event, filesTab) => {
            setAnimate(false);
            setError(null);

            if (!filesTab && event?.target?.files) filesTab = event?.target?.files;
            if (!filesTab) return onError(`Empty file input`);

            if (maxUploadFiles && maxUploadFiles - files.length <= 0) {
                const msg = `You cannot attach more than ${maxUploadFiles} files`;
                setError(msg);
                return onError(msg);
            }

            setOrgFiles([...orgFiles, ...filesTab]);

            if (window.FileReader) {
                for (let i = 0; i < filesTab?.length; i++) {
                    let file = filesTab[i];
                    if (maxFileSize && file.size > 1024 * 1024 * maxFileSize) {
                        const msg = errorSizeMessage || `The size of files cannot exceed ${maxFileSize}Mb`;
                        setError(msg);
                        onError(msg);
                        break;
                    }
                    if (allowedMimeTypes?.length > 0 && !allowedMimeTypes.includes(file.type)) {
                        const msg = `MIME-TYPE '${file.type}' has been excluded`;
                        setError(msg);
                        onError(msg);
                        break;
                    }
                    let reader = new FileReader();
                    reader.onload = function () {
                        setFiles(f => [...f, { name: file.name, size: file.size, path: this.result, contentType: file.type }]);
                    };
                    reader.readAsDataURL(file);
                }
            }
        };

        const handleRemoveFile = (index) => {
            if (inputRef.current) inputRef.current.value = '';
            if (typeof index !== 'number') {
                setFiles([]);
                if(fileRemoveEvent) fileRemoveEvent();
                if(onFilesChange) onFilesChange([]);
                return;
            }
            files?.splice(index, 1);
            orgFiles?.splice(index, 1);
            setFiles([...files]);
            setOrgFiles([...orgFiles]);
            if(fileRemoveEvent) fileRemoveEvent();
        };

        const handleDrag = useCallback((event) => { event.preventDefault(); setAnimate(event.type === 'dragover'); }, []);
        const handleDrop = useCallback((event) => { event.preventDefault(); setAnimate(false); renderPreview(event, event.dataTransfer.files); if(customHandle) customHandle(event.dataTransfer.files); }, []);

        useEffect(() => { if (defaultFiles) { setFiles(defaultFiles); setOrgFiles(defaultFiles); } }, [defaultFiles]);

        return (
            <div ref={filesCardRef} className="border border-gray-300 p-2 rounded" {...containerProps} {...others}>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>{title}</span>
                    {files.length > 0 && <span>{files.length} {maxUploadFiles ? `/${maxUploadFiles}` : ''} files</span>}
                </div>
                <div onDragOver={handleDrag} onDragLeave={handleDrag} onDrop={handleDrop} className={`p-4 transition-colors text-center ${animate ? 'bg-blue-100' : 'bg-gray-50'}`}>
                    <p className="font-bold">{header}</p>
                    <div className="text-xs">
                        {leftLabel}
                        <button disabled={disabled} onClick={() => inputRef.current?.click()} className="mx-1 px-2 py-1 border rounded text-gray-600">
                            {buttonLabel}
                        </button>
                        {rightLabel}
                    </div>
                    <input type="file" accept={allowedMimeTypes} ref={inputRef} multiple={multiFile} onChange={(e) => { if(customHandle) customHandle(e.target.files); renderPreview(e); }} className="hidden" />
                </div>
                {error && <div className="text-red-500 text-xs mt-1 bg-red-50 p-2 border border-red-200">{error}</div>}
                {files.length > 0 && (
                    <div className="mt-2" style={{ maxHeight: maxFilesContainerHeight, overflowY: 'auto' }}>
                        {files.map((file, index) => (
                            <FileAttachment key={index} file={file} index={index} disabled={disabled} onRemoveAttach={handleRemoveFile} />
                        ))}
                        <div className="text-right mt-1">
                            <button onClick={handleRemoveFile} className="text-xs text-gray-600">{buttonRemoveLabel || 'Remove all'}</button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
);

export default FileUpload;