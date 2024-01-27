import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Unauthorized$ } from './helpers';

const http = axios.create({
	baseURL: process.env.EXPO_PUBLIC_API_URL,
	withCredentials: true
})

http.interceptors.request.use(
	async (config) => {
		let token = await AsyncStorage.getItem('token');
		if(token){
			config.headers['Authorization'] = `Bearer ${token}`
		}

		return config
	},
	error => {
		return Promise.reject(error)
	}
)

http.interceptors.response.use(
	res => res,
	async (error) => {
		if (error?.code === 'ERR_CANCELED') {
			return Promise.reject(error)
		}

		const { status } = error.response

		if ((status === 401 || status === 403)) {
			await AsyncStorage.removeItem('session');
			await AsyncStorage.removeItem('token');
			Unauthorized$.next(null);
		}

		return Promise.reject(error)
	}
)

export default http;
