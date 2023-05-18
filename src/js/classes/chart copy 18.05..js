class ChartCreator {
  constructor() {
    this._myChart = null; // Initialize the chart variable
    this._popup = null;
    this._overlay = null;
  }

  _createChart() {
    if (this._popup == null) {
      this._createChartPopup();
    }
    const container = document.createElement("div");
    container.className = "container";
    const canvas = document.createElement("canvas");
    canvas.id = "myChart";

    container.appendChild(canvas);
    this._overlay.appendChild(container); // Append container to overlay instead of popup

    // Create the chart

    let myChart = canvas.getContext("2d");

    this._myChart = new Chart(myChart, {
      type: "bar",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  _createChartPopup() {
    if (this._popup != null) return;

    const popup = document.createElement("div");
    popup.className = "chart-popup";

    const overlay = document.createElement("div");
    overlay.className = "chart-popup-overlay";

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        this.hide();
      }
    });

    const closeButtonContainer = document.createElement("div");
    closeButtonContainer.id = "container"; // Assign id to the container

    const closeButton = document.createElement("button");
    closeButton.textContent = "🍋";
    closeButton.className = "close-button";
    closeButton.addEventListener("click", () => {
      this.hide();
    });

    closeButtonContainer.appendChild(closeButton); // Append closeButton to closeButtonContainer
    overlay.appendChild(closeButtonContainer); // Append closeButtonContainer to overlay
    popup.appendChild(overlay);

    document.body.appendChild(popup);

    this._popup = popup;
    this._overlay = overlay; // Save reference to overlay
  }

  hide() {
    if (this._popup) {
      this._popup.classList.add("hiding");
      setTimeout(() => {
        this._popup.classList.remove("hiding", "showing");
        document.body.removeChild(this._popup);
        this._popup = null;
      }, 10);
    }
  }

  show() {
    this._createChart();

    this._popup.classList.add("showing");
  }
}
