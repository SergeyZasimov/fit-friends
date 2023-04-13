import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Provider } from 'react-redux';
import App from './app/app';
import HistoryRouter from './app/components/history-router/history-router';
import { browserHistory } from './app/services/browser-history.service';
import { store } from './app/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Provider store={ store }>
      <HistoryRouter history={ browserHistory }>
        <ToastContainer />
        <App />
      </HistoryRouter>
    </Provider>
  </StrictMode>
);
