import $api from '../http';
import { AxiosResponse } from 'axios';
import { RegResponse } from '../models/response/RegResponse';
import { AuthResponse } from '../models/response/AuthResponse';

export default class Services {
  static async registration(
    lastName: string,
    firstName: string,
    middleName: string,
    registrationPurposeCode: number,
    agreement: boolean,
    phone: string,
    password: string,
  ) {
    return $api.post<RegResponse>('/api/register', {
      lastName,
      firstName,
      middleName,
      registrationPurposeCode,
      agreement,
      phone,
      password,
    });
  }

  static async authorization(
    username: string,
    password: string,
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/api/login', { username, password });
  }
}
