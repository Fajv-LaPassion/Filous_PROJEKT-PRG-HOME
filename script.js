import { workoutCatalog } from "./data.js";
class Workout {
    id;
    duration;
    Intensity;
    constructor(id, duration, Intensity) {
        if (duration < 0 || Intensity < 0) {
            throw new Error("Hodnoty musí být větší než 0!!");
        }
        this.id = id;
        this.duration = duration;
        this.Intensity = Intensity;
    }
    render() {
    }
}
class Running extends Workout {
    distance;
    constructor(id, duration, Intensity, distance) {
        super(id, duration, Intensity);
        if (distance < 0) {
            throw new Error("Hodnota musí být větší než 0!!");
        }
        this.distance = distance;
    }
    calculateCaloriesBurned() {
        return this.duration * this.Intensity * this.distance * 0.1;
    }
    getsummary() {
        return `Běh: Doba trvání: ${this.duration} minut, Intenzita: ${this.Intensity}, Vzdálenost: ${this.distance} km`;
    }
}
class StrengthTraining extends Workout {
    sets;
    reps;
    constructor(id, duration, Intensity, sets, reps) {
        super(id, duration, Intensity);
        if (sets < 0 || reps < 0) {
            throw new Error("Hodnota musí být větší než 0!!");
        }
        this.sets = sets;
        this.reps = reps;
    }
    calculateCaloriesBurned() {
        return this.duration * this.Intensity * this.sets * this.reps * 0.05;
    }
    getsummary() {
        return `Posilování: Doba trvání: ${this.duration} minut, Intenzita: ${this.Intensity}, Série: ${this.sets}, Opakování: ${this.reps}`;
    }
}
const myWorkouts = [];
let itemId = 1;
workoutCatalog.forEach(item => {
    if (item.type === 'running') {
        myWorkouts.push(new Running(itemId++, item.duration, item.Intensity, item.distance));
    }
    else if (item.type === 'strength') {
        myWorkouts.push(new StrengthTraining(itemId++, item.duration, item.Intensity, item.sets, item.reps));
    }
});
// console.log("Souhrn tréninků:");
// console.log(workout.getsummary());
// console.log('Spálené kalorie: ' + workout.calculateCaloriesBurned() + ' kcal');
export function renderResult() {
    var tbl = document.getElementById("myTable");
    // ---
    myWorkouts.forEach(workout => {
        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        td1.appendChild(document.createTextNode(workout.getsummary()));
        tr.appendChild(td1);
        var td2 = document.createElement('td');
        td2.setAttribute('class', 'w3-right-align');
        td2.appendChild(document.createTextNode(workout.calculateCaloriesBurned().toString() + ' kcal'));
        tr.appendChild(td2);
        if (tbl)
            tbl.appendChild(tr);
    });
}
window.renderResult = renderResult;
