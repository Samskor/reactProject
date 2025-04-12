import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Story } from '../types';
import styles from './StoryThumbnail.module.css';

interface Props {
    story: Story;
}

const StoryThumbnail: React.FC<Props> = ({ story }) => {
    const viewedStoryIds = useSelector((state: RootState) => state.viewer.viewedStoryIds);
    const viewed = viewedStoryIds.includes(story.id);

    return (
        <div
            className={
                viewed ? styles.thumbnailViewed : styles.thumbnailUnviewed
            }
        >
            <img src={story.thumbnail} alt={story.user} />
        </div>
    );
};

export default StoryThumbnail;
