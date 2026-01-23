import React from "react";

import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";

import y1 from "../assets/y1.png";
import y2 from "../assets/y2.png";
import r5 from "../assets/r5.png";
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
        backgroundImage: `url(${r5})`,
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
        bgImage={y2}
        onClick={() => navigate("/explain1")}
      />

      <Option
        title="Simulator"
        bgImage={y1}
        onClick={() => navigate("/Auto1")}
      />
    </animated.div>
  );
};

export default Home;
