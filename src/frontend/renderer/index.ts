import { FrameManager } from "./frames";

const frameManager = new FrameManager()

type DisplayCallback = (duration: number) => void

export class RenderContext {

    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    scene: Scene;

    get ready(){
        return frameManager.ready
    }

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;
        this.scene = new Scene(canvas);
        frameManager.start() // Start the global frame manager
    }

    async render(callback: DisplayCallback, duration: number): Promise<number> {

        return new Promise(async (resolve) => {

            await this.ready

            const startTime = performance.now()
            const desiredTime = startTime + duration    

            const check = async () => {
                const currentTime = performance.now();
                const timeDifference = currentTime - desiredTime;
                const toleranceMs = (1000 / frameManager.rate) / 2
                if (Math.abs(timeDifference) <= toleranceMs || timeDifference > 0) {
                    const actualDuration = currentTime - startTime
                    await callback(actualDuration)
                    resolve(actualDuration);
                }

                else requestAnimationFrame(check)
            }

            requestAnimationFrame(check);
        })
    }
}

export class Scene {

    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D

    #objects = {}

    constructor(
        canvas: HTMLCanvasElement
    ) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')!
    }

    hasObject(object: Object) {
        const ids = Object.getOwnPropertySymbols(this.#objects)

        const values = ids.reduce((acc, id) => {
            acc.push(this.#objects[id])
            return acc
        }, [])

        const indexOf = values.indexOf(object)
        return ids[indexOf] ?? false
    }
        
    removeObject(object: Object) {
        const id = this.hasObject(object)
        if (!id) return false
        delete this.#objects[id]
        return true
    }


    addObject(object: Object) {
        const id = Symbol()
        this.#objects[id] = object
        return id
    }

    clear = () => {
        this.#objects = {}
    }

    draw = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        Object.getOwnPropertySymbols(this.#objects).forEach(id => this.#objects[id].draw(this.ctx))
    }

}