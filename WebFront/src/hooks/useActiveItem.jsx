import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { activeItem } from '../store/reducers/menu';

// 현재 위치가 바뀔 때마다 실행되는 훅
const useActiveItem = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        // 현재 경로를 기준으로 activeItem을 설정합니다.
        const currentPath = location.pathname.split('/')[1]; // 또는 당신의 URL 구조에 맞게 조정하세요
        dispatch(activeItem({ openItem: [currentPath] }));
    }, [location, dispatch]);
};

export default useActiveItem;
