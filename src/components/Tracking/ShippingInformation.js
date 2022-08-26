import React from "react";

const ShippingInformation = (props) => {
  const { shipmentHistory, guideNumber, guideInformation } = props;

  console.log(guideInformation.data.shipments[0].receiverName);

  return (
    <>
      <div>
        <h1 className="estado-de-envio-heading">Estado de envío</h1>
        <h1 className="estado-de-pedido">
          Status: <span>{guideNumber}</span>{" "}
        </h1>
        <h1 className="estado-de-pedido">
          Código de rastreo: <span>{guideNumber}</span>
        </h1>
        <h1 className="estado-de-pedido">
          Recibido por:{" "}
          <span>{guideInformation.data.shipments[0].receiverName}</span>{" "}
        </h1>
      </div>

      <div>
        <h1 className="historial-pedido-heading">Historial de Pedido</h1>

        <table className="tracking-table">
          <thead>
            <tr>
              <th className="table-header-tracking">Estatus</th>
              <th className="table-header-tracking">Descripción</th>
              <th className="table-header-tracking">Fecha</th>
            </tr>
          </thead>
          <tbody className="tbody-tracking-table">
            {shipmentHistory.map((step) => {
              return (
                <tr>
                  <td className="table-data-tracking">{step.status}</td>
                  <td className="table-data-tracking">{step.description}</td>
                  <td className="table-data-tracking">{step.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ShippingInformation;
