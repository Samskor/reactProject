import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ViewerState {
    viewerOpen: boolean;
    activeIndex: number;
    currentIndex: number;
    viewedStoryIds: string[];
}

const initialState: ViewerState = {
    viewerOpen: false,
    activeIndex: 0,
    currentIndex: 0,
    viewedStoryIds: [],
};

const viewerSlice = createSlice({
    name: 'viewer',
    initialState,
    reducers: {
        openViewerAt: (state, action: PayloadAction<number>) => {
            state.activeIndex = action.payload;
            state.currentIndex = action.payload;
            state.viewerOpen = true;
        },
        closeViewer: (state) => {
            state.viewerOpen = false;
            state.activeIndex = 0;
        },
        markAsViewed: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            if (!state.viewedStoryIds.includes(id)) {
                state.viewedStoryIds.push(id);
            }
        },
        setCurrentIndex: (state, action: PayloadAction<number>) => {
            state.currentIndex = action.payload;
        }
    },
});

export const { openViewerAt, closeViewer, markAsViewed, setCurrentIndex } = viewerSlice.actions;
export default viewerSlice.reducer;