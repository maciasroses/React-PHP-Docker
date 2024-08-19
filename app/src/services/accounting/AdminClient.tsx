class Http {
  #url = "http://localhost/api/admin";

  async getAll(searchParams: URLSearchParams) {
    const url = `${this.#url}/accounting?${searchParams.toString()}`;

    try {
      const response = await fetch(url, { credentials: "include" });
      const data = await response.json();
      return data;
    } catch {
      console.error("An error occurred. Please try again.");
    }
  }
}

const AdminAccountingClient = new Http();
export default AdminAccountingClient;
