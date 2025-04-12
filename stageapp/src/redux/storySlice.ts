import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Story } from '../types';
import storiesData from '../data/stories.json';

interface StoryState {
    stories: Story[];
    isLoading: boolean;
}

const initialState: StoryState = {
    stories: [],
    isLoading: false,
};

export const fetchStories = createAsyncThunk('story/fetchStories', async () => {
    return storiesData;
});

const storySlice = createSlice({
    name: 'story',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchStories.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchStories.fulfilled, (state, action) => {
            state.stories = action.payload;
            state.isLoading = false;
        });
    },
});

export default storySlice.reducer;