import { workoutCatalog } from "./data";

abstract class Workout {
    duration:number;
    Intensity:number;
    constructor(duration:number, Intensity:number){
        if(duration < 0|| Intensity < 0){
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
        if (distance < 0) {
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

class StrengthTraining extends Workout {
    sets:number;
    reps:number;

    constructor(duration:number, Intensity:number, sets:number, reps:number){
        super(duration, Intensity);
        if (sets < 0 || reps < 0) {
            throw new Error("Hodnota musí být větší než 0!!");
        }
        this.sets = sets;
        this.reps = reps;
    }
    calculateCaloriesBurned(): number {
        return this.duration * this.Intensity * this.sets * this.reps * 0.05;
    }
    getsummary(): string {
        return `Posilování: Doba trvání: ${this.duration} minut, Intenzita: ${this.Intensity}, Série: ${this.sets}, Opakování: ${this.reps}, Spálené kalorie: ${this.calculateCaloriesBurned()} kcal.`;
    }
}

const myWorkouts: Workout[] = [];

workoutCatalog.forEach(item => {
    if (item.type === 'running') {
        myWorkouts.push(new Running(item.duration, item.Intensity, item.distance));
    } else if (item.type === 'strength') {
        myWorkouts.push(new StrengthTraining(item.duration, item.Intensity, item.sets, item.reps));
    }
});

console.log("Souhrn tréninků:");
myWorkouts.forEach(workout => {
    console.log(workout.getsummary());
    console.log('Spálené kalorie: ' + workout.calculateCaloriesBurned() + ' kcal');
});