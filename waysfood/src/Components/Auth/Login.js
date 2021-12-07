import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";

import LoginModal from "../Modals/LoginModal/LoginModal";

export default function Login() {
   const title = "Login";
   document.title = "Waysfood | " + title;

   const [state, dispatch] = useContext(UserContext);

   let navigate = useNavigate();

   const login = () => {
      dispatch({
         type: "LOGIN_SUCCESS",
         payload: {
            id: "",
            fullName: "",
            email: "",
            phone: "",
            gender: "",
            location: "",
            role: "",
         },
      });
      navigate("/");
   };

   return (
      <div>
         <LoginModal />
      </div>
   );
}
