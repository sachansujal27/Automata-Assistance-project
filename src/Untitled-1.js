import React from "react";

const Option = ({ title, bgImage, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        width: "200px",
        height: "200px",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        color: "#fff",
        fontSize: "18px",
        cursor: "pointer",
        padding: "10px",
        borderRadius: "12px",
      }}
    >
      {title}
    </div>
  );
};

export default Option;





// import React from "react";

// const Option1 = ({ title, bgImage, onClick }) => {
//   return (
//     <div
//       onClick={onClick}
//       style={{
//         width: "200px",
//         height: "200px",
//         backgroundImage: `url(${bgImage})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "flex-end",
//         color: "#fff",
//         fontSize: "18px",
//         cursor: "pointer",
//         padding: "10px",
//         borderRadius: "12px",
//       }}
//     >
//       {title}
//     </div>
//   );
// };

// export default Option1;
