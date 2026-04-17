import { useState, useEffect, useCallback } from 'react';

interface Position {
    x: number;
    y: number;
}

interface DraggableOptions {
    initialPosition?: Position;
    persistenceKey?: string | null;
}

interface DraggableStoreReturn {
    position: Position;
    isDragging: boolean;
    handleMouseDown: (e: React.MouseEvent) => void;
}

const useDraggableStore = (options: DraggableOptions = {}): DraggableStoreReturn => {
    const { initialPosition = { x: 0, y: 0 }, persistenceKey = null } = options;

    // Initialize state from localStorage if available, otherwise use initialPosition
    const [position, setPosition] = useState<Position>(() => {
        if (persistenceKey) {
            const saved = localStorage.getItem(persistenceKey);
            if (saved) {
                try {
                    return JSON.parse(saved) as Position;
                } catch (e) {
                    console.error('Failed to parse saved position', e);
                }
            }
        }
        return initialPosition;
    });

    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });

    const handleMouseDown = useCallback(
        (e: React.MouseEvent) => {
            setIsDragging(true);
            setDragOffset({
                x: e.clientX - position.x,
                y: e.clientY - position.y
            });
        },
        [position]
    );

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (isDragging) {
                const newPos: Position = {
                    x: e.clientX - dragOffset.x,
                    y: e.clientY - dragOffset.y
                };
                setPosition(newPos);
            }
        },
        [isDragging, dragOffset]
    );

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    // Save to localStorage when position changes (debounced or on drag end would be better, but simple is fine for now)
    useEffect(() => {
        if (persistenceKey && !isDragging) {
            localStorage.setItem(persistenceKey, JSON.stringify(position));
        }
    }, [position, isDragging, persistenceKey]);

    // Global event listeners
    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, handleMouseMove, handleMouseUp]);

    return {
        position,
        isDragging,
        handleMouseDown
    };
};

export default useDraggableStore;
