class AdminOfDates {

    constructor() {
        this.dates = [];
    }

    addDate(newDate){
        this.dates = [...this.dates, newDate];
        console.log(this.dates);
    }

    deleteDate(index){
        this.dates.splice(index, 1);
    }
}

export { AdminOfDates };