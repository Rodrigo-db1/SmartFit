import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GetUnitsService } from 'src/app/services/get-units.service';
import { Location } from 'src/app/types/location.interface';

const OPENING_HOURS = {
  morning: {
    first:'06',
    last:'12'
  },
  afternoon: {
    first:'12',
    last:'18'
  },
  night: {
    first:'18',
    last:'23'
  }  
}

type HOUR_INDEXES = 'morning' | 'afternoon' | 'night'
@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {
    results: Location[] = [];
    filteredResults: Location[] = []; 
    formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, 
               private unitService: GetUnitsService
               ) { }

  ngOnInit(): void 
  {
     this.formGroup = this.formBuilder.group({
      hour:'',
      showClosed: false
    })
      this.unitService.getAllUnits().subscribe(data => {
        this.results = data.locations;
        this.filteredResults = data.locations;        
    });
  }

  transformWeekday(weekday: number){
    switch (weekday) {
      case 0:
        return 'Dom.'
      case 6:
        return 'Sab.'
      default:
        return 'Seg. à Sex.'
    }
  }

  filterUnits(unit: Location, opened:boolean, open_hour:string, close_hour:string){
    let open_hour_filter = parseInt(open_hour, 10)
    let close_hour_filter = parseInt(close_hour, 10)

    let todays_weekday = this.transformWeekday (new Date().getDay());

    if(opened === true && unit.opened === true)

    for(let i=0; i < unit.schedules.length; i++){
      let schedules_hour = unit.schedules[i].hour
      let schedules_weekday = unit.schedules[i].weekdays

      if(todays_weekday === schedules_weekday){
        if(schedules_hour !== 'fechada'){
         let [unit_open_hour, unit_close_hour] = schedules_hour.split(' ás ')
         let unit_open_hour_int = parseInt(unit_open_hour.replace('h', ''),10)
         let unit_close_hour_int = parseInt(unit_close_hour.replace('h', ''),10)

          if(unit_open_hour_int >= open_hour_filter && unit_close_hour_int >= close_hour_filter) return true
          else return false  
        }
      }
    }
  }

  onSubmit(): void {
    const OPEN_HOUR = OPENING_HOURS[this.formGroup.value.hour as HOUR_INDEXES].first
    const CLOSE_HOUR = OPENING_HOURS[this.formGroup.value.hour as HOUR_INDEXES].last

    if(!this.formGroup.value.showClosed) {
      this.filteredResults = this.results.filter(location => location.opened ===true )
      } else {
        this.filteredResults = this.results;
      }
  }

  onClean(): void{
  this.formGroup.reset();
  }
}
