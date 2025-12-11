import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import BuyNow from './pages/BuyNow'
import Checkout from './pages/Checkout'
import AdminDashboard from './pages/AdminDashboard'
import Orders from './pages/Orders'
import Wishlist from './pages/Wishlist'
import Profile from './pages/Profile'
import UserDashboard from './pages/UserDashboard'
import Help from './pages/Help'
import Returns from './pages/Returns'
import PrivacyPolicy from './pages/PrivacyPolicy'
import UserAgreement from './pages/UserAgreement'
import ErrorPage from './pages/ErrorPage'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'
import { CartProvider } from './contexts/CartContext'
import './style.css'

const router = createBrowserRouter([
	{ path: '/login', element: <Login /> },
	{ path: '/signup', element: <Signup /> },
	{
		path: '/',
		element: <ProtectedRoute />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/',
				element: <App />,
				children: [
					{ index: true, element: <Home /> },
					{ path: 'product/:id', element: <ProductDetails /> },
					{ path: 'cart', element: <Cart /> },
					{ path: 'buy-now', element: <BuyNow /> },
					{ path: 'checkout', element: <Checkout /> },
					{ path: 'orders', element: <Orders /> },
					{ path: 'wishlist', element: <Wishlist /> },
					{ path: 'profile', element: <Profile /> },
					{ path: 'user-dashboard', element: <UserDashboard /> },
					{ path: 'help', element: <Help /> },
					{ path: 'returns', element: <Returns /> },
					{ path: 'privacy-policy', element: <PrivacyPolicy /> },
					{ path: 'user-agreement', element: <UserAgreement /> },
				],
			},
		],
	},
	{
		path: '/admin',
		element: <AdminRoute />,
		children: [
			{ index: true, element: <AdminDashboard /> },
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


