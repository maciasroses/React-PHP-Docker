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

  async massiveCreate(formData: FormData) {
    const url = `${this.#url}/accounting/massive-create`;

    const file = formData.get("accountings");

    if (file) {
      try {
        const response = await fetch(url, {
          method: "POST",
          body: formData,
          credentials: "include",
        });
        const data = await response.json();
        if (data.status === 200) {
          return [
            {
              success: true,
              message: data.messages,
              errors: {},
            },
          ];
        } else {
          return [
            {
              success: false,
              message: data.messages,
              errors: {},
            },
          ];
        }
      } catch {
        return [
          {
            success: false,
            message: "An internal error occurred. Please try again later.",
            errors: {},
          },
        ];
      }
    }

    const amounts = formData.getAll("amount");
    const descriptions = formData.getAll("description");
    const types = formData.getAll("type");
    const currencies = formData.getAll("currency");
    const dates = formData.getAll("date");
    const user_ids = formData.getAll("user_id");

    const data = [];
    const errorsPerData = [];

    for (let i = 0; i < amounts.length; i++) {
      data[i] = {
        description: descriptions[i],
        amount: Number(amounts[i]),
        type: types[i],
        currency: currencies[i],
        date: new Date(dates[i] as string),
        user_id: user_ids[i],
      };

      const errors = validateAccounting("adminCreate", data[i]);

      if (Object.keys(errors).length !== 0) {
        errorsPerData[i] = {
          success: false,
          message: "",
          errors: errors,
        };
      }
    }

    if (errorsPerData.length > 0) return errorsPerData;

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        credentials: "include",
      });
      const dataRes = await response.json();
      if (dataRes.status === 200) {
        return [
          {
            success: true,
            message: dataRes.messages,
            errors: {},
          },
        ];
      } else {
        return [
          {
            success: false,
            message: dataRes.messages,
            errors: {},
          },
        ];
      }
    } catch {
      return [
        {
          success: false,
          message: "An internal error occurred. Please try again later.",
          errors: {},
        },
      ];
    }
  }

  async massiveUpdate(formData: FormData) {
    const url = `${this.#url}/accounting/massive-update`;

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
      data[i] = {
        description: descriptions[i],
        amount: Number(amounts[i]),
        type: types[i],
        currency: currencies[i],
        date: new Date(dates[i] as string),
        id: ids[i],
        user_id: user_ids[i],
      };

      const errors = validateAccounting("adminUpdate", data[i]);

      if (Object.keys(errors).length !== 0) {
        errorsPerData[i] = {
          success: false,
          message: "",
          errors: errors,
        };
      }
    }

    if (errorsPerData.length > 0) return errorsPerData;

    try {
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(data),
        credentials: "include",
      });
      const dataRes = await response.json();
      if (dataRes.status === 200) {
        return [
          {
            success: true,
            message: dataRes.messages,
            errors: {},
          },
        ];
      } else {
        return [
          {
            success: false,
            message: dataRes.messages,
            errors: {},
          },
        ];
      }
    } catch {
      return [
        {
          success: false,
          message: "An internal error occurred. Please try again later.",
          errors: {},
        },
      ];
    }
  }

  async massiveDelete(formData: FormData) {
    const url = `${this.#url}/accounting/massive-delete`;

    const ids = formData.getAll("id");

    try {
      const response = await fetch(url, {
        method: "DELETE",
        body: JSON.stringify(ids),
        credentials: "include",
      });
      const data = await response.json();

      if (data.status === 200) {
        return {
          success: true,
          message: data.messages,
        };
      } else {
        return { success: false, message: data.messages };
      }
    } catch {
      return {
        success: false,
        message: "An internal error occurred. Please try again later.",
      };
    }
  }
}

const AdminAccountingClient = new Http();
export default AdminAccountingClient;
