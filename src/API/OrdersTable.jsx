import { useEffect, useState } from 'react';
import { Table, Card, Typography } from 'antd';
import axios from 'axios'

// функция получения данных
export const getOrders = async () => {
	const res = await axios.get('https://dummyjson.com/carts/1');
	return res.data;
};

export default function OrdersTable() {
	const [loading, setLoading] = useState(true);
	const [products, setProducts] = useState([]);

	useEffect(() => {
		getOrders()
			.then(data => {
				// data.products = массив продуктов
				setProducts(data.products);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	const columns = [
		{
			title: 'Product',
			dataIndex: 'title',
			key: 'title',
		},
		{
			title: 'Quantity',
			dataIndex: 'quantity',
			key: 'quantity',
		},
		{
			title: 'Price',
			dataIndex: 'price',
			key: 'price',
			render: (price) => `$${price}`, // красиво форматируем
		},
	];

	return (
		<Card>
			<Typography.Title level={4} style={{ marginBottom: 16 }}>
				Latest Order
			</Typography.Title>

			<Table
				rowKey="id"
				dataSource={products}
				columns={columns}
				loading={loading}
				pagination={false}
			/>
		</Card>
	);
}
