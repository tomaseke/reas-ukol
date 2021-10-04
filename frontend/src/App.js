import "./App.css";
import React from "react";
import { Redirect, BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import Map from "./components/Map";
import Districts from "./components/Districts";
import EstateType from "./components/EstateType";
import ContactForm from "./components/ContactForm";

function App() {
  const [allInfo, setAllInfo] = useState({
    region: "",
    district: "",
    estateType: "",
    name: "",
    phone: "",
    email: "",
  });

  const [page, setPage] = useState(1);

  function nextPage() {
    if (allInfo.region && allInfo.district && allInfo.estateType) {
      setPage(2);
    }
  }

  function pageBack() {
    setPage(1);
    if (allInfo.region) {
      // document.querySelector(`.${allInfo.region}`).style.backgroundColor =
      //   "blue";
      console.log(document.querySelector(`.${allInfo.region}`));
    }
  }

  function submit(e) {
    e.preventDefault();
    if (allInfo.name && allInfo.phone && allInfo.email) {
      let obj = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(allInfo),
      };
      fetch("/lead", obj);
    }
  }

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
          {allInfo.region && (
            <Districts enteredInfo={allInfo} setter={setAllInfo} />
          )}
          <EstateType enteredInfo={allInfo} setter={setAllInfo} />
          {allInfo.estateType && allInfo.district && (
            <button id="continue" onClick={nextPage}>
              Pokračovat
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
              Zpět
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
    </div>
  );
}

export default App;
