import React from "react";

import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";

import r1 from "../assets/r1.png";
import r2 from "../assets/r2.png";
import r4 from "../assets/r4.png";
import Option from "../Component/option";

const Home3 = () => {
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
        backgroundImage: `url(${r4})`,
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
        bgImage={r1}
        onClick={() => navigate("/explain3")}
      />

      <Option
        title="Converter"
        bgImage={r2}
        onClick={() => navigate("/Auto2")}
      />
    </animated.div>
  );
};

export default Home3;
