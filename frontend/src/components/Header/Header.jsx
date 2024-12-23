import './Header.css';
import React, { useState } from 'react';

const Header = () => {
	const [Menu, setMenu] = useState('Home');

	return (
		<div className='header'>
			<div className='header-contents'>
				<h2>Order your favorite food here</h2>
				<p>
					Choose from a diverse menu featuring a delectable array of dishes
					crafted with the finest ingredients and culinary expertise. Our
					mission is to satisfy your cravings and elevate your dining
					experience, one delicious meal at a time
				</p>
				<button>
					<a
						href='#explore-menu'
						onClick={() => setMenu('Menu')}
						className={Menu === 'Menu' ? 'active' : ''}
					>
						View Menu
					</a>
				</button>
			</div>
		</div>
	);
};

export default Header;
