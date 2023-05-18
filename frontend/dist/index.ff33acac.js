class ChartCreator {
    constructor(){
        this._myChart = null; // Initialize the chart variable
        this._popup = null;
        this._chartContainer = null;
        this._overlay = null;
    }
    _createChart() {
        const container = document.createElement("div");
        container.className = "container";
        const canvas = document.createElement("canvas");
        canvas.id = "myChart";
        container.appendChild(canvas);
        this._chartContainer.appendChild(container);
        let myChart = canvas.getContext("2d");
        this._myChart = new Chart(myChart, {
            type: "bar",
            data: {
                labels: [
                    "Red",
                    "Blue",
                    "Yellow",
                    "Green",
                    "Purple",
                    "Orange"
                ],
                datasets: [
                    {
                        label: "# of Votes",
                        data: [
                            12,
                            19,
                            3,
                            5,
                            2,
                            3
                        ],
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    _createChartPopup() {
        if (this._popup != null) return;
        const popup = document.createElement("div");
        popup.className = "chart-popup";
        const overlay = document.createElement("div");
        overlay.className = "chart-popup-overlay";
        overlay.addEventListener("click", (e)=>{
            if (e.target === overlay) this.hide();
        });
        const chartContainer = document.createElement("div");
        chartContainer.className = "container";
        popup.appendChild(chartContainer);
        overlay.appendChild(popup);
        document.body.appendChild(overlay);
        this._popup = popup;
        this._chartContainer = chartContainer;
        this._overlay = overlay;
    }
    hide() {
        if (this._popup) {
            this._popup.classList.add("hiding");
            setTimeout(()=>{
                this._popup.classList.remove("chart-popup-hiding", "chart-popup-showing");
                document.body.removeChild(this._overlay);
                this._popup = null;
                this._chartContainer = null;
                this._overlay = null;
            }, 300); // Adjusted timeout to match transition in CSS
        }
    }
    show() {
        if (!this._popup) {
            this._createChartPopup();
            this._createChart();
        }
        if (this._popup) this._popup.classList.add("showing");
    }
}

//# sourceMappingURL=index.ff33acac.js.map
