import { useEffect, useState } from 'react';

// project import
import MainCard from './MainCard';

const Skeleton = ({ height = '16px', className = '' }) => (
    <div className={`bg-gray-200 animate-pulse rounded ${className}`} style={{ height }} />
);

const ComponentSkeleton = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    const skeletonCard = (
        <MainCard title="...">
            <div className="space-y-2">
                <Skeleton />
                <Skeleton height="64px" />
                <Skeleton />
                <Skeleton />
            </div>
        </MainCard>
    );

    return (
        <>
            {isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i}>{skeletonCard}</div>
                    ))}
                </div>
            )}
            {!isLoading && children}
        </>
    );
};

export default ComponentSkeleton;
