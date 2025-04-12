import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import StoryViewer from '../components/StoryViewer';
import { closeViewer, markAsViewed, setCurrentIndex } from '../redux/viewerSlice';


const StoryViewerContainer: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { stories } = useSelector((state: RootState) => state.story);
    const { viewerOpen, activeIndex } = useSelector((state: RootState) => state.viewer);

    if (!viewerOpen || !stories.length) return null;

    return (
        <StoryViewer
            stories={stories}
            initialIndex={activeIndex}
            onClose={() => dispatch(closeViewer())}
            onMarkAsViewed={(id) => dispatch(markAsViewed(id))}
            setCurrentIndex={(index) => dispatch(setCurrentIndex(index))}
        />
    );
};

export default StoryViewerContainer;
