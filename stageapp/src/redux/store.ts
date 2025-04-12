import { configureStore } from '@reduxjs/toolkit';
import storyReducer from './storySlice';
import viewerReducer from './viewerSlice';

export const store = configureStore({
    reducer: {
        story: storyReducer,
        viewer: viewerReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;