import React from "react";

import styles from "./MapsPopUp.module.css";
import Map from "../../Content/Maps/Map";
import MyLocation from "../../Content/Cards/MyLocation/MyLocation";

import { Modal } from "react-bootstrap";

export default function MapsPopUp({ show, handleClose }) {
  return (
    <>
      <Modal size="xl" className="modal" show={show} onHide={handleClose}>
        <Map />
        <div style={{ zIndex: "1", marginTop: "-230px" }}>
          <MyLocation />
        </div>
        {/* <div className={styles.content}></div> */}
      </Modal>
    </>
  );
}
