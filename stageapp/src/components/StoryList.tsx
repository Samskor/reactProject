import React from 'react';
import StoryThumbnail from './StoryThumbnail';
import { Story } from '../types';
import styles from './StoryList.module.css';

interface StoryListProps {
    stories: Story[];
    isLoading: boolean;
    openViewer: (index: number) => void;
}

const StoryList: React.FC<StoryListProps> = ({
    stories,
    isLoading,
    openViewer,
}) => {
    if (isLoading) return <div>Loading stories...</div>;

    return (
        <div className={styles.storyList}>
            {stories.map((story, index) => {
                // const viewed = isStoryViewed(story.id);
                // console.log("viewed: ", viewed)

                return (
                    <div
                        key={story.id}
                        className={styles.storyItem}
                        onClick={() => {
                            openViewer(index);
                        }}
                    >
                        <StoryThumbnail story={story} />
                        <div className={styles.storyUsername}>{story.user}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default StoryList;
