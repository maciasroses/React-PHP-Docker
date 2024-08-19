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
  date: Date;
  id: string;
  created_at: Date;
  updated_at: Date;
}

export interface IAdminUserForIAdminAccounting {
  user_id: string;
  user_name: string;
  user_email: string;
  user_role: string;
}

export interface IAdminAccouning extends IAdminUserForIAdminAccounting {
  id: string;
  description: string;
  amount: number;
  type: string;
  currency: string;
  date: Date;
  created_at: Date;
  updated_at: Date;
}

export interface IAdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: Date;
  updated_at: Date;
  accounting: IAccounting[];
}

export interface IAccountingsForBarChart {
  amount: number;
  id: string;
  date: Date;
  type: string;
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

export interface IAccountingCreateNUpdateState extends ISharedState {
  errors: {
    description?: string;
    amount?: string;
    currency?: string;
    type?: string;
    date?: Date;
  };
}

export type IAccountingDeleteState = ISharedState;
