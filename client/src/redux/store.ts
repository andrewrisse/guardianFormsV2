import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { useSelector as useReduxSelector, useDispatch as useReduxDispatch } from 'react-redux';

const store = configureStore({
  reducer: rootReducer
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

const { dispatch } = store;

const useDispatch = () => useReduxDispatch<AppDispatch>();
const useSelector = useReduxSelector;

export { store, dispatch, useDispatch, useSelector };
