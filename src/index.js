import React from 'react';
import {render} from 'react-dom';
import App from './App';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import {compose, createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import {rootReducer} from "./redux/rootReducer";
import {forbiddenWordsMiddleeare} from "./redux/middleware";
import {sagaWatcher} from "./redux/sagas";

const saga = createSagaMiddleware();

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk, forbiddenWordsMiddleeare, saga),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

saga.run(sagaWatcher);

const app = (
    <React.StrictMode>
        <Provider store={store}>=
            <App />
        </Provider>
    </React.StrictMode>
);

render(app, document.getElementById('root')
);