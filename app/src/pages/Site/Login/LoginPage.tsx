import { http } from "../../../services";
import { useAuth } from "../../../hooks/useAuth";
// import { useCallback, useEffect, useState } from "react";
import { useState } from "react";
import { INITIAL_STATE_RESPONSE } from "../../../constants";
import type { ILoginState } from "../../../interfaces";
import SubmitButton from "../../../components/Submitbutton";

const LoginPage = () => {
  // const { setUser, setIsLoading } = useAuth();
  const { setUser } = useAuth();
  const [isPending, setIsPending] = useState(false);
  const [badResponse, setBadResponse] = useState<ILoginState>(
    INITIAL_STATE_RESPONSE
  );

  // const fetchCurrentUser = useCallback(async () => {
  //   const response = await http.getMe();
  //   if (response.status === 200) {
  //     setUser(response.data);
  //   }
  // }, [setUser]);

  // useEffect(() => {
  //   fetchCurrentUser();
  //   setIsLoading(false);
  // });

  const submitAction: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    setIsPending(true);
    const formData = new FormData(event.currentTarget);
    const response = await http.login(formData);
    if (response.success) {
      setUser(response.data);
    } else {
      setBadResponse(response);
    }
    setIsPending(false);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center dark:text-white">
      <div className="flex flex-col items-center gap-4">
        <a className="text-4xl" href="/">
          LOGO
        </a>
        <div className="flex flex-col items-center gap-2">
          <h1 className=" text-6xl">Login</h1>
          {badResponse.message && (
            <p className="text-red-600">{badResponse.message}</p>
          )}
          <form onSubmit={submitAction}>
            <fieldset disabled={isPending}>
              <div className="flex flex-col gap-4 text-xl">
                <div className="flex flex-col gap-2">
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
                <div className="flex flex-col gap-2">
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
              </div>
              <div className="text-center">
                <SubmitButton title="Login" pending={isPending} />
              </div>
            </fieldset>
          </form>
        </div>
        <p>
          Not registered yet?{" "}
          <span>
            <a className="text-blue-500" href="signup">
              Sign up
            </a>
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
