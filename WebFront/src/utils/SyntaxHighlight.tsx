import { FC } from 'react';

// third-party
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

// ==============================|| CODE HIGHLIGHTER ||============================== //

export interface SyntaxHighlightProps {
    children: string;
    language?: string;
    showLineNumbers?: boolean;
    style?: { [key: string]: React.CSSProperties };
    [key: string]: any;
}

const SyntaxHighlight: FC<SyntaxHighlightProps> = ({ children, ...others }) => {
    return (
        <SyntaxHighlighter language="javascript" showLineNumbers style={a11yDark} {...others}>
            {children}
        </SyntaxHighlighter>
    );
};

export default SyntaxHighlight;
