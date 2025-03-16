import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useRef, useState, useEffect } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import GoogleLoginButton from "../../components/GoogleLoginButton";
import { ToastContainer, toast } from "react-toastify";
import ReactTitle from "react-helmet";

const Login = () => {
  const { user, signIn, signInGoogle, ForgotPassword, redirectPath, setRedirectPath } =
    useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef(); // Add a ref for the password field
  const [Error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");

    if (!email || !password) {
      setError("Email and Password are required.");
      setLoading(false);
      return;
    }

    signIn(email, password)
      .then((result) => {
        console.log("sign in called");

        toast.success("Login successful!", {
          position: "top-center",
          autoClose: 2000,
        });

        setError("");
        setLoading(false);
      })
      .catch((error) => {
        console.log("Sign-in error:", error.message);
        if (error.message.includes("auth/user-not-found")) {
          setError("No user found with this email.");
        } else if (error.message.includes("auth/wrong-password")) {
          setError("Invalid password. Please try again.");
        } else {
          setError(error.message);
        }
        setLoading(false);
      });
  };

  const handleForgotPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      setError("Please enter your email to reset the password.");
      return;
    }

    ForgotPassword(email)
      .then(() => {
        console.log("Password reset email sent successfully.");
        navigate("/forgotpass");
      })
      .catch((error) => {
        console.log("Error resetting password:", error.message);
        setError(error.message);
      });
  };

  // Function to handle easy login
  const handleEasyLogin = () => {
    const email = "hotel@new.com";
    const password = "Asdfasdf";

    // Set the email and password fields
    emailRef.current.value = email;
    passwordRef.current.value = password;

    // Trigger the login process
    signIn(email, password)
      .then((result) => {
        console.log("Easy login successful!");

        toast.success("Easy login successful!", {
          position: "top-center",
          autoClose: 2000,
        });

        setError("");
        setLoading(false);
      })
      .catch((error) => {
        console.log("Easy login error:", error.message);
        setError(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (user) {
      const destination = redirectPath || "/";
      const timer = setTimeout(() => {
        navigate(destination, { replace: true });
      }, 2000); // Wait for 2 seconds

      return () => clearTimeout(timer); // Cleanup timeout on unmount or dependency change
    }
  }, [user, redirectPath, navigate, setRedirectPath]);

  return (
    <div className="my-5 bg-bakground">
      <ReactTitle title="RH || Login" />
      <h1 className="text-3xl mt-7 ralewayfont font-bold text-center mb-6 text-cta-text">
        Please <span className="text-[#309255]">Login</span>
      </h1>
      <ToastContainer
        position="top-center"
        hideProgressBar
        newestOnTop
        closeOnClick
      />

      <form onSubmit={handleLogin} className="md:w-3/4 lg:w-1/2 mx-auto">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            required
            name="email"
            ref={emailRef}
            placeholder="Email"
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            required
            name="password"
            ref={passwordRef} // Add ref for password field
            placeholder="Password"
            className="input input-bordered"
          />
          <label className="label">
            <a
              onClick={handleForgotPassword}
              className="label-text-alt link link-hover cursor-pointer"
            >
              Forgot password?
            </a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button
            className="btn bg-green-50 px-10 hover:bg-green-800 hover:text-white font-medium border border-green-500"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>

      {/* Easy Login Button */}
      <div className="text-center mt-4">
        <button
          onClick={handleEasyLogin}
          className="btn bg-blue-50 px-10 hover:bg-blue-800 hover:text-white font-medium border border-blue-500"
        >
          Easy Login (Test User)
        </button>
      </div>

      {Error && <p className="text-red-600 text-center text-sm my-3">{Error}</p>}
      <p className="text-center mt-4">
        Do not have an account{" "}
        <Link className="text-blue-600 font-bold" to="/register">
          Register
        </Link>
      </p>
      <GoogleLoginButton signInGoogle={signInGoogle}></GoogleLoginButton>
    </div>
  );
};

export default Login;