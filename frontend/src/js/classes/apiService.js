// Create a new entry
window.apiService = {
  createEntry: function (entryData) {
    return fetch("https://api.example.com/entries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entryData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Process the newly created entry
        return data; // Return the created entry
      })
      .catch((error) => {
        console.error("Error creating entry:", error);
        throw error;
      });
  },
};

// Fetch all entries from the API
// export function fetchEntries() {
//     return fetch('https://api.example.com/entries')
//       .then(response => response.json())
//       .then(data => {
//         // Process the fetched entries
//         return data; // Return the entries
//       })
//       .catch(error => {
//         console.error('Error fetching entries:', error);
//         throw error;
//       });
//   }

//   // Update an existing entry
//   export function updateEntry(entryId, updatedData) {
//     return fetch(`https://api.example.com/entries/${entryId}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(updatedData)
//     })
//       .then(response => response.json())
//       .then(data => {
//         // Process the updated entry
//         return data; // Return the updated entry
//       })
//       .catch(error => {
//         console.error('Error updating entry:', error);
//         throw error;
//       });
//   }

//   // Delete an entry
//   export function deleteEntry(entryId) {
//     return fetch(`https://api.example.com/entries/${entryId}`, {
//       method: 'DELETE'
//     })
//       .then(response => {
//         if (response.ok) {
//           console.log('Entry deleted successfully');
//         } else {
//           throw new Error('Error deleting entry');
//         }
//       })
//       .catch(error => {
//         console.error('Error deleting entry:', error);
//         throw error;
//       });
//   }
