import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import ProtectedRoute from './components/ProtectedRoute'
import { CartProvider } from './contexts/CartContext'
import './style.css'

const router = createBrowserRouter([
	{ path: '/login', element: <Login /> },
	{ path: '/signup', element: <Signup /> },
	{
		path: '/',
		element: <ProtectedRoute />,
		children: [
			{
				path: '/',
				element: <App />,
				children: [
					{ index: true, element: <Home /> },
					{ path: 'product/:id', element: <ProductDetails /> },
					{ path: 'cart', element: <Cart /> },
				],
			},
		],
	},
])

ReactDOM.createRoot(document.getElementById('app')).render(
	<React.StrictMode>
		<CartProvider>
			<RouterProvider router={router} />
		</CartProvider>
	</React.StrictMode>
)


