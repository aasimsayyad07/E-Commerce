export const checkAlreadyExistEmail =
  'SELECT s FROM customers s WHERE s.email = $1';

export const checkAlreadyExistMobile =
  'SELECT s FROM customers s WHERE s.mobile_number = $1';

export const checkAlreadyExistUsername =
  'SELECT s FROM customers s WHERE s.username = $1';

export const addCustomers =
  'INSERT INTO customers (name, email, gender, mobile_number, username, password) VALUES ($1,$2,$3,$4,$5,$6)';

export const searchEmail = 'SELECT * FROM customers WHERE email = $1';
