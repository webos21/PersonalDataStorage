import React, { useState, ReactNode } from 'react';

// third-party
// @ts-ignore
import { CopyToClipboard } from 'react-copy-to-clipboard';
import reactElementToJSXString from 'react-element-to-jsx-string';

// project import
import SyntaxHighlight from '../utils/SyntaxHighlight';

export interface HighlighterProps {
    children: ReactNode;
    codeHighlight?: boolean;
    main?: boolean;
}

const Highlighter: React.FC<HighlighterProps> = ({ children }) => {
    const [highlight, setHighlight] = useState(false);

    return (
        <div className="relative">
            <div className="flex justify-end p-2 mb-2">
                <div className="flex gap-2">
                    {/* @ts-ignore */}
                    <CopyToClipboard text={reactElementToJSXString(children, { showFunctions: true, maxInlineAttributesLineLength: 100 })}>
                        <button title="Copy the source" className="p-1 text-sm border rounded hover:bg-gray-100">
                            Copy
                        </button>
                    </CopyToClipboard>
                    <div className="border-l mx-1" />
                    <button
                        className={`p-1 text-sm border rounded ${highlight ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                        onClick={() => setHighlight(!highlight)}
                    >
                        Source
                    </button>
                </div>
            </div>
            {highlight && (
                <div className="mt-2">
                    <SyntaxHighlight>
                        {reactElementToJSXString(children, {
                            showFunctions: true,
                            showDefaultProps: false,
                            maxInlineAttributesLineLength: 100
                        })}
                    </SyntaxHighlight>
                </div>
            )}
        </div>
    );
};

export default Highlighter;
