import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Suspense
			fallback={
				<div className='d-flex justify-content-center'>
					<div className='spinner-border' role='status'></div>
				</div>
			}
		>
			<App />
		</Suspense>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
