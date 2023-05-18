<script>
    export let fetchExpenses;

    async function handleFormSubmission(event) {
      event.preventDefault();
  
      const formData = {
        titel: event.target.elements.titel.value.trim(),
        typ: event.target.elements.einnahme.checked ? 'einnahme' : 'ausgabe',
        betrag: parseFloat(event.target.elements.betrag.value) * 100,
        datum: event.target.elements.datum.valueAsDate,
      };
  
      function validateFormData(formulardaten) {
        let fehler = [];

        if (formulardaten.titel.trim() === "") {
            fehler.push("Titel");
        }
        if (isNaN(parseFloat(formulardaten.betrag))) {
            fehler.push("Betrag");
        }
        if (formulardaten.datum === null) {
            fehler.push("Datum");
        }

        return fehler;
      }

      const formErrors = validateFormData(formData);
      
      if (formErrors.length === 0) {
        const entryData = {
          titel: formData.titel,
          betrag: formData.betrag,
          typ: formData.typ,
          datum: formData.datum,
        };
  
        try {
          const response = await fetch('http://localhost:3000/expenses', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(entryData),
          });
  
          if (response.ok) {
            const createdEntry = await response.json();
            await fetchExpenses();
            console.log('New entry created:', createdEntry);
            event.target.reset();
          } else {
            console.error('Error creating entry:', response.status);
            // Handle error case if needed
          }
        } catch (error) {
          console.error('Error creating entry:', error);
          // Handle error case if needed
        }
      } else {
        const error = new Fehler(
          'Folgende Felder wurden nicht korrekt ausgefüllt:',
          formErrors
        );
        error.anzeigen();
      }
    }
</script>
  
<section id="eingabeformular-container">
    <form id="eingabeformular" on:submit={handleFormSubmission}>
      <div class="eingabeformular-zeile">
        <h1>Neue Einnahme / Ausgabe hinzufügen</h1>
      </div>
      <div class="eingabeformular-zeile">
        <div class="titel-typ-eingabe-gruppe">
          <label for="titel">Titel</label>
          <input
            type="text"
            id="titel"
            name="titel"
            placeholder="z.B. Einkaufen"
            size="10"
            title="Titel des Eintrags"
          />
          <input
            type="radio"
            id="einnahme"
            name="typ"
            value="einnahme"
            title="Typ des Eintrags"
          />
          <label for="einnahme" title="Typ des Eintrags">Einnahme</label>
          <input
            type="radio"
            id="ausgabe"
            name="typ"
            value="ausgabe"
            title="Typ des Eintrags"
            checked
          />
          <label for="ausgabe" title="Typ des Eintrags">Ausgabe</label>
        </div>
      </div>
      <div class="eingabeformular-zeile">
        <div class="betrag-datumeingabe-gruppe">
            <label for="betrag">Betrag</label>
            <input
                   type="number"
                   id="betrag"
                   name="betrag"
                   placeholder="z.B. 10,42"
                   size="10"
                   step="0.01"
                   title="Betrag des Eintrags (max. zwei Nachkommastellen, kein €-Zeichen)"
                 />
            <label for="datum">Datum</label>
            <input
                   type="date"
                   id="datum"
                   name="datum"
                   placeholder="jjjj-mm-tt"
                   size="10"
                   title="Datum des Eintrags (Format: jjjj-mm-tt)"
                 />
            </div>
            </div>
            <div class="eingabeformular-zeile">
            <button class="standard" type="submit">Hinzufügen</button>
        </div>     
    </form>
</section>
<style>
    /* Add your desired styles here */
</style>
  