import { Menu } from 'antd'
import {
	AppstoreOutlined,
	ShoppingCartOutlined,
	ShoppingOutlined,
	UserOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

export default function SideMenu() {
	const navigate = useNavigate();
	return (
		<div className="SideMenu">
			<Menu onClick={(item) => {
				navigate(item.key);
			}}
				items={[
					{
						label: 'Dashboard',
						key: '/',
						icon: <AppstoreOutlined />,
					},
					{
						label: 'Inventory',
						key: '/inventory',
						icon: <ShoppingOutlined />,
					},
					{
						label: 'Orders',
						key: '/orders',
						icon: <ShoppingCartOutlined />,
					},
					{
						label: 'Customers',
						key: '/customers',
						icon: <UserOutlined />,
					},
				]}
			/>
		</div>
	)
}
