import React from "react";
import "./MapInicio.scss";
import PalomaQuiken from "../../assets/Inicio/paloma-quiken.svg";

//images
import imgMap from "../../assets/Inicio/Quiken_Presencia_Nacional_Internacional.png";

const MapInicio = () => {
  return (
    <div className="main-wrapper-map">
      <div className="text-wrapper">
        <h2 className="heading-map-section">
          Presencia Nacional e Internacional
        </h2>

        <div className="states-wrapper">
          <div className="state-column">
            <div className="state-row">
              <img
                className="paloma-quiken"
                src={PalomaQuiken}
                alt="paloma-icon"
              />
              <p className="state-name">Nuevo León</p>
            </div>

            <div className="state-row">
              <img className="paloma-quiken" src={PalomaQuiken} alt="paloma" />
              <p className="state-name">Coahuila</p>
            </div>

            <div className="state-row">
              <img className="paloma-quiken" src={PalomaQuiken} alt="paloma" />
              <p className="state-name">Durango</p>
            </div>

            <div className="state-row">
              <img className="paloma-quiken" src={PalomaQuiken} alt="paloma" />
              <p className="state-name">Tamaulipas</p>
            </div>
          </div>
          <div className="state-column">
            <div className="state-row">
              <img className="paloma-quiken" src={PalomaQuiken} alt="paloma" />
              <p className="state-name">San Luis Potosí</p>
            </div>
            <div className="state-row">
              <img className="paloma-quiken" src={PalomaQuiken} alt="paloma" />
              <p className="state-name">Norte de Veracruz</p>
            </div>
            <div className="state-row">
              <img className="paloma-quiken" src={PalomaQuiken} alt="paloma" />
              <p className="state-name">Ciudad de México</p>
            </div>

            <div className="state-row">
              <img className="paloma-quiken" src={PalomaQuiken} alt="paloma" />
              <p className="state-name">Querataro</p>
            </div>
          </div>

          <div className="state-column">
            <div className="state-row">
              <img className="paloma-quiken" src={PalomaQuiken} alt="paloma" />
              <p className="state-name">Guanjuato</p>
            </div>

            <div className="state-row">
              <img className="paloma-quiken" src={PalomaQuiken} alt="paloma" />
              <p className="state-name">Chihuahua</p>
            </div>

            <div className="state-row">
              <img className="paloma-quiken" src={PalomaQuiken} alt="paloma" />
              <p className="state-name">Guadalajara</p>
            </div>

            <div className="state-row">
              <img className="paloma-quiken" src={PalomaQuiken} alt="paloma" />
              <p className="state-name-dallas">Laredo, Texas</p>
            </div>
          </div>
        </div>
      </div>
      <div className="img-wrapper">
        <img className="map-image" src={imgMap} alt="map"></img>
      </div>
    </div>
  );
};

export default MapInicio;
