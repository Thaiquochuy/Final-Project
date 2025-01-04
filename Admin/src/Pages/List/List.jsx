import React, { useEffect } from 'react';
import './List.css';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({ url }) => {
	const [list, setList] = useState([]);

	const fetchList = async () => {
		const response = await axios.get(`${url}/api/food/list`);
		console.log(response.data);
		if (response.data.success) {
			setList(response.data.data);
		} else {
			toast.error('Error fetching food list');
		}
	};

	const removeFood = async (foodId) => {
		const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
		await fetchList();
		if (response.data.success) {
			toast.success(response.data.message);
		} else {
			toast.error('Error deleting food');
		}
	};

	useEffect(() => {
		fetchList();
	}, []);

	return (
		<div className='list add flex-col'>
			<p className='text_list'>All List</p>
			<div className='list-table'>
				<div className='list-table-format title'>
					<b>Image</b>
					<b>Name</b>
					<b>Category</b>
					<b>Price</b>
					<b>Act</b>
				</div>
				{list.map((item, index) => {
					return (
						<div key={index} className='list-table-format'>
							<img src={`${url}/images/${item.image}`} alt='' />
							<p>{item.name}</p>
							<p>{item.category}</p>
							<p>{item.price}</p>
							<div className='list-table-format-act'>
								<p onClick={() => removeFood(item._id)} className='btn'>
									x
								</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default List;
