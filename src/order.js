const orderData = {
  _id: '23487',
  cart: [
    {
      product_id: '12345',
      name: 'Product 1',
      price: 25.99,
      quantity: 2
    },
    {
      product_id: '67890',
      name: 'Product 2',
      price: 15.5,
      quantity: 3
    }
  ],
  shipping_address: {
    name: 'John Doe',
    address: '123 Maine Street',
    city: 'Anytown',
    state: 'NY',
    zip_code: '10001',
    country: 'USA'
  },
  user: {
    user_id: 'abc123',
    username: 'johndoe',
    email: 'johndoe@example.com',
    phone: '555-123-4567'
  },
  total_price: 92.49,
  status: 'Shipped',
  payment_info: {
    id: 'xyz789',
    status: 'Paid',
    type: 'Credit Card'
  },
  paidAt: '2023-07-20 10:30:00',
  deliveredAt: '2023-07-25 14:45:00',
  createdAt: '2023-07-18 09:15:00'
}

module.exports = orderData
