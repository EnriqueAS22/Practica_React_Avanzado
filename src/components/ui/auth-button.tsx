import Button from "./button";
import { Link } from "react-router";
import { useState } from "react";
import ConfirmModal from "./confirm-modal";
import { useAuth } from "../../store/hooks";
import { useLogoutAction } from "../../store/hooks";

export default function AuthButton() {
  const isLogged = useAuth();
  const logoutAction = useLogoutAction();
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);

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
            logoutAction();
          }}
          onCancel={() => setShowConfirmLogout(false)}
        />
      )}
    </>
  );
}
