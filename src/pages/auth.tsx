import { useParams } from "react-router-dom";
import AuthPageLayout from "../layouts/authPageLayout";
import Login from "../components/login";
import Register from "../components/register";

const AuthPage = () => {
  const { type } = useParams();

  const content =
    type?.toLocaleLowerCase() === "register" ? <Register /> : <Login />;

  return (
    <div className="authPage">
      <AuthPageLayout>{content}</AuthPageLayout>
    </div>
  );
};

export default AuthPage;
