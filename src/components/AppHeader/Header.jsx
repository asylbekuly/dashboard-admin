import { Image,Typography, Space,Badge } from 'antd'
import { MailOutlined,BellFilled } from '@ant-design/icons'

export default function Header() {
	return (
		<div className='Header'>
			<Image src='src/assets/aitu.png' width={60} />
			<Typography.Title>AITU Admin Dashboard</Typography.Title>
			<Space>
				<Badge count={5} dot>
					<MailOutlined  style={{fontSize: '20px'}}/>
				</Badge>
				<Badge count={3}>
					<BellFilled style={{fontSize: '20px'}} />
				</Badge>
			</Space>
		</div>
	)
}
