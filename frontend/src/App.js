import "./App.css";
import React from "react";
import { Redirect, BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import Map from "./components/Map";
import Districts from "./components/Districts";
import EstateType from "./components/EstateType";
import ContactForm from "./components/ContactForm";
import RegionsMobile from "./components/RegionsMobile.js";

function App() {
  const [allInfo, setAllInfo] = useState({
    region: "",
    district: "",
    estateType: "",
    name: "",
    phone: "",
    email: "",
  });

  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const [page, setPage] = useState(1);

  function nextPage() {
    if (allInfo.region && allInfo.district && allInfo.estateType) {
      setPage(2);
    }
  }

  function pageBack() {
    allInfo.name = "";
    allInfo.phone = "";
    allInfo.email = "";
    setPage(1);
  }

  function submit(e) {
    e.preventDefault();

    const isInputValid = isEmailValid && isPhoneValid;

    if (allInfo.name && isInputValid) {
      document.getElementById("phone").classList.remove("invalid-input");
      document.getElementById("email").classList.remove("invalid-input");

      let obj = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(allInfo),
      };
      fetch("/lead", obj).then(() => setPage(3));
    } else {
      document.getElementById("phone").classList.remove("invalid-input");
      document.getElementById("email").classList.remove("invalid-input");

      if (!isPhoneValid) {
        document.getElementById("phone").classList.add("invalid-input");
      }
      if (!isEmailValid) {
        document.getElementById("email").classList.add("invalid-input");
      }
    }
  }

  useEffect(() => {
    // this should catch only the basic missclicks and absolute nonsense

    /^[ ]{0,}\S+@\S+\.\S+[ ]{0,}$/.test(allInfo.email)
      ? setIsEmailValid(true)
      : setIsEmailValid(false);

    /^[0-9]{9}$/.test(allInfo.phone)
      ? setIsPhoneValid(true)
      : setIsPhoneValid(false);
  }, [allInfo.email, allInfo.phone]);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [allInfo.district, allInfo.estateType]);

  return (
    <div className="App">
      <BrowserRouter exact path="/">
        <Redirect to="/chci-nabidku" />
      </BrowserRouter>
      {page === 1 && (
        <div className="first-page">
          <Map enteredInfo={allInfo} setter={setAllInfo} page={page} />
          <RegionsMobile enteredInfo={allInfo} setter={setAllInfo} />
          {allInfo.region && (
            <Districts enteredInfo={allInfo} setter={setAllInfo} />
          )}
          <EstateType enteredInfo={allInfo} setter={setAllInfo} />
          {allInfo.estateType && allInfo.district && (
            <button id="continue" onClick={nextPage}>
              Pokra??ovat
            </button>
          )}
        </div>
      )}
      {page === 2 && (
        <div className="second-page">
          <ContactForm enteredInfo={allInfo} setter={setAllInfo} />
          <div className="buttons-container">
            <button
              id="back"
              className="buttons-second-page"
              onClick={pageBack}
            >
              Zp??t
            </button>
            {allInfo.name && allInfo.phone && allInfo.email && (
              <button
                id="send"
                className="buttons-second-page"
                onClick={submit}
              >
                Odeslat
              </button>
            )}
          </div>
        </div>
      )}
      {page === 3 && (
        <div className="third-page">
          <h1 className="success">Formul???? byl ??sp????n?? odesl??n.</h1>
          <a href="https://reas.cz">Domovsk?? str??nka</a>
        </div>
      )}
    </div>
  );
}

export default App;
