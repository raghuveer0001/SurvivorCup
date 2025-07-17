// OAuthRedirect.js
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function OAuthRedirect() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");

    if (code) {
      // yahan code ko backend ya auth service ko bhejna hai for token
      // phir user ko dashboard ya home page redirect kar do
      console.log("Received OAuth code:", code);
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, [location, navigate]);

  return <div>Processing login...</div>;
}
