import { useEffect } from 'react';
import { FolderOpen } from 'lucide-react';
import PageLayout from '@/shared/ui/layout/PageLayout';
import PageHeader from '@/shared/ui/layout/PageHeader';

const FileSystem = () => {
    useEffect(() => {
        if (process.env.NODE_ENV === 'production') {
            window.location.href = '/pds/v1/fs/';
        }
    }, []);

    return (
        <PageLayout>
            <PageHeader icon={FolderOpen} title="파일탐색" desc="웹 파일 시스템 연동" iconClass="bg-blue-100 text-blue-600" />

            <section className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-3xl rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
                    <div className="flex items-start gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                            <FolderOpen size={28} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">File Man.</h2>
                            <p className="mt-2 text-zinc-600">파일 시스템 화면을 WebFront 레이아웃으로 감싸는 작업을 진행 중입니다.</p>
                            <p className="mt-1 text-sm text-zinc-500">실제 파일 브라우저는 `http://localhost:28080/pds/v1/fs/` 경로에서 확인할 수 있습니다.</p>
                        </div>
                    </div>
                </div>
            </section>
        </PageLayout>
    );
};

export default FileSystem;
