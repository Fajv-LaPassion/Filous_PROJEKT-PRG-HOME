"use strict";
class Workout {
    duration;
    Intensity;
    constructor(duration, Intensity) {
        if (duration <= 0 || Intensity <= 0) {
            throw new Error("Hodnoty musí být větší než 0!!");
        }
        this.duration = duration;
        this.Intensity = Intensity;
    }
}
class Running extends Workout {
    distance;
    constructor(duration, Intensity, distance) {
        super(duration, Intensity);
        if (distance <= 0) {
            throw new Error("Hodnota musí být větší než 0!!");
        }
        this.distance = distance;
    }
    calculateCaloriesBurned() {
        return this.duration * this.Intensity * this.distance * 0.1;
    }
    getsummary() {
        return `Běh: Doba trvání: ${this.duration} minut, Intenzita: ${this.Intensity}, Vzdálenost: ${this.distance} km, Spálené kalorie: ${this.calculateCaloriesBurned()} kcal.`;
    }
}
class StrengthTraining extends Workout {
    sets;
    reps;
    constructor(duration, Intensity, sets, reps) {
        super(duration, Intensity);
        if (sets <= 0 || reps <= 0) {
            throw new Error("Hodnota musí být větší než 0!!");
        }
        this.sets = sets;
        this.reps = reps;
    }
    calculateCaloriesBurned() {
        return this.duration * this.Intensity * this.sets * this.reps * 0.05;
    }
    getsummary() {
        return `Posilování: Doba trvání: ${this.duration} minut, Intenzita: ${this.Intensity}, Série: ${this.sets}, Opakování: ${this.reps}, Spálené kalorie: ${this.calculateCaloriesBurned()} kcal.`;
    }
}
