import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from "./login-page";
import { Provider } from "react-redux";
import * as hooks from "../../store/hooks";

describe("LoginPage", () => {
  const state = {
    auth: false,
    adverts: { data: [], loaded: false },
    ui: { pending: false, error: null },
  };
  const renderComponent = () =>
    render(
      <Provider
        store={{
          getState: () => state,
          // @ts-expect-error: subscribe
          subscribe: () => {},
          // @ts-expect-error: dispatch
          dispatch: () => {},
        }}
      >
        <LoginPage />
      </Provider>,
    );

  afterEach(() => {
    vi.resetAllMocks();
  });

  test("should render", () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  test("Should dispatch login action with form credentials", async () => {
    const mockLoginAction = vi.fn().mockResolvedValue(undefined);
    vi.spyOn(hooks, "useLoginAction").mockReturnValue(mockLoginAction);

    renderComponent();

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Log in!");

    expect(button).toBeDisabled();

    await userEvent.type(emailInput, "user@mail.com");
    await userEvent.type(passwordInput, "1234");

    expect(button).toBeEnabled();

    await userEvent.click(button);

    expect(mockLoginAction).toHaveBeenCalledTimes(1);
    expect(mockLoginAction).toHaveBeenCalledWith({
      email: "user@mail.com",
      password: "1234",
      remember: false,
    });
  });
});
