import React from "react";

import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";

import ch1 from "../assets/ch1.png";
import bb1 from "../assets/bb1.png";
import ch2 from "../assets/ch2.png";
import Option from "../Component/option";

const Home = () => {
  const navigate = useNavigate();

  const pageAnim = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 700 },
  });

  return (
    <animated.div
      style={{
        ...pageAnim,
        backgroundImage: `url(${bb1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "50px",
      }}
    >
      <Option
        title="Explaination"
        bgImage={ch1}
        onClick={() => navigate("/explain")}
      />

      <Option
        title="Simulator"
        bgImage={ch2}
        onClick={() => navigate("/Auto")}
      />
    </animated.div>
  );
};

export default Home;
