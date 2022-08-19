import React, { Component, useMemo } from "react";
import CancelButton from "./CancelButton";
import "./GuideTable.scss";
import { Link } from "react-router-dom";

const GuideTable = (props) => {
  const data = props.userGuides;

  const columns = ["Tracking Num.", "User", "Precio", "Status"];

  const renderRow = (guide, index) => {
    return (
      <tr className="tr-element" key={index}>
        <td>{guide.trackingNumber}</td>
        <td>{guide.currentUser}</td>
        <td>{guide.guideCost}</td>
        {/* <td>{guide.guideStatus}</td> */}
        {/* <td>
          <CancelButton userGuide={guide}>Descargar</CancelButton>
        </td> */}
        <td>
          <a href={`${guide.fileUrl}`} target="_blank">
            <button id="red" className="btn-cancel-guide">
              Imprimir
            </button>
          </a>
        </td>
      </tr>
    );
  };

  return (
    <div>
      <table className="table-element">
        <thead className=" thead-element">
          {columns.map((colName) => {
            return <th>{colName}</th>;
          })}
        </thead>
        <tbody className="">{data.map(renderRow)}</tbody>
      </table>
    </div>
  );
};

export default GuideTable;
