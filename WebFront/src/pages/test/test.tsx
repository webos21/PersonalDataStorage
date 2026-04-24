import PageLayout from '@/shared/ui/layout/PageLayout';
import PageHeader from '@/shared/ui/layout/PageHeader';
import { FlaskConical } from 'lucide-react';

const Test = () => {
    return (
        <PageLayout>
            <PageHeader
                icon={FlaskConical}
                title="테스트 페이지"
                desc="구버전 테스트 페이지를 현재 레이아웃으로 정리했습니다."
                iconClass="bg-blue-100 text-blue-600"
            />
            <div className="rounded-lg border border-zinc-200 bg-white p-4 text-sm text-zinc-600">테스트 기능은 추후 현재 아키텍처 기준으로 재구성할 예정입니다.</div>
        </PageLayout>
    );
};

export default Test;
