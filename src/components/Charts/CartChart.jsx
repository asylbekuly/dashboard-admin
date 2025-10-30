import { useEffect, useState } from 'react'
import { Card, Typography } from 'antd'
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	Legend,
	CartesianGrid,
} from 'recharts'
import { getCart } from '../../API/cartApi.js';

export default function CartChart() {
	const [chartData, setChartData] = useState([])
	const [cartId, setCartId] = useState(null)

	useEffect(() => {
		getCart(1).then(cart => {
			setCartId(cart.id)

		
			const transformed = cart.products.map(p => ({
				name: p.title, // на оси X будет имя товара
				quantity: p.quantity, // количество купленного товара
				price: p.price, // цена за единицу
			}))

			setChartData(transformed)
		})
	}, [])

	return (
		<Card style={{ width: '100%', minHeight: 350 }}>
			<Typography.Title level={4} style={{ marginBottom: 16 }}>
				{cartId ? `Cart #${cartId} Breakdown` : 'Cart Breakdown'}
			</Typography.Title>

			<ResponsiveContainer width='100%' height={250}>
				<BarChart data={chartData}>
			
					<CartesianGrid strokeDasharray='3 3' />


					<XAxis
						dataKey='name'

						angle={-20}
						textAnchor='end'
						interval={0} 
						style={{ fontSize: 12 }}
					/>

					
					<YAxis style={{ fontSize: 12 }} />

					
					<Tooltip
						formatter={(value, name) => {
							if (name === 'Price ($)') {
								
								return [`$${value.toFixed(2)}`, 'Price']
							}
							if (name === 'Quantity') {
								return [value, 'Quantity']
							}
							return value
						}}
						labelFormatter={label => `Product: ${label}`}
					/>

					
		

					
					<Bar
						dataKey='quantity'
						name='Quantity'
						fill='#1890ff'
						radius={[4, 4, 0, 0]}
					/>

				
					<Bar
						dataKey='price'
						name='Price ($)'
						fill='#52c41a' 
						radius={[4, 4, 0, 0]}
					/>
				</BarChart>
			</ResponsiveContainer>
		</Card>
	)
}
