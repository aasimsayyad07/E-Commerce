/**
 * @description Queires which handles user request and actal logic
 */

export const getCustomers =
  'SELECT user_id, name, email, gender, mobile_number, username FROM customers';

export const searchID = 'SELECT * FROM customers WHERE user_id = $1';

export const searchEmail = 'SELECT * FROM customers WHERE email = $1';

export const searchName = 'SELECT * FROM customers WHERE name ~* $1';

export const search = `SELECT * 
FROM customers 
WHERE name ILIKE '%' || $1 || '%' 
   OR email ILIKE '%' || $1 || '%' 
   OR mobile_number ILIKE '%' || $1 || '%' 
   OR username ILIKE '%' || $1 || '%';`;

export const checkAlreadyExistEmail =
  'SELECT s FROM customers s WHERE s.email = $1';

export const checkAlreadyExistMobile =
  'SELECT s FROM customers s WHERE s.mobile_number = $1';

export const checkAlreadyExistUsername =
  'SELECT s FROM customers s WHERE s.username = $1';

export const addCustomers =
  'INSERT INTO customers (name, email, gender, mobile_number, username, password) VALUES ($1,$2,$3,$4,$5,$6)';

export const removeCustomer = 'DELETE FROM customers WHERE user_id=$1';

export const updateCustomer = 'UPDATE customers SET name= $1 WHERE user_id=$2';
