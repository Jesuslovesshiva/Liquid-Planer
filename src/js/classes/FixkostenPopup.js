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
        .reduce(
          (total, input) =>
            total + parseFloat(input.value.replace(",", ".") * 100 || 0),
          0
        );

      this.updateFixkostenAusgaben(totalFixkosten);
      this.updateAllMonthsFixkosten(totalFixkosten);
      this.hide();
    });
  }

  updateFixkostenAusgaben() {
    const fixedExpenses = haushaltsbuch._fixedExpenses; // Access the fixedExpenses from the haushaltsbuch instance
    const ausgabenListe = this._html.querySelector("#fixkosten-ausgaben");
    ausgabenListe.innerHTML = "";

    fixedExpenses.forEach((expense) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${expense.title}: ${expense.amount} €`;
      ausgabenListe.appendChild(listItem);
    });
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
        border-radius: 10px;
        border: black solid 2px
      }

      .fixkosten-inputfield {
        border-radius: 10px;
        
      }

      .fixkosten-input label {
        margin-right: 10px;
      }
      button[type="submit"] {
        align-self: center;
        margin-top: 20px;
        border-radius: 10px;
        padding: 0.5rem;
      }
      
    </style>

    <div class="fixkosten-popup-overlay" style="background-color: rgba(0, 0, 0, 0.5);">
      <div class="fixkosten-popup">
        <h2 style='margin-bottom: 40px;'>Fixkosten eingeben</h2>
        <form id="fixkosten-form">
          <div class="fixkosten-input">
            <label for="monthly-rent">Monatliche Miete</label>
            <input class="fixkosten-inputfield" type="number" id="monthly-rent" name="monthly-rent" pattern="\\d+(,\\d{1,2})?|\\d+(\\.\\d{1,2})?" step="0.01">
            </div>
                    <div class="fixkosten-input">
                        <label for="heating">Heizung</label>
                        <input class="fixkosten-inputfield" type="number" id="heating" name="heating" pattern="\\d+(,\\d{1,2})?" step="0.01">
                    </div>
                    <div class="fixkosten-input">
                        <label for="electricity">Strom</label>
                        <input class="fixkosten-inputfield" type="number" id="electricity" name="electricity" pattern="\\d+(,\\d{1,2})?" step="0.01">
                    </div>
                    <div class="fixkosten-input">
                        <label for="car">Auto</label>
                        <input class="fixkosten-inputfield" type="number" id="car" name="car" pattern="\\d+(,\\d{1,2})?" step="0.01">
                    </div>
                    <div class="fixkosten-input">
                        <label for="internet">Internet</label>
                        <input class="fixkosten-inputfield" type="number" id="internet" name="internet" pattern="\\d+(,\\d{1,2})?" step="0.01">
                    </div>
                    <div class="fixkosten-input">
                        <label for="other">Andere</label>
                        <input class="fixkosten-inputfield" type="number" id="other" name="other" pattern="\\d+(,\\d{1,2})?" step="0.01">
                    </div>
                    <button type="submit">Speichern</button>
                    <h3></h3>
                    <ul id="fixkosten-ausgaben">
                    </ul>
                </form>
            </div>
        </div>`;

    const div = document.createElement("div");
    div.innerHTML = popupHtml;
    return div;
  }

  updateAllMonthsFixkosten(totalFixkosten) {
    for (const monatsliste of haushaltsbuch._monatslistensammlung
      ._monatslisten) {
      const month = monatsliste._monat;
      const year = monatsliste._jahr;
      const entries =
        haushaltsbuch._monatslistensammlung.getEntriesByMonthAndYear(
          year,
          month
        );

      const fixkostenEntry = entries.find(
        (entry) => entry._titel === "Fixkosten" && entry._typ === "ausgabe"
      );

      if (!fixkostenEntry) {
        haushaltsbuch.eintrag_hinzufuegen({
          titel: "Fixkosten",
          betrag: totalFixkosten,
          typ: "ausgabe",
          datum: new Date(year, month - 1, 1),
        });
      }
    }
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
