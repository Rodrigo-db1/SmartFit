import { Component } from '@angular/core';
import { Location } from './types/location.interface';
import { GetUnitsService } from './services/get-units.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showList = new BehaviorSubject(false);
  unitsList: Location[] = [];

  constructor(private unitService: GetUnitsService){

  }

  onSubmit(){
      this.showList.next(true);
      this.unitsList = this.unitService.getFilteredUnits();
  }
}
