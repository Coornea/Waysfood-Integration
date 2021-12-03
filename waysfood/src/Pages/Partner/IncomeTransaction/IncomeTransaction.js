import React from "react";

import styles from "./IncomeTransaction.module.css";

export default function IncomeTransaction() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <table className={styles.tableContainer}>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Address</th>
            <th>Products Order</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
          <tr>
            <td>1</td>
            <td>Sugeng</td>
            <td>Cileungsi</td>
            <td>Paket Geprek</td>
            <td>Waiting Approve</td>
            <td className={styles.btnContainer}>
              <button className={styles.btnCancel}>Cancel</button>
              <button className={styles.btnApprove}> Approve</button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}
