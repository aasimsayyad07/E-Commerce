import { Inject, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Pool } from 'pg';
import * as queries from './queries/customer.queries';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(@Inject('DATABASE_POOL') private pool: Pool) {}
  /**
   * @function signUp
   * @description Add new user to customer databases and Provide User name and Password
   * @Body Payload as json data of User information
   * @returns Newly added User confimartion
   */
  async signUp(createCustomerDto: CreateCustomerDto) {
    try {
      const { name, email, gender, mobile_number, username, password } =
        createCustomerDto;

      /**
       * @description check Email is already exist in database
       */
      const checkEmailExist = await this.pool.query(
        queries.checkAlreadyExistEmail,
        [email],
      );
      if (checkEmailExist.rowCount >= 1) {
        return 'Email Already Exist';
      }

      /**
       * @description check Mobile Number is already exist in database
       */
      const checkMobileExist = await this.pool.query(
        queries.checkAlreadyExistMobile,
        [mobile_number],
      );
      if (checkMobileExist.rowCount >= 1) {
        return 'Mobile Number Already Exist';
      }

      /**
       * @description check Username is already exist in database
       */
      const checkUsernameExist = await this.pool.query(
        queries.checkAlreadyExistUsername,
        [username],
      );
      if (checkUsernameExist.rowCount >= 1) {
        return 'User Name Already Exist';
      }

      /**
       * @description Convert Normal String Password into Bcryot password
       */
      const saltRounds = 10;
      const securedPassword = await bcrypt.hash(password, saltRounds);

      /**
       * @description add new customer details to database
       */
      const addUser = await this.pool.query(queries.addCustomers, [
        name,
        email,
        gender,
        mobile_number,
        username,
        securedPassword,
      ]);
      if (addUser.rowCount >= 1) {
        return 'User Signup Complete, Please Login using username and Password';
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @function signIn
   * @description Login to user and send JWT Token
   * @Body Payload as Username and Password
   * @returns User Request Auth
   */
  async signIn(loginDetails: Record<string, string>) {
    try {
      const { email, password } = loginDetails;

      if (!email || !password) {
        return 'Missing required fields';
      }

      //check email present in users databases
      const checkEmailExist = await this.pool.query(queries.searchEmail, [
        email,
      ]);
      if (!checkEmailExist.rows.length) {
        return 'Invalid Email';
      }

      //fetch password from databases
      const fetchPassword = checkEmailExist.rows[0].password;

      // Compare the provided password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, fetchPassword);

      if (!isMatch) {
        return 'Wrong Password';
      }

      //create jwt token
      const token = await jwt.sign({ email: email }, process.env.SECERT_KEY, {
        expiresIn: '1h',
      });

      return { token };
    } catch (err) {
      console.log(err);
      return 'Invalid Login Details';
    }
  }
}
