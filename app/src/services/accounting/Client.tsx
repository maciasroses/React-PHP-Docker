import type { IAccounting } from "../../interfaces";

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
}

const AccountingClient = new Http();
export default AccountingClient;
