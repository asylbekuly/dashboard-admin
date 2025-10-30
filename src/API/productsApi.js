import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 5000,
});

// Все продукты
export async function getAllProducts() {
  try {
    const res = await api.get('/products');
    return res.data;
  } catch (error) {
    console.error('Ошибка при получении всех продуктов:', error);
    throw error;
  }
}

// Один продукт по id
export async function getProductById(productId) {
  try {
    const res = await api.get(`/products/${productId}`);
    return res.data;
  } catch (error) {
    console.error(`Ошибка при получении продукта ${productId}:`, error);
    throw error;
  }
}

// Поиск по названию
export async function searchProducts(query) {
  try {
    const res = await api.get(`/products/search?q=${encodeURIComponent(query)}`);
    return res.data;
  } catch (error) {
    console.error('Ошибка при поиске продуктов:', error);
    throw error;
  }
}

// Продукты категории
export async function getProductsByCategory(category) {
  try {
    const res = await api.get(`/products/category/${category}`);
    return res.data;
  } catch (error) {
    console.error(`Ошибка при получении категории ${category}:`, error);
    throw error;
  }
}

// Добавить продукт
export async function addProduct(productData) {
  try {
    const res = await api.post('/products/add', productData);
    return res.data;
  } catch (error) {
    console.error('Ошибка при добавлении продукта:', error);
    throw error;
  }
}

// Обновить продукт
export async function updateProduct(productId, updateData) {
  try {
    const res = await api.put(`/products/${productId}`, updateData);
    return res.data;
  } catch (error) {
    console.error(`Ошибка при обновлении продукта ${productId}:`, error);
    throw error;
  }
}

// Удалить продукт
export async function deleteProduct(productId) {
  try {
    const res = await api.delete(`/products/${productId}`);
    return res.data;
  } catch (error) {
    console.error(`Ошибка при удалении продукта ${productId}:`, error);
    throw error;
  }
}
