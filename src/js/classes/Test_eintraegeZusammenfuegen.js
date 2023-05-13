// updates the betrag of an existing entry, if another entry with the same name is made

// Monatslistensammlung.js

/* _eintrag_hinzufuegen(eintrag) {
    let eintragsmonat = eintrag
      .datum()
      .toLocaleString("de-DE", { month: "numeric" });
    let eintragsjahr = eintrag
      .datum()
      .toLocaleString("de-DE", { year: "numeric" });
    let monatsliste_vorhanden = false;
    this._monatslisten.forEach((monatsliste) => {
      if (
        eintragsmonat === monatsliste.monat() &&
        eintragsjahr === monatsliste.jahr()
      ) {
        let eintragIndex = monatsliste
          .getEntries()
          .findIndex(
            (existingEintrag) => existingEintrag.titel() === eintrag.titel()
          );
        if (eintragIndex !== -1) {
          let updatedEintrag = monatsliste
            .getEntries()
            [eintragIndex].createNewWithUpdatedBetrag(eintrag.betrag());
          monatsliste.getEntries().splice(eintragIndex, 1, updatedEintrag);
        } else {
          monatsliste.eintrag_hinzufuegen(eintrag);
        }
        monatsliste.update(); // Update the Monatsliste after updating the betrag
        monatsliste_vorhanden = true;
      }
    });
    if (!monatsliste_vorhanden) {
      this._monatsliste_hinzufuegen(eintragsjahr, eintragsmonat, eintrag);
    }
  }

*/

// Eintrag.js

/*   createNewWithUpdatedBetrag(newBetrag) {
    return new Eintrag(
      this._titel,
      this._betrag + newBetrag,
      this._typ,
      this._datum
    );
  }
*/
