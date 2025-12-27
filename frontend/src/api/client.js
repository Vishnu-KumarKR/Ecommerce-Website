import axios from 'axios'
import { getToken } from '../auth'

// Use relative path to leverage Vite's proxy (defined in vite.config.js)
// This avoids CORS issues and routes requests through the dev server
const baseURL = import.meta.env.VITE_API_URL || ''

export const apiClient = axios.create({
	baseURL,
	headers: { 'Content-Type': 'application/json' },
})

// Add request interceptor to log requests
apiClient.interceptors.request.use(
	config => {
		const token = getToken()
		if (token) {
			config.headers = config.headers || {}
			config.headers.Authorization = `Bearer ${token}`
		}
		console.log('🌐 API Request:', config.method?.toUpperCase(), (config.baseURL || '') + config.url)
		return config
	},
	error => {
		console.error('❌ Request Error:', error)
		return Promise.reject(error)
	}
)

// Add response interceptor to log responses
apiClient.interceptors.response.use(
	response => {
		console.log('✅ API Response:', response.status, response.config.url)
		return response
	},
	error => {
		console.error('❌ Response Error:', {
			message: error.message,
			status: error.response?.status,
			url: error.config?.url,
		})

		// Auto-logout on 401 (Unauthorized)
		if (error.response?.status === 401) {
			console.warn('⚠️ Token expired or invalid. Logging out...')
			localStorage.removeItem('mini_amazon_token')
			localStorage.removeItem('mini_amazon_user')
			window.dispatchEvent(new Event('auth-change'))
			// Optional: Redirect to login if not already there
			if (window.location.pathname !== '/login') {
				// window.location.href = '/login' // Let React handle it via state change usually, but force if needed
			}
		}

		return Promise.reject(error)
	}
)

