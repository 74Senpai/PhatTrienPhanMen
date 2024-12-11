import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

import App from './componests/App.js';
import reportWebVitals from './default/reportWebVitals.js';
import { MessageProvider } from './Context/MessageContex.js';
import {
  BlogTypesProvider,
  UseInforProvider,
  PagesRefProvider,
  PagesSiteProvider,
  UserRoleProvider,
  AuthorProvider
} from './Context/PagesContext.js';


window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'reverb',
    key: 'rfbkmsxlofkld1zepqim',
    wsHost: '127.0.0.1',
    wsPort: 8081,
    wssPort: 8081,
    forceTLS: false,
    enabledTransports: ['ws', 'wss'],
});

const root = ReactDOM.createRoot(document.getElementById('root'));
// require('dotenv').config();
root.render(
  <React.StrictMode>
    <BlogTypesProvider>
      <PagesRefProvider>
        <PagesSiteProvider>
          <UseInforProvider>
            <UserRoleProvider>
              <AuthorProvider>
                <MessageProvider>
                  <BrowserRouter>
                    <App />
                  </BrowserRouter>
                </MessageProvider>
              </AuthorProvider>
            </UserRoleProvider>
          </UseInforProvider>
        </PagesSiteProvider>
      </PagesRefProvider>
    </BlogTypesProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();
