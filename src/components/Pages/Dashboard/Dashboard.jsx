import { Typography, Space, Statistic, Card } from 'antd'
import {
	ShoppingCartOutlined,
	ShopOutlined,
	UserOutlined,
	DollarCircleOutlined,
} from '@ant-design/icons'
import OrdersTable from '../../../API/OrdersTable.jsx';

export default function Dashboard() {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
			<Typography.Title level={2}>Dashboard</Typography.Title>

			<Space direction="horizontal">
				<DashboardCard
					title="Orders"
					value={112893}
					icon={<ShoppingCartOutlined style={{ fontSize: '30px', color: '#1890ff' }} />}
				/>
				<DashboardCard
					title="Inventory"
					value={6543}
					icon={<ShopOutlined style={{ fontSize: '30px', color: '#52c41a' }} />}
				/>
				<DashboardCard
					title="Customers"
					value={3120}
					icon={<UserOutlined style={{ fontSize: '30px', color: '#faad14' }} />}
				/>
				<DashboardCard
					title="Revenue"
					value={128934}
					icon={<DollarCircleOutlined style={{ fontSize: '30px', color: '#722ed1' }} />}
				/>
			</Space>

			{/* Таблица с последним заказом */}
			<OrdersTable />
		</div>
	)
}

function DashboardCard({ title, value, icon }) {
	return (
		<Card style={{ minWidth: 200 }}>
			<Space direction="horizontal">
				{icon}
				<Statistic title={title} value={value} />
			</Space>
		</Card>
	)
}
