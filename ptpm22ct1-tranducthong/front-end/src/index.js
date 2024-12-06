import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from 'react-dom/client';

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
