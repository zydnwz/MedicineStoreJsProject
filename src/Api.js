const API_BASE_URL = 'https://crudcrud.com/api/79312af41e1340f29f040e79036adb24';

export const addProduct = async (product) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    return response.json();
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

export const addToCart = async (product) => {
  try {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    return response.json();
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    return response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchCart = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/cart`);
    return response.json();
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
};

export const updateProductQuantity = async (productId, quantity) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity }),
    });
    return response.json();
  } catch (error) {
    console.error('Error updating product quantity:', error);
    throw error;
  }
};

export const updateCartItemQuantity = async (cartItemId, quantity) => {
  try {
    const response = await fetch(`${API_BASE_URL}/cart/${cartItemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity }),
    });
    return response.json();
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    throw error;
  }
};

export const addCartItem = async (product) => {
  try {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    return response.json();
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

export const removeCartItem = async (cartItemId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/cart/${cartItemId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  } catch (error) {
    console.error('Error removing cart item:', error);
    throw error;
  }
};