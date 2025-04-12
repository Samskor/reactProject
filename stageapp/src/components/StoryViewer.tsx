import React, { useEffect, useRef, useState } from 'react';
import { Story } from '../types';
import styles from './StoryViewer.module.css';

interface StoryViewerProps {
    stories: Story[];
    initialIndex: number;
    onClose: () => void;
    setCurrentIndex: (index: number) => void;
    onMarkAsViewed: (id: string) => void;
}

const StoryViewer: React.FC<StoryViewerProps> = ({
    stories,
    initialIndex,
    onClose,
    onMarkAsViewed,
    setCurrentIndex
}) => {
    const [currentIndex, setLocalIndex] = useState(initialIndex);
    const [progress, setProgress] = useState(0);
    const [progressOffset, setProgressOffset] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const holdStartRef = useRef<number | null>(null);

    const currentStory = stories[currentIndex];

    useEffect(() => {
        setProgress(0);
        setProgressOffset(0);
        setCurrentIndex(currentIndex);
        onMarkAsViewed(currentStory.id);
    }, [currentIndex]);

    useEffect(() => {
        const start = Date.now();

        // Story timer progress logic
        timerRef.current = setInterval(() => {
            if (!isPaused) {
                const elapsed = Date.now() - start;
                const total = progressOffset + elapsed;
                const newProgress = Math.min((total / 5000) * 100, 100);
                setProgress(newProgress);

                if (newProgress >= 100) {
                    clearInterval(timerRef.current!);
                    if (currentIndex < stories.length - 1) {
                        setLocalIndex((prev) => prev + 1);
                    } else {
                        onClose();
                    }
                }
            }
        }, 50);

        return () => clearInterval(timerRef.current!);
    }, [currentIndex, isPaused, progressOffset, onClose, stories.length]);

    //--------- Handle long holds ----------
    const handleHoldStart = () => {
        holdStartRef.current = Date.now();
        setIsPaused(true);
        setProgressOffset((progress / 100) * 5000);
    };

    const handleHoldEnd = () => {
        setIsPaused(false);
    };
    //----------------------------------------

    const handleClick = (e: React.MouseEvent) => {
        const heldDuration = holdStartRef.current ? Date.now() - holdStartRef.current : 0;
        holdStartRef.current = null;

        if (heldDuration > 100) return; // to ignore click if it was a long press

        const bounds = e.currentTarget.getBoundingClientRect();
        const isLeft = e.clientX < bounds.width / 2;

        clearInterval(timerRef.current!);

        if (isLeft && currentIndex > 0) {
            setLocalIndex((prev) => prev - 1);
        } else if (!isLeft && currentIndex < stories.length - 1) {
            setLocalIndex((prev) => prev + 1);
        } else {
            onClose();
        }
    };

    return (
        <div
            className={styles.storyViewer}
            onClick={handleClick}
            onMouseDown={handleHoldStart}
            onMouseUp={handleHoldEnd}
            onTouchStart={handleHoldStart}
            onTouchEnd={handleHoldEnd}
        >
            <div className={styles.progressBar}>
                <div className={styles.fill} style={{ width: `${progress}%` }} />
            </div>
            <img
                key={currentStory.id}
                src={currentStory.image}
                alt={currentStory.user}
                className={styles.storyImage}
            />
            <div className={styles.closeArea} onClick={onClose}>
                ✕
            </div>
        </div>
    );
};

export default StoryViewer;
