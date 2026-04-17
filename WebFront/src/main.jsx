// library
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router';

// in-project
import App from './app/App';
import './index.css';

// Dynamic Font Loader
const loadFont = () => {
    const fontName = import.meta.env.VITE_APP_FONT || 'Pretendard Variable';
    const root = document.documentElement;

    const fonts = {
        'Pretendard Variable':
            'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css',
        Pretendard: 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css',
        'Noto Sans KR': 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap',
        'Nanum Square Neo': 'https://cdn.jsdelivr.net/gh/moonspam/NanumSquareNeo/nanumsquareneo.css'
    };

    if (fonts[fontName]) {
        const link = document.createElement('link');
        link.href = fonts[fontName];
        link.rel = 'stylesheet';
        document.head.appendChild(link);

        // Set CSS Variable for Tailwind
        root.style.setProperty('--font-dynamic', `"${fontName}"`);
    }
};
loadFont();

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 30 * 1000 // 30초 — 같은 queryKey 재호출 시 30초 내 캐시 사용
            // refetchInterval은 글로벌로 두지 않음 (실시간 맵 등 개별 query에서 설정)
        }
    }
});

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>
);
