export default class Timer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.active = false;
        this.paused = false;

        this.shadowRoot.innerHTML = `
        <label>
            <meter optimum=0 low=500 high=1000 value=0 max=1500></meter>
            <span id="label-text"></span>
        </label>
        `;

        this.labelText = this.shadowRoot.querySelector("#label-text");
        this.meter = this.shadowRoot.querySelector("meter");

        this.step = this.step.bind(this);
    }

    start() {
        if (!this.paused) {
            this.startTime = performance.now();
        } else {
            this.paused = false;
        }
        this.active = true;
        requestAnimationFrame(this.step);
    }

    pause() {
        this.paused = true;
    }

    step() {
        if (this.active && !this.paused) {
            this._updateLabel();
            requestAnimationFrame(this.step);
        }
    }

    _updateLabel() {
        const diff = performance.now() - this.startTime;
        this.setLabel(`${diff.toFixed(1)}ms`);
        this.meter.value = diff;
    }

    stop() {
        this._updateLabel();
        this.active = false;
    }

    setLabel(msg) {
        this.labelText.innerText = msg;
    }
}
customElements.define("rtw-timer", Timer);
