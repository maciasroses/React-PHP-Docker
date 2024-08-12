import { validateUser } from "./schema";
import type { ILoginState, IRegisterState } from "../../interfaces";

class Http {
  #url = "http://localhost/api";

  async login(formData: FormData) {
    const url = `${this.#url}/auth/login`;

    const dataToValidate = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const errors = validateUser("login", dataToValidate);

    if (Object.keys(errors).length !== 0) {
      return {
        success: false,
        message: "",
        errors: errors as ILoginState["errors"],
      };
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(dataToValidate),
        credentials: "include",
      });
      const data = await response.json();

      if (data.status === 200) {
        return {
          success: true,
          data: data.data.user,
          message: data.messages.message,
          errors: {},
        };
      } else {
        return { success: false, message: data.messages.message, errors: {} };
      }
    } catch (error) {
      console.error(error);
      throw new Error("An internal error occurred");
    }
  }

  async register(formData: FormData) {
    const url = `${this.#url}/auth/register`;

    const dataToValidate = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    const errors = validateUser("register", dataToValidate);

    if (Object.keys(errors).length !== 0) {
      return {
        success: false,
        message: "",
        errors: errors as IRegisterState["errors"],
      };
    }

    if (dataToValidate.password !== dataToValidate.confirmPassword)
      return { success: false, message: "Passwords do not match", errors: {} };

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(dataToValidate),
        credentials: "include",
      });
      const data = await response.json();

      if (data.status === 200) {
        return {
          success: true,
          data: data.data.user,
          message: data.messages.message,
          errors: {},
        };
      } else {
        return { success: false, message: data.messages.message, errors: {} };
      }
    } catch (error) {
      console.error(error);
      throw new Error("An internal error occurred");
    }
  }

  async logout() {
    const url = `${this.#url}/auth/logout`;

    try {
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();

      if (data.status === 200) {
        return {
          success: true,
          message: data.messages.message,
        };
      } else {
        return { success: false, message: data.messages.message };
      }
    } catch (error) {
      console.error(error);
      throw new Error("An internal error occurred");
    }
  }

  async getMe() {
    const url = `${this.#url}/user`;

    try {
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();

      return data;
    } catch (error) {
      console.error(error);
      throw new Error("An internal error occurred");
    }
  }
}

const http = new Http();
export default http;
