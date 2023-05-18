"use strict"

class Fehler {

    constructor(fehlertext, formular_fehler) {
        this._fehlertext = fehlertext;
        this._formular_fehler = formular_fehler;
        this._html = this._html_generieren();
    }

    _html_generieren() {
        let fehlerbox = document.createElement("div");
        fehlerbox.setAttribute("class", "fehlerbox")

        let fehlertext = document.createElement("span")
        fehlertext.textContent = this._fehlertext;
        fehlerbox.insertAdjacentElement("afterbegin", fehlertext)

        let fehlerliste = document.createElement("ul")
        this._formular_fehler.forEach(fehler => {
          let fehlerlistenpunkt = document.createElement("li")
          fehlerlistenpunkt.textContent = fehler;
          fehlerliste.insertAdjacentElement("beforeend", fehlerlistenpunkt)
        });
        fehlerbox.insertAdjacentElement("beforeend", fehlerliste);

        return fehlerbox;
    }
    
    
    _entfernen() {
        let bestehende_fehlerbox = document.querySelector(".fehlerbox");
        if (bestehende_fehlerbox !== null) {
          bestehende_fehlerbox.remove();
        }
    }

    anzeigen() {
            this._entfernen();
            let eingabeformular_container = document.querySelector("#eingabeformular-container");
            if (eingabeformular_container !== 0) {
                eingabeformular_container.insertAdjacentElement("afterbegin", this._html)
            }
        }

    // fehler coden, um einen fehler zu inszantieren....
    // .... 2 parameter, einmal fehler text einmal fehler liste
    // soll es in unserer classe eine eigene eigenschaft geben wo wir dann eben fehler text und fehler liste vorhalten können
    // html eigenschaft -> wird aus html generieren gespeist die fehlerbox generiert
    // anzeigen methode um die fehlerbox anzuzeigen
}