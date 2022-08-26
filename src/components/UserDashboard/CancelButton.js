import React from "react";

const CancelButton = (props) => {
  const { _id } = props.userGuide;

  console.log(_id);

  const cancelGuide = () => {
    console.log("cancel guide");
    console.log(_id);
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id }),
    };
    fetch("api/user/cancelguide", requestOptions)
      .then((response) => {
        console.log(response);
        response.json();
      })
      .then((data) => console.log(data));
  };

  return (
    <button className="btn-cancel-guide" onClick={cancelGuide}>
      Cancelar
    </button>
  );
};

export default CancelButton;
