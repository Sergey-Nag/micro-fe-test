import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';

const mount = (el, { onNavigate, defaultHistory, initialPath, onSignIn } = {}) => {
    const history = defaultHistory ?? createMemoryHistory({
        initialEntries: [initialPath]
    });

    onNavigate && history.listen(onNavigate);

    ReactDOM.render(<App onSignIn={onSignIn} history={history} />, el);

    return {
        onParentNavigate({ pathname: nextPathname }) {
            if (history.location.pathname !== nextPathname) {
                history.push(nextPathname);
            }
        }
    }
};

if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_auth-root');

    if (devRoot) {
        mount(devRoot, { defaultHistory: createBrowserHistory() });
    }
}

export { mount };
