import { ComponentPropsWithoutRef, ReactNode } from 'react';

type BaseProps = {
    children?: ReactNode;
    className?: string;
};

export const CModal = ({ show, onClose, className = '', children }: BaseProps & { show?: boolean; onClose?: () => void }) => {
    if (!show) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className={`w-full max-w-2xl rounded-lg bg-white shadow-xl ${className}`}>
                {children}
                <button
                    type="button"
                    aria-label="close"
                    className="sr-only"
                    onClick={onClose}
                >
                    close
                </button>
            </div>
        </div>
    );
};

export const CModalHeader = ({ children, closeButton }: BaseProps & { closeButton?: boolean }) => (
    <div className="flex items-center justify-between border-b px-4 py-3 text-lg font-semibold">
        <span>{children}</span>
        {closeButton ? <span className="text-sm text-gray-400">×</span> : null}
    </div>
);

export const CModalBody = ({ children }: BaseProps) => <div className="space-y-3 px-4 py-4">{children}</div>;

export const CModalFooter = ({ children }: BaseProps) => <div className="flex justify-end gap-2 border-t px-4 py-3">{children}</div>;

export const CButton = ({ color, className = '', children, ...rest }: BaseProps & ComponentPropsWithoutRef<'button'> & { color?: string }) => {
    const tone =
        color === 'danger'
            ? 'bg-red-600 hover:bg-red-700'
            : color === 'warning'
              ? 'bg-amber-600 hover:bg-amber-700'
              : color === 'success'
                ? 'bg-emerald-600 hover:bg-emerald-700'
                : color === 'secondary'
                  ? 'bg-slate-500 hover:bg-slate-600'
                  : 'bg-blue-600 hover:bg-blue-700';
    return (
        <button type="button" className={`rounded px-3 py-2 text-sm font-medium text-white ${tone} ${className}`} {...rest}>
            {children}
        </button>
    );
};

export const CCol = ({ children }: BaseProps) => <div className="w-full">{children}</div>;

export const CForm = ({ children, ...rest }: BaseProps & ComponentPropsWithoutRef<'form'>) => <form {...rest}>{children}</form>;

export const CFormGroup = ({ children }: BaseProps) => <div className="mb-3">{children}</div>;

export const CInvalidFeedback = ({ children }: BaseProps) => <div className="mt-1 text-xs text-red-600">{children}</div>;

export const CInputGroup = ({ children }: BaseProps) => <div className="flex w-full items-stretch gap-2">{children}</div>;

export const CInputGroupPrepend = ({ children }: BaseProps) => <div>{children}</div>;

export const CInputGroupText = ({ children, style }: BaseProps & { style?: Record<string, string | number> }) => (
    <div
        className="inline-flex h-10 items-center rounded border border-gray-300 bg-gray-100 px-3 text-sm text-gray-700"
        style={style}
    >
        {children}
    </div>
);

export const CInput = ({ className = '', ...rest }: ComponentPropsWithoutRef<'input'>) => (
    <input
        className={`h-10 w-full rounded border border-gray-300 px-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${className}`}
        {...rest}
    />
);

export const CTextarea = ({ className = '', ...rest }: ComponentPropsWithoutRef<'textarea'>) => (
    <textarea
        className={`w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${className}`}
        {...rest}
    />
);
