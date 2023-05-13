"use strict";

class Haushaltsbuch {
  constructor() {
    this._eintraege = [];
    this._fixedExpenses = []; // Initialize the fixedExpenses array
    this._navigationsleiste = new Navigationsleiste();
    this._eingabeformular = new Eingabeformular();
    this._monatslistensammlung = new Monatslistensammlung();
    this._gesamtbilanz = new Gesamtbilanz();
    this._fixkostenPopup = new FixkostenPopup();
    this._wiederherstellen();
  }

  showFixkostenPopup() {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const monatsliste = this._monatslistensammlung.getEntriesByMonthAndYear(
      currentMonth,
      currentYear
    );

    const fixkostenPopup = new FixkostenPopup(monatsliste);
    fixkostenPopup.show();
  }

  _ShowFixKosten() {
    const showFixkostenPopupButton = document.getElementById(
      "show-fixkosten-popup"
    );
    if (showFixkostenPopupButton) {
      showFixkostenPopupButton.addEventListener("click", (e) => {
        e.preventDefault();
        this._fixkostenPopup.show();
      });
    }
  }

  _createShowFixkostenPopupButton() {
    const button = document.createElement("button");
    button.id = "show-fixkosten-popup";
    button.textContent = "Fixkosten";
    return button;
  }

  eintrag_hinzufuegen(eintragsdaten) {
    let neuer_eintrag = new Eintrag(
      eintragsdaten.titel,
      eintragsdaten.betrag,
      eintragsdaten.typ,
      eintragsdaten.datum
    );
    this._eintraege.push(neuer_eintrag);
    this._monatslistensammlung.aktualisieren(this._eintraege);
    this._gesamtbilanz.aktualisieren(this._eintraege, this._fixedExpenses);
    this._speichern();
  }

  eintrag_entfernen(timestamp) {
    let start_index;
    for (let i = 0; i < this._eintraege.length; i++) {
      if (this._eintraege[i].timestamp() === parseInt(timestamp)) {
        start_index = i;
        break;
      }
    }
    this._eintraege.splice(start_index, 1);
    this._monatslistensammlung.aktualisieren(this._eintraege);
    this._gesamtbilanz.aktualisieren(this._eintraege, this._fixedExpenses);
    this._speichern();
  }

  _speichern() {
    localStorage.setItem("eintraege", JSON.stringify(this._eintraege));

    localStorage.setItem("fixedExpenses", JSON.stringify(this._fixedExpenses)); //
  }

  addFixedExpense(expenseData) {
    const newFixedExpense = new FixedExpense(
      expenseData.title,
      expenseData.amount,
      expenseData.category
    );
    this._fixedExpenses.push(newFixedExpense);
    this._speichern();
  }

  _wiederherstellen() {
    let gespeicherte_eintraege = localStorage.getItem("eintraege");
    if (gespeicherte_eintraege !== null) {
      JSON.parse(gespeicherte_eintraege).forEach((eintrag) => {
        this.eintrag_hinzufuegen({
          titel: eintrag._titel,
          betrag: eintrag._betrag,
          typ: eintrag._typ,
          datum: new Date(eintrag._datum),
        });
      });
    }

    let storedFixedExpenses = localStorage.getItem("fixedExpenses");
    if (storedFixedExpenses !== null) {
      JSON.parse(storedFixedExpenses).forEach((expense) => {
        this.addFixedExpense({
          title: expense.title,
          amount: expense.amount,
          category: expense.category,
        });
      });
    }
  }

  initializeMediaQuery = () => {
    const mediaQuery = window.matchMedia("(max-width: 1308px)");
    const fixkostenButton = document.getElementById("show-fixkosten-popup");

    const updateFixkostenButton = () => {
      if (mediaQuery.matches) {
        fixkostenButton.textContent = "🏡";
      } else {
        fixkostenButton.textContent = "Fixkosten";
      }
    };
    // Call the function once to set the initial text content
    updateFixkostenButton();
    // Add an event listener to the media query object
    mediaQuery.addEventListener("change", updateFixkostenButton);
  };

  start() {
    this._navigationsleiste.anzeigen();
    this._eingabeformular.anzeigen();
    this._monatslistensammlung.anzeigen();
    this._gesamtbilanz.anzeigen();
    this._speichern();
    document.body.appendChild(this._createShowFixkostenPopupButton());
    this._ShowFixKosten();
    this.initializeMediaQuery();
  }
}
