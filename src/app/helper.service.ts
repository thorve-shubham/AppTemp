import { Injectable, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  public currentlySelected : number;
  public latest : number;
  private slectedComponent = new BehaviorSubject<number>(0);

  constructor() {
    this.currentlySelected = 0;
    this.latest = 0;
  }

  getCurrentlySelected(){
    return this.currentlySelected;
  }

  getlatest(){
    return this.latest;
  }

  updateLatest(){
    this.latest++;
  }

  get selected() {
    return this.slectedComponent.asObservable();
  }

  setSelected(selected: number) {
    this.slectedComponent.next(selected);
    this.currentlySelected = selected;
  }
}
