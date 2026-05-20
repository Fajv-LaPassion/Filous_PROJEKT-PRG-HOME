abstract class Workout {
    duration:number;
    Intensity:string;¨
    constructor(duration:number, Intensity:number){
        this.duration = duration;
        this.Intensity = Intensity;
    }
    abstract calculateCaloriesBurned():number;
    abstract getsummary():string;
}