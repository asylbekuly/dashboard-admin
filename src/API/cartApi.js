
import axios from 'axios';

const api = axios.create({
	baseURL: 'https://dummyjson.com',
	timeout: 5000,
});

export async function getCart(cartId = 1) {
	try {
		const res = await api.get(`/carts/${cartId}`);
		return res.data; // возвращаем только полезные данные
	} catch (error) {
		console.error('Ошибка при получении корзины:', error);
		throw error;
	}
}


export async function getAllCarts() {
	try {
		const res = await api.get('/carts');
		return res.data;
	} catch (error) {
		console.error('Ошибка при получении всех корзин:', error);
		throw error;
	}
}
