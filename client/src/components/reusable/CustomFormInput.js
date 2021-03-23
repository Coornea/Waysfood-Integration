import { Form } from "react-bootstrap";
const CustomFormInput = ({ isBrown, ...rest }) => {
  const style = {
    height: "50px",
    boxShadow: "none",
    backgroundColor: "rgba(210, 210, 210, 0.25)",
    border: isBrown ? "3px solid #766c6c" : "3px solid #D2D2D2",
  };
  return <Form.Control style={style} {...rest} />;
};

export default CustomFormInput;
