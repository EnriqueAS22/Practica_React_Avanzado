import "./login-page.css";
import { useState } from "react";
import Button from "../../components/ui/button";
import { useLocation, useNavigate } from "react-router";
import { useLoginAction, useUiResetError } from "../../store/hooks";
import { useAppSelector } from "../../store";
import { getUi } from "../../store/selectors";

function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const loginAction = useLoginAction();
  const uiResetErrorAction = useUiResetError();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const { pending: isFetching, error } = useAppSelector(getUi);

  const { email, password, remember } = credentials;
  const isDisabled = !email || !password || isFetching;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await loginAction(credentials);
      const to = location.state?.from ?? "/";
      navigate(to, { replace: true });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="mt-6 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="space-y-12 rounded-2xl bg-white p-8 shadow-lg"
      >
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-base text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-base text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <input
            id="remember"
            type="checkbox"
            name="remember"
            checked={remember}
            onChange={(event) =>
              setCredentials({
                email,
                password,
                remember: event.target.checked,
              })
            }
            className="border-border text-primary focus:ring-primary h-4 w-4 rounded"
          />
          <label htmlFor="remember" className="text-text ml-2 block text-sm">
            Remember
          </label>
        </div>
        <Button
          className="login-form-submit"
          disabled={isDisabled}
          type="submit"
          $variant="primary"
        >
          Log in!
        </Button>
      </form>
      {error && (
        <div
          className="login-page-error"
          role="alert"
          onClick={() => {
            uiResetErrorAction();
          }}
        >
          {error.message}
        </div>
      )}
    </div>
  );
}

export default LoginPage;
