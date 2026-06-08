import { workoutCatalog } from "./data.js";

abstract class Workout {
    id:number;
    duration:number;
    Intensity:number;
    constructor(id:number, duration:number, Intensity:number) {
        if(duration < 0|| Intensity < 0){
            throw new Error("Hodnoty musí být větší než 0!!");
        }
        this.id = id;
        this.duration = duration;
        this.Intensity = Intensity;
    }
    abstract calculateCaloriesBurned():number;
    abstract getsummary():string;
    public render(isNew: boolean):void {
        var tbl = document.getElementById("myTable");
        // ---
        if (tbl && isNew) {
            var tr = document.createElement('tr');
            tr.id = "x"+this.id.toString();
            var td1 = document.createElement('td');
            td1.appendChild(document.createTextNode(this.getsummary()));
            tr.appendChild(td1);
            var td2 = document.createElement('td');
            td2.setAttribute('class', 'w3-right-align');
            td2.appendChild(document.createTextNode(this.calculateCaloriesBurned().toString() + ' kcal'));
            tr.appendChild(td2);
            tbl.appendChild(tr);
        }
    }
}

class Running extends Workout {
    distance:number;
    constructor(id:number, duration:number, Intensity:number, distance:number) {
        super(id, duration, Intensity);
        if (distance < 0) {
            throw new Error("Hodnota musí být větší než 0!!");
        }
        this.distance = distance;
    }
    calculateCaloriesBurned(): number {
        return this.duration * this.Intensity * this.distance * 0.1;
    }
    getsummary(): string {
        return `Běh: Doba trvání: ${this.duration} minut, Intenzita: ${this.Intensity}, Vzdálenost: ${this.distance} km`;
    }
}

class StrengthTraining extends Workout {
    sets:number;
    reps:number;

    constructor(id:number, duration:number, Intensity:number, sets:number, reps:number) {
        super(id, duration, Intensity);
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
        return `Posilování: Doba trvání: ${this.duration} minut, Intenzita: ${this.Intensity}, Série: ${this.sets}, Opakování: ${this.reps}`;
    }
}

const myWorkouts: Workout[] = [];
let itemId = 1;

workoutCatalog.forEach(item => {
    if (item.type === 'running') {
        myWorkouts.push(new Running(itemId++, item.duration, item.Intensity, item.distance));
    } else if (item.type === 'strength') {
        myWorkouts.push(new StrengthTraining(itemId++, item.duration, item.Intensity, item.sets, item.reps));
    }
});

// console.log("Souhrn tréninků:");
// console.log(workout.getsummary());
// console.log('Spálené kalorie: ' + workout.calculateCaloriesBurned() + ' kcal');
export function renderResult():void {
    myWorkouts.forEach(workout => {
        workout.render(true);
    });
}

export function openForm(id:number, frmId:string):void {
    var frm = document.getElementById(frmId);
    // ---
    if (frm && frmId == "frmRunning") {
        var inpId = document.getElementById("runningId");
        var inp1 = document.getElementById("runningDuration");
        var inp2 = document.getElementById("runningIntensity");
        var inp3 = document.getElementById("runningDistance");
        // ---
        if (id == 0) {
            inpId?.setAttribute("value", (itemId++).toString());
            inp1?.setAttribute("value", "60");
            inp2?.setAttribute("value", "1");
            inp3?.setAttribute("value", "1");
        }
        else {
            var item = myWorkouts.find(x => x.id == id) as Running;
            if (item) {
                inpId?.setAttribute("value", (id).toString());
                inp1?.setAttribute("value", item.duration.toString());
                inp2?.setAttribute("value", item.Intensity.toString());
                inp3?.setAttribute("value", item.distance.toString());
            } else return;
        }
        // ---
        frm.style.display='block';
        inp1?.focus();
    }
}

export function saveItem(frmId: string):void {
    var frm = document.getElementById(frmId);
    // ---
    if (frm && frmId == "frmRunning") {
        var inpId = document.getElementById("runningId");
        var inp1 = document.getElementById("runningDuration");
        var inp2 = document.getElementById("runningIntensity");
        var inp3 = document.getElementById("runningDistance");
        // ---
        var item = myWorkouts.find(x => x.id == Number(inpId?.getAttribute("value")));
        if (item) {
            // TODO: update hodnot a prekresleni radku (neni implementovano)
            item.render(false);
        }
        else {
            item = new Running(
            Number(inpId?.getAttribute("value")), 
            Number(inp1?.getAttribute("value")), 
            Number(inp2?.getAttribute("value")), 
            Number(inp3?.getAttribute("value")));
            myWorkouts.push(item);
            item.render(true);
        }
        // ---
        frm.style.display='none'
    }
}

// ---
interface MyNamespacedWindow extends Window {
    renderResult: object;
    openForm: object;
    saveItem: object;
}
// ---
declare var window: MyNamespacedWindow;
window.renderResult=renderResult;
window.openForm=openForm;
window.saveItem=saveItem;
