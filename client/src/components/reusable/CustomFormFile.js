import React, { useState } from "react";
import { Form } from "react-bootstrap";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import iconClip from "../../assets/svg/clip.svg";

const CustomFormFile = ({ placeholder, name, onChange, ...rest }) => {
  const [state, setState] = useState({
    src: null,
    crop: {
      unit: "%",
      width: 50,
      aspect: 3 / 4,
    },
  });
  return (
    <>
      <Form.Label
        style={{
          height: "50px",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "none",
          padding: "0.375rem 0.75rem",
          backgroundColor: "rgba(210, 210, 210, 0.25)",
          border: "3px solid #766c6c",
          borderRadius: "5px",
          color: "#6c757d",
          cursor: "pointer",
        }}
      >
        {placeholder}
        <span>
          <img src={iconClip} alt="clip" />
        </span>
      </Form.Label>
      <Form.File
        onChange={(e) => onChange(e)}
        style={{ display: "none" }}
        name={name}
      />
    </>
  );
};

export default CustomFormFile;