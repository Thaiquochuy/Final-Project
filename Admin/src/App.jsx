import React, { useState } from 'react';
import Narbar from './Components/Narbar/Narbar';
import Sidebar from './Components/Sidebar/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Add from './Pages/Add/Add';
import List from './Pages/List/List';
import Order from './Pages/Order/Order';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

function App() {
	const url = 'http://localhost:4000';

	return (
		<div>
			<ToastContainer />
			<Narbar />
			<hr />
			<div className='app-content'>
				<Sidebar />
				<Routes>
					<Route path='/Add' element={<Add url={url} />} />
					<Route path='/List_Product' element={<List url={url} />} />
					<Route path='/Order' element={<Order url={url} />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
