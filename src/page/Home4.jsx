import React from "react";

import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";

import ch12 from "../assets/ch12.png";
import g2 from "../assets/g2.png";
import b2 from "../assets/b2.png";
import Option from "../Component/option";

const Home4 = () => {
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
        backgroundImage: `url(${b2})`,
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
        bgImage={ch12}
        onClick={() => navigate("/explain4")}
      />

      <Option
        title="Minimization"
        bgImage={g2}
        onClick={() => navigate("/Auto3")}
      />
    </animated.div>
  );
};

export default Home4;
