import './App.css'
import AppHeader from './components/AppHeader/Header.jsx'
import { Space } from 'antd'
import SideMenu from './components/SideMenu/SideMenu.jsx'
import PageContent from './components/PageContent/PageContent.jsx'
import AppFooter from './components/AppFooter/Footer.jsx'
function App() {
	return (
		<>
			<div className='App'>
				<AppHeader />
				<Space className='MenuContent'>
					<SideMenu />
					<PageContent />
				</Space>
				<AppFooter />
			</div>
		</>
	)
}

export default App
