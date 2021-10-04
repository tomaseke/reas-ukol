import React from "react";
import { useEffect } from "react";

const EstateType = ({ enteredInfo, setter }) => {
  function changeInfo(e) {
    setter({ ...enteredInfo, estateType: `${e.target.id}` });
  }

  useEffect(() => {
    if (enteredInfo.estateType) {
      document.getElementById(enteredInfo.estateType).checked = true;
    }
  });

  return (
    <section className="estate-type-container">
      <h1>Vyberte typ nemovitosti</h1>
      <div className="estate-type-radios">
        <label htmlFor="flat" className="estate-label">
          <input
            type="radio"
            name="estate-type"
            id="flat"
            onClick={changeInfo}
          />
          Byt
        </label>
        <label htmlFor="house" className="estate-label">
          <input
            type="radio"
            name="estate-type"
            id="house"
            onClick={changeInfo}
          />
          Dům
        </label>
        <label htmlFor="lot" className="estate-label">
          <input
            type="radio"
            name="estate-type"
            id="lot"
            onClick={changeInfo}
          />
          Pozemek
        </label>
      </div>
    </section>
  );
};

export default EstateType;
