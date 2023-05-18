class ChartCreator {
  constructor() {
    this._myChart = null; // Initialize the chart variable
    this._popup = null;
    this._overlay = null;
  }

  _registerEventListeners() {
    const overlay = this._overlay;
    const chartPopup = this._popup.querySelector(".chart-popup");

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        this.hide();
      }
    });

    const closeButton = this._popup.querySelector("button");
    closeButton.addEventListener("click", () => {
      this.hide();
    });

    document.addEventListener("click", (e) => {
      if (!chartPopup.contains(e.target)) {
        this.hide();
      }
    });
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
    this._popup.appendChild(container);

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

    const closeButton = document.createElement("button");
    closeButton.textContent = "Close";

    popup.appendChild(closeButton);
    popup.appendChild(overlay);

    document.body.appendChild(popup);

    this._popup = overlay;
    this._overlay = overlay;
  }

  show() {
    this._createChart();
    this._registerEventListeners();
    this._popup.classList.add("showing");
  }

  hide() {
    this._popup.classList.remove("showing");
    this._myChart.destroy();
    this._myChart = null;
    this._popup.remove();
    this._popup = null;
    this._overlay = null;
  }
}
