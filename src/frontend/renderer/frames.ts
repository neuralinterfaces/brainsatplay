
export class FrameManager {

    samples: number;
    times: number[];
    head: number;
    total: number;
    frame: number;
    previousNow: number;
    rateValue: number;
    dropped: number;
    rates: number[];
    running: boolean;

    constructor(samples = 20) {
        this.samples = samples;
        this.times = Array(samples).fill(0);
        this.head = 0;
        this.total = 0;
        this.frame = 0;
        this.previousNow = 0;
        this.rateValue = 0;
        this.dropped = 0;
        this.rates = [0, 10, 12, 15, 20, 30, 60, 90, 120, 144, 240];
        this.running = false;
    }

    reset() {
        this.frame = this.total = this.head = 0;
        this.previousNow = performance.now();
        this.times.fill(0);
    }

    tick() {
        const now = performance.now();
        this.total -= this.times[this.head];
        this.total += (this.times[this.head++] = now - this.previousNow);
        this.head %= this.samples;
        this.frame++;
        this.previousNow = now;
    }

    get rate() {
        return this.frame > this.samples ? 1000 / (this.total / this.samples) : 1;
    }

    get FPS() {
        let r = this.rate, rr = r | 0, i = 0;
        while (i < this.rates.length && rr > this.rates[i]) {
            i++;
        }
        const currentRate = this.rates[i];
        this.dropped = Math.round((this.total - this.samples * (1000 / currentRate)) / (1000 / currentRate));
        return currentRate;
    }

    get droppedFrames() {
        return this.dropped;
    }

    ready?: Promise<number>;

    #resolveReady: Function | null = null;
    #rejectReady: Function | null  = null;

    #updateReady = () => {
        this.ready = new Promise((resolve, reject) => {

            this.#resolveReady = () => {
                resolve(this.rate);
                this.#resolveReady = null;
            }

            this.#rejectReady = (msg?: string) => {
                reject(msg)
                this.#rejectReady = null;
            }
        })

        return this.ready
    }

    async start() {
        if (this.running) return;
        this.running = true;
        this.reset();

        // Run enough times to estimate the refresh rate
        const framesToEstimate = 60;

        const promise = this.#updateReady()

        const loop = () => {

            if (!this.running) {
                if (this.#rejectReady && !(this.frame <= framesToEstimate)) this.#rejectReady('Frame rate estimation was stopped before completion.')
                return;
            }

            if (this.#resolveReady && this.frame == framesToEstimate) this.#resolveReady() // Done estimating the refresh rate
            
            this.tick();
            requestAnimationFrame(loop);
        };

        requestAnimationFrame(loop);

        return promise
    }

    stop() {
        this.running = false;
    }
}
