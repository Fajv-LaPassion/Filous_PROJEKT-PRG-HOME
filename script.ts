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
    // spocte a vrati pocet spalenych kalorii
    abstract calculateCaloriesBurned():number;
    // vrati aktivitu v textove podobe
    abstract getsummary():string;
    // vrati nazev tridy
    abstract getTypeName():string;
    // vykresleni nove pridaneho radku v tabulce s aktivitami
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
            var td3 = document.createElement('td');
            var btn1 = document.createElement('button');
            btn1.setAttribute('class', 'w3-button w3-indigo w3-small w3-round w3-padding-small w3-center');
            btn1.setAttribute('onclick', 'javascript:openForm('+this.id.toString()+', \'frm'+this.getTypeName()+'\');');
            btn1.appendChild(document.createTextNode('edit'));
            btn1.style = 'margin-right: 2px';
            td3.appendChild(btn1);
            var btn2 = document.createElement('button');
            btn2.setAttribute('class', 'w3-button w3-red w3-small w3-round w3-padding-small w3-center');
            btn2.setAttribute('onclick', 'javascript:delItem('+this.id.toString()+', this)');
            btn2.appendChild(document.createTextNode('del'));
            td3.appendChild(btn2);
            tr.appendChild(td3);
            tbl.appendChild(tr);
        }
    }
}

// trida pro ulozeni aktivity typu beh
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
        return this.duration * this.Intensity * this.distance * 1.2;
    }
    getsummary(): string {
        return `Běh: Doba trvání: ${this.duration} minut, Intenzita: ${this.Intensity}, Vzdálenost: ${this.distance} km`;
    }
    getTypeName(): string { return "Running"; }
}

// trida pro ulozeni aktivity typu posilovani
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
        return (this.duration * this.Intensity * 0.5) + (this.sets * this.reps * 0.1);
    }
    getsummary(): string {
        return `Posilování: Doba trvání: ${this.duration} minut, Intenzita: ${this.Intensity}, Série: ${this.sets}, Opakování: ${this.reps}`;
    }
    getTypeName(): string { return "Strength"; }
}

// pole pro ulozeni seznamu objektu aktivit
const myWorkouts: Workout[] = [];
// cislovani radku v html tabulce, slouzi pro vyrobu ID radku
let itemId = 1;
// soucet spalenych kalorii ze vsech zadanych aktivit
let kcalSUM = 0;

// nacteni testovaciho datasetu aktivit po startu aplikace
workoutCatalog.forEach(item => {
    if (item.type === 'running') {
        myWorkouts.push(new Running(itemId++, item.duration, item.Intensity, item.distance));
    } else if (item.type === 'strength') {
        myWorkouts.push(new StrengthTraining(itemId++, item.duration, item.Intensity, item.sets, item.reps));
    }
});

// prvotni vykresleni aktivit po spusteni aplikace
export function renderResult():void {
    myWorkouts.forEach(workout => {
        workout.render(true);
    });
    // ---
    recalculateSUM();
}

// prepocet celkoveho souctu spalenych kalorii a jeho zobrazeni
function recalculateSUM():void {
    kcalSUM = 0;
    myWorkouts.forEach(workout => {
        kcalSUM += workout.calculateCaloriesBurned();
    });
    // ---
    var cell = document.getElementById("kcalSUM") as HTMLTableCellElement;
    cell.innerText = kcalSUM.toString() + ' kcal';
}

// otevreni formulare pro pridani/editaci aktivity
export function openForm(id:number, frmId:string):void {
    var frm = document.getElementById(frmId);
    // ---
    if (frm && frmId == "frmRunning") {
        var inpId = document.getElementById("runningId") as HTMLInputElement;
        var inp1 = document.getElementById("runningDuration") as HTMLInputElement;
        var inp2 = document.getElementById("runningIntensity") as HTMLInputElement;
        var inp3 = document.getElementById("runningDistance") as HTMLInputElement;
        // ---
        if (id == 0) {
            inpId.value = (itemId++).toString();
            inp1.valueAsNumber = 60;
            inp2.valueAsNumber = 1;
            inp3.valueAsNumber = 1;
        }
        else {
            let item = myWorkouts.find(x => x.id == id) as Running;
            if (item) {
                inpId.value = id.toString();
                inp1.valueAsNumber = item.duration;
                inp2.valueAsNumber = item.Intensity;
                inp3.valueAsNumber = item.distance;
            } else return;
        }
        // ---
        frm.style.display='block';
        inp1?.focus();
    }
    // ---
    if (frm && frmId == "frmStrength") {
        var inpId = document.getElementById("strengthId") as HTMLInputElement;
        var inp1 = document.getElementById("strengthDuration") as HTMLInputElement;
        var inp2 = document.getElementById("strengthIntensity") as HTMLInputElement;
        var inp3 = document.getElementById("strengthSets") as HTMLInputElement;
        var inp4 = document.getElementById("strengthReps") as HTMLInputElement;
        // ---
        if (id == 0) {
            inpId.value = (itemId++).toString();
            inp1.valueAsNumber = 60;
            inp2.valueAsNumber = 1;
            inp3.valueAsNumber = 1;
            inp4.valueAsNumber = 1;
        }
        else {
            let item = myWorkouts.find(x => x.id == id) as StrengthTraining;
            if (item) {
                inpId.value = id.toString();
                inp1.valueAsNumber = item.duration;
                inp2.valueAsNumber = item.Intensity;
                inp3.valueAsNumber = item.sets;
                inp4.valueAsNumber = item.reps;
            } else return;
        }
        // ---
        frm.style.display='block';
        inp1?.focus();
    }
}

