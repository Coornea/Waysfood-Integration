import React, { useState } from "react";

import { Modal } from "react-bootstrap";

import styles from "./RegisterModal.module.css";

export default function RegisterModal({ showReg, handleCloseReg, login }) {
  const dataUser = JSON.parse(localStorage.getItem("dataUser"));
  const [data, setData] = useState({
    id: "",
    image: "",
    email: "",
    password: "",
    fullname: "",
    gender: "",
    phone: "",
    status: "",
    order: [],
  });

  const toSwitch = () => {
    handleCloseReg();
    login();
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    data.id = Object.keys(dataUser).length + 1;
    dataUser.push(data);
    console.log(dataUser);
    localStorage.setItem("dataUser", JSON.stringify(dataUser));
    handleCloseReg();
  };

  const handleChange = (e) => {
    e.preventDefault();
    setData({
      ...data,
      id: "",
      image: "",
      [e.target.name]: e.target.value,
      fullname: "",
      gender: "",
      phone: "",
      status: "",
      order: [],
    });
  };

  return (
    <div>
      <Modal className="modal" show={showReg} onHide={handleCloseReg}>
        <form onSubmit={handleOnSubmit} className={styles.formContainer}>
          <h2 className={styles.formLabel}>Register</h2>
          <div>
            <input
              onChange={(e) => handleChange(e)}
              className={styles.formInput}
              type="email"
              id="email"
              placeholder="Email"
            />
          </div>
          <div>
            <input
              onChange={(e) => handleChange(e)}
              type="password"
              className={styles.formInput}
              id="password"
              placeholder="Password"
            />
          </div>
          <div>
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              className={styles.formInput}
              id="name"
              placeholder="Full Name"
            />
          </div>
          <div>
            <input
              onChange={(e) => handleChange(e)}
              type="gender"
              className={styles.formInput}
              id="gender"
              placeholder="Gender"
            />
          </div>
          <div>
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              className={styles.formInput}
              id="phone"
              placeholder="Phone Number"
            />
          </div>
          <div>
            <select
              onChange={(e) => handleChange(e)}
              className={styles.formInput}
              id="status"
            >
              <option value="As User">As User</option>
              <option value="Partner">Partner</option>
              <option value="Customer">Customer</option>
            </select>
          </div>
          <div>
            <button className={styles.btnRegister} type="submit">
              Register
            </button>
            <p className={styles.formText}>
              Already have an account ? Click{" "}
              <b onClick={toSwitch} className={styles.formTextBold}>
                Here
              </b>
            </p>
          </div>
        </form>
      </Modal>
    </div>
  );
}
