import React from "react";
import locations from "../locations";
import { useEffect } from "react";

const RegionsMobile = ({ enteredInfo, setter }) => {
  function changeInfo(region) {
    setter({
      ...enteredInfo,
      region: region,
      district: "",
    });
  }

  useEffect(() => {
    if (enteredInfo.region) {
      document.getElementById(enteredInfo.region).checked = true;
    }
  });

  return (
    <div className="regions-mobile">
      {locations.map((obj) => {
        return (
          <label
            htmlFor={obj.region}
            className="region-mobile"
            onClick={() => changeInfo(obj.region)}
            key={obj.region}
          >
            <input type="radio" name="regions-mobile" id={obj.region} />
            {obj.regionCz}
          </label>
        );
      })}
    </div>
  );
};

export default RegionsMobile;
