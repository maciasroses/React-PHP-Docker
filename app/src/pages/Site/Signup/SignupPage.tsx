import { UserClient } from "../../../services";
import { useAuth } from "../../../hooks/useAuth";
import { useState } from "react";
import SubmitButton from "../../../components/Submitbutton";
import { INITIAL_STATE_RESPONSE } from "../../../constants";
import type { IRegisterState } from "../../../interfaces";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const { setUser } = useAuth();
  const [isPending, setIsPending] = useState(false);
  const [badResponse, setBadResponse] = useState<IRegisterState>(
    INITIAL_STATE_RESPONSE
  );

  const submitAction: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    setIsPending(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await UserClient.register(formData);
    if (response && response.success) {
      setUser(response.data);
    } else {
      setBadResponse(response as IRegisterState);
    }
    setIsPending(false);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center dark:text-white px-4 pt-20">
      <div className="flex flex-col items-center gap-4 max-h-full overflow-y-scroll py-4">
        <Link to="/" className="text-4xl">
          LOGO
        </Link>
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl md:text-6xl">Sign up</h1>
          {badResponse.message && (
            <p className="text-red-600">{badResponse.message}</p>
          )}
          <form onSubmit={submitAction}>
            <fieldset disabled={isPending}>
              <div className="flex flex-col gap-4 text-base md:text-xl">
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <div className="flex flex-col gap-2 w-full sm:w-1/2">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="name"
                      className={`border block w-full p-2.5 text-sm rounded-lg dark:bg-gray-700 ${
                        badResponse.errors.name
                          ? "bg-red-50 border-red-500 text-red-900 dark:text-red-400 placeholder-red-700 dark:placeholder-red-500 focus:ring-red-500 focus:border-red-500"
                          : "bg-gray-50 border-gray-300 text-gray-900 dark:text-white dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                    />
                    {badResponse.errors.name && (
                      <small className="text-red-600">
                        {badResponse.errors.name}
                      </small>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 w-full sm:w-1/2">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="email@test.com"
                      className={`border block w-full p-2.5 text-sm rounded-lg dark:bg-gray-700 ${
                        badResponse.errors.email
                          ? "bg-red-50 border-red-500 text-red-900 dark:text-red-400 placeholder-red-700 dark:placeholder-red-500 focus:ring-red-500 focus:border-red-500"
                          : "bg-gray-50 border-gray-300 text-gray-900 dark:text-white dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                    />
                    {badResponse.errors.email && (
                      <small className="text-red-600">
                        {badResponse.errors.email}
                      </small>
                    )}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <div className="flex flex-col gap-2 w-full sm:w-1/2">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="password"
                      className={`border block w-full p-2.5 text-sm rounded-lg dark:bg-gray-700 ${
                        badResponse.errors.password
                          ? "bg-red-50 border-red-500 text-red-900 dark:text-red-400 placeholder-red-700 dark:placeholder-red-500 focus:ring-red-500 focus:border-red-500"
                          : "bg-gray-50 border-gray-300 text-gray-900 dark:text-white dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                    />
                    {badResponse.errors.password && (
                      <small className="text-red-600">
                        {badResponse.errors.password}
                      </small>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 w-full sm:w-1/2">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder="confirm password"
                      className={`border block w-full p-2.5 text-sm rounded-lg dark:bg-gray-700 ${
                        badResponse.errors.confirmPassword
                          ? "bg-red-50 border-red-500 text-red-900 dark:text-red-400 placeholder-red-700 dark:placeholder-red-500 focus:ring-red-500 focus:border-red-500"
                          : "bg-gray-50 border-gray-300 text-gray-900 dark:text-white dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                    />
                    {badResponse.errors.confirmPassword && (
                      <small className="text-red-600">
                        {badResponse.errors.confirmPassword}
                      </small>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-center mt-4">
                <SubmitButton title="Sign up" pending={isPending} />
              </div>
            </fieldset>
          </form>
        </div>
        <p>
          Already registered?{" "}
          <span>
            <Link to="/login" className="text-blue-500">
              Log in
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
