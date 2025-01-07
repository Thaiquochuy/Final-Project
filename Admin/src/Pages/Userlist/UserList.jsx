import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';
import './UserList.css';
const UserList = ({ url }) => {
	const [list, setList] = useState([]);

	//lay danh sach user
	const fetchUserList = async () => {
		const response = await axios.get(`${url}/api/user/userList`);
		console.log(response.data);
		if (response.data.success) {
			setList(response.data.data);
		} else {
			toast.error('Error fetching Userlist');
		}
	};

	useEffect(() => {
		fetchUserList();
	}, []);

	//xoa user
	const Userremove = async (userId) => {
		const response = await axios.post(`${url}/api/user/Userremove`, {
			id: userId,
		});
		await fetchUserList();
		if (response.data.success) {
			toast.success(response.data.message);
		} else {
			toast.error('Error deleting user');
		}
	};
	return (
		<div>
			<div className='user-list'>
				<h1>User List</h1>
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{list.map((user) => (
							<tr key={user._id}>
								<td>{user.name}</td>
								<td>{user.email}</td>
								<td>
									<button onClick={() => Userremove(user._id)}>
										<img src={assets.trash} alt='delete' />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default UserList;
