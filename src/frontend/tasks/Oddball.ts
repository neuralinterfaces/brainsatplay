import { RenderContext } from "../renderer";
import { FixationCross, Rectangle } from "../renderer/objects";

type Event = {
    stimulus: Object,
    duration: number
}

type Metadata = {
    duration: number // Actual duration
}

type OddballManagerProps = {
    canvas: HTMLCanvasElement,
    trials?: number,
    oddballProbability?: number,
    stimulusPresentationDuration?: number,
    fixationDuration?: number
}

export class OddballManager {

    canvas: OddballManagerProps['canvas']
    trials: number
    oddballProbability: number
    stimulusPresentationDuration: number
    fixationDuration: number
    
    #renderContext: RenderContext
     
    constructor({
        canvas,
        trials = 100,
        oddballProbability = 0.2,
        stimulusPresentationDuration = 1000,
        fixationDuration = 500
    }: OddballManagerProps) {

        this.canvas = canvas
        this.trials = trials
        this.oddballProbability = oddballProbability
        this.stimulusPresentationDuration = stimulusPresentationDuration
        this.fixationDuration = fixationDuration

        this.#renderContext = new RenderContext(canvas);

    }

    update = ( 
        event: Event,
        metadata: Metadata 
    ) => {
    
        console.log('Actual duration between renders', metadata.duration, event.duration)
    
        const { scene } = this.#renderContext

        scene.clear()
        scene.addObject(event.stimulus);
        scene.draw()
    }


    #active = false

    async start() {

        // Define the square's properties
        const width = this.canvas.width / 2
        const height = this.canvas.height / 2
        const x = this.canvas.width / 2; // x-coordinate to center the square
        const y = this.canvas.height / 2; // y-coordinate to center the square

        const blueSquare = new Rectangle({
            x,
            y,
            width,
            height,
            color: 'blue'
        });
          
        const redSquare = new Rectangle({
            x,
            y,
            width,
            height,
            color: 'red'
        });
        
        const fixationCross = new FixationCross({
            x,
            y,
            size: Math.min(width, height) / 2,
            color: 'black'
        })

        const standardTrial = { stimulus: blueSquare, duration: this.stimulusPresentationDuration }
        const oddballTrial = { stimulus: redSquare, duration: this.stimulusPresentationDuration }
        const fixation = { stimulus: fixationCross, duration: this.fixationDuration }

        // Create a random sequence of trials, where the oddball stimulus shows up 20% of the time
        const oddballTrials = Array.from({ length: this.trials * this.oddballProbability }, () => standardTrial)
        const standardTrials = Array.from({ length: this.trials * (1 - this.oddballProbability )}, () => oddballTrial)
        const baseTrials = [...oddballTrials, ...standardTrials]
        const randomizedTrials = baseTrials.sort(() => Math.random() - 0.5)
        const eventsToSchedule = randomizedTrials.flatMap(trial => [ fixation, trial ])

        await this.#renderContext.ready

        this.#active = true

        for (const event of eventsToSchedule) {

            if (!this.#active) break
    
            const { duration } = event
    
            await this.#renderContext.render(( actualDuration ) => {
                this.update(event, { duration: actualDuration })
            }, duration)
    
            this.#renderContext.scene.clear()
            
        }

    }

    reset  = () => {
        this.#active = false
        const { scene } = this.#renderContext
        scene.clear()
        scene.draw() 

        // NOTE: Could also make the current presentation end sooner
    }

}