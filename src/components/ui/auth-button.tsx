import { logout } from "../../pages/auth/service";
import Button from "./button";
import { Link } from "react-router";
import { useState } from "react";
import ConfirmModal from "./confirm-modal";
import { authLogout } from "../../store/actions";
import { useAppDispatch, useAppSelector } from "../../store";
import { getIsLogged } from "../../store/selectors";

export default function AuthButton() {
  const isLogged = useAppSelector(getIsLogged);
  const dispatch = useAppDispatch();
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);

  const handleLogout = async () => {
    await logout();
    dispatch(authLogout());
  };

  return (
    <>
      {isLogged ? (
        <Button $variant="primary" onClick={() => setShowConfirmLogout(true)}>
          Logout
        </Button>
      ) : (
        <Button $variant="primary" as={Link} to="/login">
          Login
        </Button>
      )}

      {showConfirmLogout && (
        <ConfirmModal
          message="Are you sure do you want to logout?"
          onConfirm={() => {
            setShowConfirmLogout(false);
            handleLogout();
          }}
          onCancel={() => setShowConfirmLogout(false)}
        />
      )}
    </>
  );
}
