import gaussRandom from 'math';

export interface RecombinationConfig {
    mutationProbability: number;
    mean?: number;
    selectionBias?: number;
}

export interface ChromosomeConfig {
    lociCount: number;
    mean: number;
}

export class Chromosome {
    private readonly loci: boolean[];

    public constructor(configOrLoci: ChromosomeConfig | boolean[]) {
        if("lociCount" in configOrLoci) {
            this.loci = new Array<boolean>(configOrLoci.lociCount);
            for (let i = 0; i < configOrLoci.lociCount; ++i) {
                this.loci[i] = Math.random() <= configOrLoci.mean;
            }
        }
        else {
            this.loci = configOrLoci;
        }
    }

    public recombineWith(right: Chromosome, config: RecombinationConfig): Chromosome {
        if (this.loci.length !== right.loci.length) {
            throw new Error('Mismatching loci count');
        }

        const readLocus = (bit: boolean) =>
            gaussRandom() >= config.mutationProbability ? bit : (gaussRandom() <= (config.mean || 0.5));

        const resultLoci = this.loci.map(
            (value, index) =>
                gaussRandom() <= (config.selectionBias || 0.5)
                    ? readLocus(value)
                    : readLocus(right.loci[index]));

        return new Chromosome(resultLoci);
    }

    public get activeLociCount(): number {
        return this.loci.filter(value => value).length;
    }

    public get activeLociRatio(): number {
        return this.activeLociCount / this.loci.length;
    }

    public get activeLociPercent(): number {
        return Math.round(this.activeLociRatio * 100);
    }

    public get lociString(): string {
        return ''.concat(...this.loci.map(value => value ? 'x' : '.'));
    }
}

export type Phenotype = (x: number) => string;
