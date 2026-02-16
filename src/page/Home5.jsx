import React from "react";

import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";

import p1 from "../assets/p1.png";
import p2 from "../assets/p2.png";
import p3 from "../assets/p3.png";
import Option from "../Component/option";

const Home5 = () => {
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
        backgroundImage: `url(${p3})`,
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
        bgImage={p2}
        onClick={() => navigate("/explain5")}
      />

      <Option
        title="Minimization"
        bgImage={p1}
        onClick={() => navigate("/DFAdiagram")}
      />
    </animated.div>
  );
};

export default Home5;
