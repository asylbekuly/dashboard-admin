import './App.css'
import AppHeader from './components/AppHeader'
import { Space } from 'antd'
import SideMenu from './components/SideMenu'
import PageContent from './components/PageContent'
import AppFooter from './components/AppFooter/index.jsx'
function App() {
	return (
		<>
			<div className='App'>
				<AppHeader />
				<Space>
					<SideMenu />
					<PageContent />
				</Space>
				<AppFooter />
			</div>
		</>
	)
}

export default App
