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
export class TokenComponent implements OnInit,AfterViewInit {

  public text : number;
  @ViewChild('token') token : ElementRef;

  public selected$: Observable<number>;

  constructor(
    private helper : HelperService,
    private renderer : Renderer2
  ) { }

  ngOnInit(): void {
    this.newlyAdded();
    this.text = this.helper.getlatest();
    console.log(this.text);
    this.selected$ = this.helper.selected;
  }

  ngAfterViewInit(){
    // this.renderer.setStyle(this.token.nativeElement,'z-index',this.text);
  }

  onClick(){
    this.helper.setSelected(this.text);
  }

  newlyAdded(){
    this.helper.updateLatest();
  }
}
