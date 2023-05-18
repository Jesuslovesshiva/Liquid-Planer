"use strict";
class FixkostenPopup {
    constructor(monatsliste){
        this.monatsliste = monatsliste;
        this._html = this._html_generieren();
        this._registerEventListeners();
    }
    _registerEventListeners() {
        const overlay = this._html.querySelector(".fixkosten-popup-overlay");
        overlay.addEventListener("click", (e)=>{
            if (e.target === overlay) // Check if the click is outside the content
            this.hide();
        });
        const form = this._html.querySelector("#fixkosten-form");
        form.addEventListener("submit", (e)=>{
            e.preventDefault();
            const totalFixkosten = Array.from(form.elements).filter((el)=>el.tagName === "INPUT").reduce((total, input)=>total + parseFloat(input.value.replace(",", ".") * 100 || 0), 0);
            this.updateFixkostenAusgaben(totalFixkosten);
            this.updateAllMonthsFixkosten(totalFixkosten);
            this.hide();
        });
    }
    updateFixkostenAusgaben() {
        const fixedExpenses = haushaltsbuch._fixedExpenses;
        const ausgabenListe = this._html.querySelector("#fixkosten-ausgaben");
        ausgabenListe.innerHTML = "";
        fixedExpenses.forEach((expense)=>{
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
      border-radius: 0px;
      }
      .fixkosten-popup {
        padding: 20px;
        display: flex;
        flex-direction: column;
        background-color: #e9ecef;

          border-radius: 20px;
  box-shadow: rgb(255, 230, 130) -2px -2px 0px 2px,
    rgb(236, 160, 110) 0px 0px 0px 4px, rgba(0, 0, 0, 0.05) 0px 0px 2px 7px;
  transition: all 0.2s;
        
      }
      .fixkosten-input {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;  
        padding-left: 1em;
        height: 0%
        box-shadow: 0px 1px 2px 0px;
        background: #C0C0C0;
        background-clip: padding-box;
        border-radius: 1.5rem; 
        text-align: center;
        border-right: none;
        background-color: #e9ecef;
        color: #495057;
        text-align: center;
        border: 0.1rem solid #ced4da;
          }
      .fixkosten-inputfield {
        border-right: none;
        border-left: none;
        padding: 0.375rem 0.75rem;
        -webkit-box-flex: 1;
        color: #495057;
 
        transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
          box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
          line-height: 2.5rem;
          border:  #ced4da;
          font-family: "Oswald", Helvetica, sans-serif;
          font-weight: 300;
          font-size: 1.5rem;
          letter-spacing: 0.2rem;
          box-sizing: inherit;
          line-height: 2.5rem;
          border-top-right-radius: 1.5rem;
          border-bottom-right-radius: 1.5rem;
        
      }
      .fixkosten-input label {
        margin-right: 10px;
      }
      
    </style>
    <div class="fixkosten-popup-overlay" style="background-color: rgba(0, 0, 0, 0.5);">
      <div class="fixkosten-popup">
        <h2 style='margin-bottom: 40px;'>Fixkosten eingeben</h2>
        <form id="fixkosten-form">
          <div class="fixkosten-input">
            <label for="monthly-rent">Miete</label>
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
                    <button class="standard" type="submit">Speichern</button>
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
        for (const monatsliste of haushaltsbuch._monatslistensammlung._monatslisten){
            const month = monatsliste._monat;
            const year = monatsliste._jahr;
            const entries = haushaltsbuch._monatslistensammlung.getEntriesByMonthAndYear(year, month);
            // Find the <article> for the current month/year
            const articleElement = document.querySelector(`article.monatsliste[data-year="${year}"][data-month="${month}"]`);
            // Find the "span.titel" elements within the current <article>
            const spans = articleElement.querySelectorAll("span.titel");
            const fixkostenSpanVorhanden = Array.from(spans).find((span)=>span.textContent === "Fixkosten");
            if (!fixkostenSpanVorhanden) haushaltsbuch.eintrag_hinzufuegen({
                titel: "Fixkosten",
                betrag: totalFixkosten,
                typ: "ausgabe",
                datum: new Date(year, month - 1, 1)
            });
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
        setTimeout(()=>{
            popup.classList.remove("hiding", "showing");
            document.body.removeChild(this._html);
        }, 300); // Match this duration with the duration of the closing animation
    }
}

//# sourceMappingURL=index.19e61a36.js.map
