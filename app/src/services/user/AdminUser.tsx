class Http {
  #url = "http://localhost/api/admin";

  async getAll() {
    const url = `${this.#url}/users`;

    try {
      const response = await fetch(url, { credentials: "include" });
      const data = await response.json();
      return data;
    } catch {
      console.error("An error occurred. Please try again.");
    }
  }
}

const AdminUserClient = new Http();
export default AdminUserClient;
