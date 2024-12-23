/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
	const menuRef = useRef(null);

	useEffect(() => {
		const scrollInterval = setInterval(() => {
			if (menuRef.current) {
				menuRef.current.scrollBy({
					left: 100, // Amount to scroll by (adjust as needed)
					behavior: 'smooth',
				});
			}
		}, 3000); // Scroll every 3 seconds

		return () => clearInterval(scrollInterval); // Cleanup the interval on component unmount
	}, []);

	return (
		<div className='explore-menu' id='explore-menu'>
			<h1>Explore our menu</h1>
			<p className='explore-menu-text'>
				Choose from a diverse menu featuring a delectable array of dishes. Our
				mission is to satisfy your cravings and elevate your dining experience,
				one delicious meal at a time.
			</p>
			<div ref={menuRef} className='explore-menu-list'>
				{menu_list.map((item, index) => {
					return (
						<div
							onClick={() =>
								setCategory((prev) =>
									prev === item.menu_name ? 'All' : item.menu_name
								)
							}
							key={index}
							className='explore-menu-list-item'
						>
							<img
								className={category === item.menu_name ? 'active' : ''}
								src={item.menu_image}
								alt=''
							/>
							<p>{item.menu_name}</p>
						</div>
					);
				})}
			</div>
			<hr />
		</div>
	);
};

export default ExploreMenu;
