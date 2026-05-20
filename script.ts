abstract class Workout {
    duration:number;
    Intensity:number;
    constructor(duration:number, Intensity:number){
        if(duration <= 0|| Intensity <= 0){
            throw new Error("Hodnoty musí být větší než 0!!");
        }
        this.duration = duration;
        this.Intensity = Intensity;
    }
    abstract calculateCaloriesBurned():number;
    abstract getsummary():string;
}

class Running extends Workout {
    distance:number;
    constructor(duration:number, Intensity:number, distance:number){
        super(duration, Intensity);
        if (distance <= 0) {
            throw new Error("Hodnota musí být větší než 0!!");
        }
        this.distance = distance;
    }
    calculateCaloriesBurned(): number {
        return this.duration * this.Intensity * this.distance * 0.1;
    }
    getsummary(): string {
        return `Běh: Doba trvání: ${this.duration} minut, Intenzita: ${this.Intensity}, Vzdálenost: ${this.distance} km, Spálené kalorie: ${this.calculateCaloriesBurned()} kcal.`;
    }
}

