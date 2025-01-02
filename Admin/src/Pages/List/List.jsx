import React, { useEffect } from 'react';
import './List.css';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { use } from 'react';

const List = ({ url }) => {
	const [list, setList] = useState([]);

	const fetchList = async () => {
		const response = await axios.get(`${url}/api/food/list`);
		console.log(response.data);
		if (response.data.success) {
			setList(response.data.data);
		} else {
			toast.error('Lỗi khi lấy danh sách món ăn');
		}
	};

	const removeFood = async (foodId) => {
		const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
		await fetchList();
		if (response.data.success) {
			toast.success(response.data.message);
		} else {
			toast.error('Lỗi khi xóa món ăn');
		}
	};

	useEffect(() => {
		fetchList();
	}, []);

	return (
		<div className='list add flex-col'>
			<p>Danh sách tất cả</p>
			<div className='list-table'>
				<div className='list-table-format title'>
					<b>Ảnh</b>
					<b>Tên</b>
					<b>Loại</b>
					<b>Giá cả</b>
					<b>Act</b>
				</div>
				{list.map((item, index) => {
          return(
					<div key={index} className='list-table-format'>
						<img src={`${url}/images/${item.image}`} alt='' />
						<p>{item.name}</p>
						<p>{item.category}</p>
						<p>{item.price}</p>
						<div className='list-table-format-act'>
							<button onClick={() => removeFood(item._id)} className='btn'>
								Xóa
							</button>
						</div>
					</div>
          )})}
			</div>
		</div>
	);
};

export default List;
