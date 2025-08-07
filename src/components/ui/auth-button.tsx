import { logout } from "../../pages/auth/service";
import { useAuth } from "../../pages/auth/context";
import Button from "./button";
import { Link } from "react-router";
import { useState } from "react";
import ConfirmModal from "./confirm-modal";

export default function AuthButton() {
  const { isLogged, onLogout } = useAuth();
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);

  const handleLogout = async () => {
    await logout();
    onLogout();
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
