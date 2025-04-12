import React from 'react';
import StoryListContainer from './containers/StoryListContainer';
import StoryViewerContainer from './containers/StoryViewerContainer';
import styles from './App.module.css'

const App: React.FC = () => {
  return (
    <main className={styles.app}>
      <h1 className={styles.heading}>Instagram</h1>
      <StoryListContainer />
      <StoryViewerContainer />
    </main>
  );
};

export default App;