import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchStories } from '../redux/storySlice';
import { openViewerAt } from '../redux/viewerSlice';
import StoryList from '../components/StoryList';

const StoryListContainer: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { stories, isLoading } = useSelector((state: RootState) => state.story);

    useEffect(() => {
        dispatch(fetchStories());
    }, [dispatch]);

    const openViewer = (index: number) => {
        dispatch(openViewerAt(index));
    };

    return (
        <StoryList
            stories={stories}
            isLoading={isLoading}
            openViewer={openViewer}
        />
    );
};

export default StoryListContainer;
