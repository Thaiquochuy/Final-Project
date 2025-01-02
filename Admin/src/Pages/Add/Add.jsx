import React from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({ url }) => {
	const [image, setImage] = useState(null);
	const [data, setData] = useState({
		name: '',
		description: '',
		category: 'Burger',
		price: '',
	});

	const onChangeHandler = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setData((data) => ({ ...data, [name]: value }));
	};

	const onSubmitHandler = async (event) => {
		event.preventDefault();
		const formData = new FormData();
		formData.append('name', data.name);
		formData.append('description', data.description);
		formData.append('category', data.category);
		formData.append('price', Number(data.price));
		formData.append('image', image);
		const response = await axios.post(`${url}/api/food/add`, formData);
		if (response.data.success) {
			setData({
				name: '',
				description: '',
				category: 'Burger',
				price: '',
			});
			setImage(false);
			toast.success(response.data.message);
		} else {
			toast.error('Lỗi khi thêm sản phẩm');
		}
	};

	return (
		<div className='add'>
			<form className='flex-col' onSubmit={onSubmitHandler}>
				<div className='add-img-upload flex-col'>
					<p>Tải ảnh lên</p>
					<label htmlFor='image'>
						<img
							src={image ? URL.createObjectURL(image) : assets.upload_area}
							alt=''
						/>
					</label>
					<input
						onChange={(e) => setImage(e.target.files[0])}
						type='file'
						id='image'
						hidden
						required
					/>
				</div>
				<div className='add-product-name flex-col'>
					<p>Tên sản phẩm</p>
					<input
						onChange={onChangeHandler}
						value={data.name}
						type='text'
						name='name'
						placeholder='Thêm tên'
					/>
				</div>
				<div className='add-product-description flex-col'>
					<p>Mô tả sản phẩm</p>
					<textarea
						onChange={onChangeHandler}
						value={data.description}
						name='description'
						rows='6'
						placeholder='Thêm mô tả'
						required
					></textarea>
				</div>
				<div className='add-category-price'>
					<div className='add-category flex-col'>
						<p>Loại sản phẩm</p>
						<select onChange={onChangeHandler} name='category'>
							<option value='Burger'>Burger</option>
							<option value='Burger1'>Burger1</option>
							<option value='Burger2'>Burger2</option>
							<option value='Burger3'>Burger3</option>
							<option value='Burger4'>Burger4</option>
							<option value='Burger5'>Burger5</option>
							<option value='Burger6'>Burger6</option>
							<option value='Burger7'>Burger7</option>
						</select>
					</div>
					<div className='add-price flex-col'>
						<p>Giá sản phẩm</p>
						<input
							onChange={onChangeHandler}
							value={data.price}
							type='Number'
							name='price'
							placeholder='20000VND'
						/>
					</div>
				</div>
				<button type='submit' className='add-btn'>
					Thêm
				</button>
			</form>
		</div>
	);
};

export default Add;
