import React from "react";

const PageHeader = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-3 text-white/90 text-lg md:text-xl">{subtitle}</p>
      )}
    </div>
  );
};

export default PageHeader;
