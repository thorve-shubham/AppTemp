import { Component, OnInit, HostListener, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { HelperService } from '../helper.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css'],
  host: {
    "(click)": "onClick($event)"
  },
})
export class TokenComponent implements OnInit {

  public text : number;

  public selected$: Observable<number>;

  constructor(
    private helper : HelperService,
  ) { }

  ngOnInit(): void {
    this.newlyAdded();
    this.text = this.helper.getlatest();
    this.selected$ = this.helper.selected;
  }

  onClick(){
    this.helper.setSelected(this.text);
  }

  newlyAdded(){
    this.helper.updateLatest();
  }
}
