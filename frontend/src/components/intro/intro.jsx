import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/footer";
import hom from "../../../public/assets/images/hom.png";
import mag from "../../../public/assets/images/mag.jpg";
import red from "../../../public/assets/images/red.jpg";
import { AuthContext } from "../../context/Authcontext";

const Intro = () => {
  const navigate = useNavigate();
  const { user } = React.useContext(AuthContext);

  const handleGetStarted = () => {
    if (user) {
      navigate("/home"); // Redirects to the Home component when the button is clicked
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <div>
        <div className="int">
          {/* Authentication Links */}

          <div
            className="intro"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1)), url(${red})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "100vh", // Full-page height
              width: "100%", // Full-page width
            }}
          >
            <nav>
              <div>
                {!user ? (
                  <>
                    <div className="log">
                      <button
                        className="logb"
                        onClick={() => navigate("/login")}
                      >
                        Login
                      </button>
                      <button
                        className="logb"
                        onClick={() => navigate("/signup")}
                      >
                        Sign Up
                      </button>
                    </div>
                  </>
                ) : (
                  <button
                    className="pbtn"
                    onClick={() => navigate("/profile")} // Optional: Navigate to user profile
                  >
                    Profile
                  </button>
                )}
              </div>
            </nav>
            <div className="int">
              <span className="ws">
                <h1 className="intw">
                  Welcome to the <br /> David's Dessert!{" "}
                </h1>
                <p style={{ color: "gray" }}>
                  Delicious treats await you. <br /> Start your sweet journey
                  now!
                </p>
              </span>
              <img className="hom" src={hom} alt="" />
            </div>

            <button
              className="btn btn-primary"
              onClick={handleGetStarted}
              style={{ marginLeft: "3rem" }}
            >
              Explore
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Intro;
