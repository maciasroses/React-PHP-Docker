export interface IRoute {
  name: string;
  path: string;
  element: React.ReactNode;
}

export interface IAllRoutes {
  [key: string]: IRoute;
}

export interface IUser {
  name: string;
  email: string;
  role: string;
  id: string;
}

export interface IAccounting {
  description: string;
  amount: number;
  type: string;
  currency: string;
  date: string;
  id: string;
}

export interface IAccountingList {
  accounting_data: IAccounting[];
  total_pages: number;
}

export interface ISearchParams {
  q: string;
  currency: string;
  type: string;
  page: string;
}

export interface IResponse {
  status: number;
  messages: {
    message: string;
  };
  data: Array<unknown> | null;
}

export interface ISharedState {
  success: boolean;
  data?: Array<unknown>;
  message: string;
}

export interface ILoginState extends ISharedState {
  errors: {
    email?: string;
    password?: string;
  };
}

export interface IRegisterState extends ISharedState {
  errors: {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  };
}
