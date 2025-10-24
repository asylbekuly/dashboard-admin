import {Routes,Route } from 'react-router-dom'
import Dashboard from '../Pages/Dashboard/Dashboard'
import Customers from '../Pages/Customers/Customers'
import Inventory from '../Pages/Inventory/Inventory'
import Orders from '../Pages/Orders/Orders'	

export default function AppRoutes(){
	return(
			<Routes>
				<Route path="/" element={<Dashboard />} />
				<Route path="/customers" element={<Customers />} />
				<Route path="/inventory" element={<Inventory />} />
				<Route path="/orders" element={<Orders />} />
			</Routes>
	)
}