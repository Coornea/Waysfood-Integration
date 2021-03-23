import { Button } from "react-bootstrap";

const NavButton = ({ handleShowLogin, handleShowRegister }) => {
  return (
    <>
      <Button
        variant="brown mr-2 py-1"
        style={{ width: "100px" }}
        onClick={handleShowRegister}
      >
        Register
      </Button>
      <Button
        variant="brown py-1"
        style={{ width: "100px" }}
        onClick={handleShowLogin}
      >
        Login
      </Button>
    </>
  );
};

export default NavButton;
