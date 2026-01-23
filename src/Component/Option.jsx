import React from "react";
import { useSpring, animated } from "@react-spring/web";

const Option = ({ title, bgImage, onClick }) => {
  const [style, api] = useSpring(() => ({
    scale: 1,
    boxShadow: "0px 8px 20px rgba(0,0,0,0.35)",
    borderRadius: "24px",
  }));

  const handleClick = () => {
    api.start({
      scale: 0.92,
      config: { tension: 400, friction: 12 },
    });

    setTimeout(() => {
      api.start({ scale: 1 });
      onClick();
    }, 120);
  };

  return (
    <animated.div
      style={{
        ...style,
        width: "300px",
        height: "300px",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        padding: "18px",
        color: "#fff",
        fontSize: "22px",
        fontWeight: "600",
        overflow: "hidden", // important for rounded effect
      }}
      onMouseEnter={() =>
        api.start({
          scale: 1.08,
          boxShadow: "0px 25px 45px rgba(0,255,255,0.55)",
        })
      }
      onMouseLeave={() =>
        api.start({
          scale: 1,
          boxShadow: "0px 8px 20px rgba(0,0,0,0.35)",
        })
      }
      onClick={handleClick}
    >
      {/* Text background blur for smooth rounded look */}
      <div
        style={{
          width: "100%",
          textAlign: "center",
          padding: "10px",
          borderRadius: "16px",
          background: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(6px)",
        }}
      >
        {title}
      </div>
    </animated.div>
  );
};

export default Option;