// ulozeni nove aktivity ci aktualizace existujici
export function saveItem(frmId: string):void {
    var frm = document.getElementById(frmId);
    // ---
    if (frm && frmId == "frmRunning") {
        var inpId = document.getElementById("runningId") as HTMLInputElement;
        var inp1 = document.getElementById("runningDuration") as HTMLInputElement;
        var inp2 = document.getElementById("runningIntensity") as HTMLInputElement;
        var inp3 = document.getElementById("runningDistance") as HTMLInputElement;
        // ---
        let item = myWorkouts.find(x => x.id == Number(inpId?.value)) as Running;
        if (item) {
            item.duration = inp1.valueAsNumber;
            item.Intensity = inp2.valueAsNumber;
            item.distance = inp3.valueAsNumber;
            // ---
            var tr = document.getElementById('x'+item.id.toString()) as HTMLTableRowElement;
            if (tr) {
                tr.cells[0].innerText = item.getsummary();
                tr.cells[1].innerText = item.calculateCaloriesBurned().toString() + " kcal";
            }
        }
        else {
            item = new Running(Number(inpId?.value), Number(inp1?.value), Number(inp2?.value), Number(inp3?.value));
            myWorkouts.push(item);
            item.render(true);
        }
        // ---
        frm.style.display='none'
    }
    // ---
    if (frm && frmId == "frmStrength") {
        var inpId = document.getElementById("strengthId") as HTMLInputElement;
        var inp1 = document.getElementById("strengthDuration") as HTMLInputElement;
        var inp2 = document.getElementById("strengthIntensity") as HTMLInputElement;
        var inp3 = document.getElementById("strengthSets") as HTMLInputElement;
        var inp4 = document.getElementById("strengthReps") as HTMLInputElement;
        // ---
        let item = myWorkouts.find(x => x.id == Number(inpId?.value)) as StrengthTraining;
        if (item) {
            item.duration = inp1.valueAsNumber;
            item.Intensity = inp2.valueAsNumber;
            item.sets = inp3.valueAsNumber;
            item.reps = inp4.valueAsNumber;
            // ---
            var tr = document.getElementById('x'+item.id.toString()) as HTMLTableRowElement;
            if (tr) {
                tr.cells[0].innerText = item.getsummary();
                tr.cells[1].innerText = item.calculateCaloriesBurned().toString() + " kcal";
            }
        }
        else {
            item = new StrengthTraining(Number(inpId?.value), Number(inp1?.value), Number(inp2?.value), Number(inp3?.value), Number(inp4?.value));
            myWorkouts.push(item);
            item.render(true);
        }
        // ---
        frm.style.display='none'
    }
    // ---
    recalculateSUM();
}

// vymaz zadane aktivity
export function delItem(id: number, button: HTMLButtonElement):void {   
    var index = myWorkouts.findIndex(x => x.id == id);
    if (index != -1) myWorkouts.splice(index, 1);
    // ---
    var row = button.closest('tr') as HTMLTableRowElement;
    if (row) row.remove();
    // ---
    recalculateSUM();
}

// vymaz vsech aktivit, tj. vycisteni tabulky
export function delAllItems():void {
    myWorkouts.length = 0;
    // ---
    var tbl = document.getElementById("myTable") as HTMLTableElement;
    if (tbl) {
        // Loop backwards because table.rows is a live array that shrinks as you delete
        // Keep header and footer intact
        for (let i = tbl.rows.length - 2; i >= 1; i--) {
            tbl.deleteRow(i); 
        }
    }
    // ---
    recalculateSUM();
}

// interface pro zpristupneni vybranych funkci v index.html
interface MyNamespacedWindow extends Window {
    renderResult: object;
    openForm: object;
    saveItem: object;
    delItem: object;
    delAllItems: object;
}
// ---
declare var window: MyNamespacedWindow;
window.renderResult=renderResult;
window.openForm=openForm;
window.saveItem=saveItem;
window.delItem=delItem;
window.delAllItems=delAllItems;
