import { validateAccounting } from "./schema";

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

  async massiveUpdate(formData: FormData) {
    // const url = `${this.#url}/accounting/massive-update`;

    const amounts = formData.getAll("amount");
    const descriptions = formData.getAll("description");
    const types = formData.getAll("type");
    const currencies = formData.getAll("currency");
    const dates = formData.getAll("date");
    const ids = formData.getAll("id");
    const user_ids = formData.getAll("user_id");

    const data = [];
    const errorsPerData = [];

    for (let i = 0; i < amounts.length; i++) {
      data.push({
        description: descriptions[i],
        amount: Number(amounts[i]),
        type: types[i],
        currency: currencies[i],
        date: new Date(dates[i] as string),
        id: ids[i],
        user_id: user_ids[i],
      });

      const errors = validateAccounting("update", data[i]);

      if (Object.keys(errors).length !== 0) {
        errorsPerData.push({
          success: false,
          message: "",
          errors,
        });
      }
    }

    if (errorsPerData.length > 0) return errorsPerData;

    return [
      {
        success: true,
        data,
        message: "OK",
        errors: {},
      },
    ];

    // try {
    //   const response = await fetch(url, {
    //     method: "PUT",
    //     body: formData,
    //     credentials: "include",
    //   });
    //   const data = await response.json();
    //   return data;
    // } catch {
    //   console.error("An error occurred. Please try again.");
    // }
  }
}

const AdminAccountingClient = new Http();
export default AdminAccountingClient;
