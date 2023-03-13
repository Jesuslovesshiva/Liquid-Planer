"use strict"

class Navigationsleiste {
    // <nav id="navigationsleiste">
    //   <a href="index.html"><span id="markenname">Liqui-Planner</span></a>
    // </nav>
    constructor() {
        this._html = this._html_generieren();
    }

    _html_generieren() {
        let navigationsleiste = document.createElement("nav")
        navigationsleiste.setAttribute("id", "navigationsleiste")

        let anker = document.createElement("a")
        anker.setAttribute("href", "#")

        let span = document.createElement("span");
        span.setAttribute("id", "markenname");
        span.textContent = "Liqui-Planer";
        anker.insertAdjacentElement("afterbegin", span)

        navigationsleiste.insertAdjacentElement("afterbegin", anker)

        return navigationsleiste;
    }

    anzeigen() {

        let body = document.querySelector("body"); //eigentlich navileiste
        if (body !== null) {
          body.insertAdjacentElement("afterbegin", this._html);
        //   this._datum_aktualisieren();      
        }
    }


}