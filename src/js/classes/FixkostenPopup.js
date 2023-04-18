"use strict";

class FixkostenPopup {
  constructor(monatsliste) {
    this.monatsliste = monatsliste;
    this._html = this._html_generieren();
    this._registerEventListeners();
  }

  _registerEventListeners() {
    const overlay = this._html.querySelector(".fixkosten-popup-overlay");
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        // Check if the click is outside the content
        this.hide();
      }
    });

    const form = this._html.querySelector("#fixkosten-form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const totalFixkosten = Array.from(form.elements)
        .filter((el) => el.tagName === "INPUT")
        .reduce((total, input) => total + parseFloat(input.value || 0), 0);

      this.updateFixkostenAusgaben(totalFixkosten);
      this.hide();
    });
  }

  updateFixkostenAusgaben(totalFixkosten) {
    const eintraege = this._monatsliste.getEntries();
    const existingFixkosten = eintraege.find(
      (eintrag) => eintrag.name() === "Fixausgaben"
    );

    if (existingFixkosten) {
      existingFixkosten.setBetrag(totalFixkosten);
    } else {
      const fixkostenAusgabe = new Ausgabe(
        "Fixausgaben",
        totalFixkosten,
        new Date()
      );
      this._monatsliste.eintrag_hinzufuegen(fixkostenAusgabe);
    }

    this._monatsliste.update();
  }

  _html_generieren() {
    const popupHtml = `
    <style>
    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    input[type="number"] {
      -moz-appearance: textfield;
    }

      .fixkosten-popup-overlay {
        backdrop-filter: blur(1px);
        z-index: 1000;

      }
      .fixkosten-popup {
        padding: 20px;
        display: flex;
        flex-direction: column;
        background-color: gray;
        border-radius: 20px;
      }

      .fixkosten-input {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
      }

      .fixkosten-input label {
        margin-right: 10px;
      }
      button[type="submit"] {
        align-self: center;
        margin-top: 20px;
      }
      
    </style>

    <div class="fixkosten-popup-overlay" style="background-color: rgba(0, 0, 0, 0.5);">
      <div class="fixkosten-popup">
        <h2 style='margin-bottom: 40px;'>Fixkosten eingeben</h2>
        <form id="fixkosten-form">
          <div class="fixkosten-input">
            <label for="monthly-rent">Monatliche Miete</label>
            <input type="number" id="monthly-rent" name="monthly-rent" >
          </div>
                    <div class="fixkosten-input">
                        <label for="heating">Heizung</label>
                        <input type="number" id="heating" name="heating" >
                    </div>
                    <div class="fixkosten-input">
                        <label for="electricity">Strom</label>
                        <input type="number" id="electricity" name="electricity">
                    </div>
                    <div class="fixkosten-input">
                        <label for="car">Auto</label>
                        <input type="number" id="car" name="car" >
                    </div>
                    <div class="fixkosten-input">
                        <label for="internet">Internet</label>
                        <input type="number" id="internet" name="internet" >
                    </div>
                    <div class="fixkosten-input">
                        <label for="other">Andere</label>
                        <input type="number" id="other" name="other" >
                    </div>
                    <button type="submit">Speichern</button>
                </form>
            </div>
        </div>`;

    const div = document.createElement("div");
    div.innerHTML = popupHtml;
    return div;
  }

  show() {
    document.body.appendChild(this._html);
    const popup = this._html.querySelector(".fixkosten-popup");
    popup.classList.add("showing");
  }

  hide() {
    const popup = this._html.querySelector(".fixkosten-popup");
    popup.classList.add("hiding");
    setTimeout(() => {
      popup.classList.remove("hiding", "showing");
      document.body.removeChild(this._html);
    }, 300); // Match this duration with the duration of the closing animation
  }
}
