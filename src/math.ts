export function expBias(x: number): number {
    return 1 - Math.exp(-x);
}

export function volumetricInvBias(x: number): number {
    return (1 - Math.pow(1 - x, 1/3.0));
}

export function volumetricBias(x: number): number {
    return Math.pow(x, 1/3.0);
}

export function volumeCircumferenceBias(x: number): number {
    return Math.pow(Math.PI, 2/3) * Math.pow(6*x, 1/3);
}

export default function gaussRandom(): number {
    return (Math.random() + Math.random()) / 2;
}
