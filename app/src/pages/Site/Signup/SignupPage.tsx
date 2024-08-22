import { ReactNode, useState } from "react";
import { useAuth } from "@/hooks";
import { Link } from "react-router-dom";
import { UserClient } from "@/services";
import { GenericInput, SubmitButton } from "@/components";
import { INITIAL_STATE_RESPONSE } from "@/constants";
import type { IRegisterState } from "@/interfaces";

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
      <div className="flex flex-col items-center gap-4 max-h-full overflow-y-auto py-4">
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
                <GenericPairDiv>
                  <GenericDiv>
                    <GenericInput
                      id="name"
                      ariaLabel="Name"
                      type="text"
                      placeholder="name"
                      error={badResponse.errors.name}
                    />
                  </GenericDiv>
                  <GenericDiv>
                    <GenericInput
                      id="email"
                      ariaLabel="Email"
                      type="email"
                      placeholder="email@test.com"
                      error={badResponse.errors.email}
                    />
                  </GenericDiv>
                </GenericPairDiv>
                <GenericPairDiv>
                  <GenericDiv>
                    <GenericInput
                      id="password"
                      ariaLabel="Password"
                      type="password"
                      placeholder="password"
                      error={badResponse.errors.password}
                    />
                  </GenericDiv>
                  <GenericDiv>
                    <GenericInput
                      id="confirmPassword"
                      ariaLabel="Confirm Password"
                      type="password"
                      placeholder="confirm password"
                      error={badResponse.errors.confirmPassword}
                    />
                  </GenericDiv>
                </GenericPairDiv>
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

const GenericPairDiv = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full">{children}</div>
  );
};

const GenericDiv = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col gap-2 w-full sm:w-1/2">{children}</div>;
};
