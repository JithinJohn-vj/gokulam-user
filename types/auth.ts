interface TAdminCreate {
  email: string;
  password: string;
  phonenumber: string;
  username: string;
  security_key: string;
  confirm_password: string;
}


interface LoginParams {
  phonenumber: number;
}

interface TOtp {
  phonenumber: number;
  otp: string
}


interface TDineIn{
  branch: string,
  order_type:string,
  count: number
}