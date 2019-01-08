import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { setConfig } from "./Config";

setConfig();

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
