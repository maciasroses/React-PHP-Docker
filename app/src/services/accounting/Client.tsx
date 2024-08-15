import { validateAccounting } from "./schema";
import type {
  IAccounting,
  IAccountingCreateNUpdateState,
} from "../../interfaces";

class Http {
  #url = "http://localhost/api";

  async getAll(searchParams: URLSearchParams) {
    const url = `${this.#url}/accounting?${searchParams.toString()}`;

    try {
      const response = await fetch(url, { credentials: "include" });
      const data = await response.json();

      return {
        accounting_data: data.data.accounting_data as IAccounting[],
        total_pages: data.data.total_pages as number,
      };
    } catch {
      console.error("An error occurred. Please try again.");
    }
  }

  async getById(id: string) {
    const url = `${this.#url}/accounting/${id}`;

    try {
      const response = await fetch(url, { credentials: "include" });
      const data = await response.json();

      return data.data as IAccounting;
    } catch {
      console.error("An error occurred. Please try again.");
    }
  }

  async create(formData: FormData) {
    const url = `${this.#url}/accounting`;

    const dataToValidate = {
      date: new Date(formData.get("date") as string),
      description: formData.get("description"),
      amount: Number(formData.get("amount")),
      currency: formData.get("currency"),
      type: formData.get("type"),
    };

    const errors = validateAccounting("create", dataToValidate);

    if (Object.keys(errors).length !== 0) {
      return {
        success: false,
        message: "",
        errors: errors as IAccountingCreateNUpdateState["errors"],
      };
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(dataToValidate),
        credentials: "include",
      });
      const data = await response.json();

      if (data.status === 201) {
        return {
          success: true,
          data: data.data,
          message: data.messages.message,
          errors: {},
        };
      } else {
        return { success: false, message: data.messages.message, errors: {} };
      }
    } catch {
      return {
        success: false,
        message: "An internal error occurred. Please try again later.",
        errors: {},
      };
    }
  }

  async update(formData: FormData, id: string) {
    const url = `${this.#url}/accounting/${id}`;

    const dataToValidate = {
      date: new Date(formData.get("date") as string),
      description: formData.get("description"),
      amount: Number(formData.get("amount")),
      currency: formData.get("currency"),
      type: formData.get("type"),
    };

    const errors = validateAccounting("update", dataToValidate);

    if (Object.keys(errors).length !== 0) {
      return {
        success: false,
        message: "",
        errors: errors as IAccountingCreateNUpdateState["errors"],
      };
    }

    try {
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(dataToValidate),
        credentials: "include",
      });
      const data = await response.json();

      if (data.status === 200) {
        return {
          success: true,
          data: id,
          message: data.messages.message,
          errors: {},
        };
      } else {
        return { success: false, message: data.messages.message, errors: {} };
      }
    } catch {
      return {
        success: false,
        message: "An internal error occurred. Please try again later.",
        errors: {},
      };
    }
  }
}

const AccountingClient = new Http();
export default AccountingClient;
