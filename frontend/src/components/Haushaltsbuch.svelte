<script>
  import { onMount } from "svelte";

  //   import Navigationsleiste from "./Nav.svelte";
  //   import Eingabeformular from "./Eingabeformular.svelte";
  //   import Monatslistensammlung from "./Monatslistensammlung.svelte";
  //   import Gesamtbilanz from "./Gesamtbilanz.svelte";
  //   import FixkostenPopup from "./FixkostenPopup.svelte";
  //   import ChartCreator from "./ChartCreator.svelte";
  //   import User from "./User.svelte";

  let eintraege = [];
  let fixedExpenses = [];
  let navigationsleiste;
  let eingabeformular;
  let monatslistensammlung;
  let gesamtbilanz;
  let fixkostenPopup;
  let chartCreator;
  let currentUser;

  onMount(() => {
    createAndAppendButtons();
    wiederherstellen();
  });

  function showFixkostenPopup() {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const monatsliste = monatslistensammlung.getEntriesByMonthAndYear(
      currentMonth,
      currentYear
    );

    fixkostenPopup.show(monatsliste);
  }

  function showFixKosten() {
    const showFixkostenPopupButton = document.getElementById(
      "show-fixkosten-popup"
    );
    if (showFixkostenPopupButton) {
      showFixkostenPopupButton.addEventListener("click", (e) => {
        e.preventDefault();
        fixkostenPopup.show();
      });
    }
  }

  function createButtonContainer() {
    const div = document.createElement("div");
    div.id = "button-container";
    return div;
  }

  function createShowFixkostenPopupButton(container) {
    const button = document.createElement("button");
    button.id = "show-fixkosten-popup";
    button.textContent = "🏡";
    container.appendChild(button);
    return button;
  }

  function createShowChartPopupButton(container) {
    const button = document.createElement("button");
    button.id = "show-chart-popup";
    button.textContent = "🚀";
    button.addEventListener("click", () => {
      chartCreator.show();
    });
    container.appendChild(button);
    return button;
  }

  function createAndAppendButtons() {
    const buttonContainer = createButtonContainer();
    createShowFixkostenPopupButton(buttonContainer);
    createShowChartPopupButton(buttonContainer);
    document.body.appendChild(buttonContainer);
  }

  function createChartPopup() {
    const popup = document.createElement("div");
    popup.className = "chart-popup";

    const closeButton = document.createElement("button");
    closeButton.textContent = "Close";

    closeButton.addEventListener("click", () => {
      popup.remove();
      this._popup = null;
    });

    popup.appendChild(closeButton);
    document.body.appendChild(popup);

    this._popup = popup;
  }
  function eintrag_hinzufuegen(eintragsdaten) {
    const neuer_eintrag = {
      titel: eintragsdaten.titel,
      betrag: eintragsdaten.betrag,
      typ: eintragsdaten.typ,
      datum: eintragsdaten.datum,
    };
    eintraege = [...eintraege, neuer_eintrag];
    monatslistensammlung.aktualisieren(eintraege);
    gesamtbilanz.aktualisieren(eintraege, fixedExpenses);
    speichern();
  }

  function eintrag_entfernen(timestamp) {
    let start_index;
    for (let i = 0; i < eintraege.length; i++) {
      if (eintraege[i].timestamp === parseInt(timestamp)) {
        start_index = i;
        break;
      }
    }
    eintraege.splice(start_index, 1);
    monatslistensammlung.aktualisieren(eintraege);
    gesamtbilanz.aktualisieren(eintraege, fixedExpenses);
    speichern();
  }

  function speichern() {
    localStorage.setItem("eintraege", JSON.stringify(eintraege));
    localStorage.setItem("fixedExpenses", JSON.stringify(fixedExpenses));
  }

  function addFixedExpense(expenseData) {
    const newFixedExpense = {
      title: expenseData.title,
      amount: expenseData.amount,
      category: expenseData.category,
    };
    fixedExpenses = [...fixedExpenses, newFixedExpense];
    speichern();
  }

  function wiederherstellen() {
    let gespeicherte_eintraege = localStorage.getItem("eintraege");
    if (gespeicherte_eintraege !== null) {
      eintraege = JSON.parse(gespeicherte_eintraege).map((eintrag) => ({
        titel: eintrag.titel,
        betrag: eintrag.betrag,
        typ: eintrag.typ,
        datum: new Date(eintrag.datum),
      }));
    }

    let storedFixedExpenses = localStorage.getItem("fixedExpenses");
    if (storedFixedExpenses !== null) {
      fixedExpenses = JSON.parse(storedFixedExpenses).map((expense) => ({
        title: expense.title,
        amount: expense.amount,
        category: expense.category,
      }));
    }
  }

  function start() {
    navigationsleiste.anzeigen();
    eingabeformular.anzeigen();
    monatslistensammlung.anzeigen();
    gesamtbilanz.anzeigen();
    speichern();
    showFixKosten();
    currentUser._createUserLoginRegister();
  }
</script>

<!-- <Eingabeformular bind:this={eingabeformular} />
<Monatslistensammlung bind:this={monatslistensammlung} />
<Gesamtbilanz bind:this={gesamtbilanz} />
<FixkostenPopup bind:this={fixkostenPopup} />
<ChartCreator bind:this={chartCreator} />
<User bind:this={currentUser} /> -->

<button on:click={showFixkostenPopup}>Show Fixkosten Popup</button>

<button on:click={start}>Start</button>
