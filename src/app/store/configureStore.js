import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
import firebase from '../config/firebase';

const rrfConfig = {
    userProfile: 'users',
    attachAuthIsReady: true,
    useFirestoreForProfile: true,
    updateProfileOnLogin: false
}

export const configureStore = (preloadedStore) => {
    const middlewares = [thunk.withExtraArgument({getFirebase, getFirestore})];
    const middlewareEnhancers = applyMiddleware(...middlewares);

    const storeEnhancers = [middlewareEnhancers];

    const composedEnhancer = composeWithDevTools(
        ...storeEnhancers, 
        reactReduxFirebase(firebase, rrfConfig),
        reduxFirestore(firebase)
        );

    const store = createStore(
        rootReducer,
        preloadedStore,
        composedEnhancer
    );

    if (process.env.NODE_ENV !== 'production') {
        if (module.hot) {
            module.hot.accept('../reducers/rootReducer', () => {
                const newRootReducer = require('../reducers/rootReducer').default;
                store.replaceReducer(newRootReducer);
            });
        }
    };

    return store;
}