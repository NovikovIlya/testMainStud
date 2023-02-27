export interface Registration {
  lastName: string; //фамилия
  firstName: string; //имя
  middleName: string; // отчество
  registrationPurposeCode: 11;
  agreement: true;
  phone: string;
  password: string;
}

export interface Authorization {
  username: string;
  password: string;
}
