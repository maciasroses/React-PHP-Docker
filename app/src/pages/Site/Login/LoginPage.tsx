import { useAuth } from "@/hooks";
import { Link } from "react-router-dom";
import { UserClient } from "@/services";
import { GenericInput, SubmitButton } from "@/components";
import { ReactNode, useState } from "react";
import { INITIAL_STATE_RESPONSE } from "@/constants";
import type { ILoginState } from "@/interfaces";

const LoginPage = () => {
  const { setUser } = useAuth();
  const [isPending, setIsPending] = useState(false);
  const [badResponse, setBadResponse] = useState<ILoginState>(
    INITIAL_STATE_RESPONSE
  );

  const submitAction: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    setIsPending(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await UserClient.login(formData);
    if (response && response.success) {
      setUser(response.data);
    } else {
      setBadResponse(response as ILoginState);
    }
    setIsPending(false);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center dark:text-white px-4 pt-20">
      <div className="flex flex-col items-center gap-4 max-h-full overflow-y-auto py-4">
        <Link to="/" className="text-4xl">
          LOGO
        </Link>
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl md:text-6xl">Login</h1>
          {badResponse.message && (
            <p className="text-red-600">{badResponse.message}</p>
          )}
          <form onSubmit={submitAction}>
            <fieldset disabled={isPending}>
              <div className="flex flex-col gap-4 text-base md:text-xl">
                <GenericDiv>
                  <GenericInput
                    id="email"
                    ariaLabel="Email"
                    type="email"
                    placeholder="email@test.com"
                    error={badResponse.errors.email}
                  />
                </GenericDiv>
                <GenericDiv>
                  <GenericInput
                    id="password"
                    ariaLabel="Password"
                    type="password"
                    placeholder="password"
                    error={badResponse.errors.password}
                  />
                </GenericDiv>
              </div>
              <div className="text-center mt-4">
                <SubmitButton title="Login" pending={isPending} />
              </div>
            </fieldset>
          </form>
        </div>
        <p>
          Not registered yet?{" "}
          <span>
            <Link to="/signup" className="text-blue-500">
              Sign up
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

const GenericDiv = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col gap-2 w-full">{children}</div>;
};
