import React from "react";
import locations from "../locations";
import { useEffect } from "react";

const Districts = ({ enteredInfo, setter }) => {
  function changeInfo(district) {
    setter({ ...enteredInfo, district: `${district}` });
  }

  useEffect(() => {
    if (enteredInfo.district) {
      document.getElementById(enteredInfo.district).checked = true;
    }
  });

  return (
    <section className="districts-container">
      <h1>Vyberte okres</h1>
      <div className="districts">
        {locations.map((loc) => {
          if (loc.region === enteredInfo.region) {
            return loc.districts.map((district) => {
              return (
                <label
                  key={district}
                  htmlFor={district}
                  className="district"
                  onClick={() => changeInfo(district)}
                >
                  <input type="radio" name="district" id={district} />
                  {district}
                </label>
              );
            });
          }
        })}
      </div>
    </section>
  );
};

export default Districts;
