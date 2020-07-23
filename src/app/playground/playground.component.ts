import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit, ComponentFactoryResolver, ViewContainerRef, ComponentRef, HostListener } from '@angular/core';
import { viewClassName } from '@angular/compiler';
import { TokenComponent } from '../token/token.component';
import { HelperService } from '../helper.service';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css'],
  host: {
    '(document:keydown)': 'handleKeyboardEvent($event)'
  }
})
export class PlaygroundComponent implements OnInit,AfterViewInit {

  constructor(
    private renderer : Renderer2,
    private resolver : ComponentFactoryResolver,
    private helper : HelperService
  ) { }

  handleKeyboardEvent(event: KeyboardEvent) { 
    if(event.key == 'w'){
      this.moveUp();
    }else if(event.key == 's'){
      this.moveDown();
    }else if(event.key == 'a'){
      this.moveLeft();
    }else if(event.key == 'd'){
      this.moveRight();
    }else if(event.key == 'Delete'){
      this.deleteToken();
    }else if(event.key == 'n'){
      this.addBox();
    }else{
      alert('invalid Input');
    }
  }

  @ViewChild('playground',{ read: ViewContainerRef }) playground : ViewContainerRef;
  public componentrefs = [];

  ngOnInit(): void {
    
  }

  ngAfterViewInit(){

  }

  addBox(){
    let factory = this.resolver.resolveComponentFactory(TokenComponent);
    let newComponentRef : ComponentRef<TokenComponent> = this.playground.createComponent(factory);
    this.componentrefs.push(newComponentRef);
    this.renderer.setStyle(newComponentRef.location.nativeElement,'z-index',this.helper.getlatest());
    this.renderer.setStyle(newComponentRef.location.nativeElement,'position','absolute');
  }

  moveDown(){
    let token = this.helper.getCurrentlySelected();
    if(token!=0){
      let selectedRef = this.componentrefs.filter(x=>x.instance.text == token)[0];
      let current_position = selectedRef.location.nativeElement.style.transform; 
      this.renderer.setStyle(selectedRef.location.nativeElement,'position','relative');
      this.renderer.setStyle(selectedRef.location.nativeElement,'transform',current_position+" "+'translateY(100px)');
      this.renderer.setStyle(selectedRef.location.nativeElement,'position','absolute');
    }else{
      alert('please Select token');
    }
  }

  moveUp(){
    let token = this.helper.getCurrentlySelected();
    if(token!=0){
      let selectedRef = this.componentrefs.filter(x=>x.instance.text == token)[0];
      let current_position = selectedRef.location.nativeElement.style.transform; 
      this.renderer.setStyle(selectedRef.location.nativeElement,'position','relative');
      this.renderer.setStyle(selectedRef.location.nativeElement,'transform',current_position+" "+'translateY(-100px)');
      this.renderer.setStyle(selectedRef.location.nativeElement,'position','absolute');
    }else{
      alert('please Select token');
    }
  }

  moveRight(){
    let token = this.helper.getCurrentlySelected();
    if(token!=0){
      let selectedRef = this.componentrefs.filter(x=>x.instance.text == token)[0];
      let current_position = selectedRef.location.nativeElement.style.transform; 
      this.renderer.setStyle(selectedRef.location.nativeElement,'position','relative');
      this.renderer.setStyle(selectedRef.location.nativeElement,'transform',current_position+" "+'translateX(100px)');
      this.renderer.setStyle(selectedRef.location.nativeElement,'position','absolute');
    }else{
      alert('please Select token');
    }
  }

  moveLeft(){
    let token = this.helper.getCurrentlySelected();
    if(token!=0){
      let selectedRef = this.componentrefs.filter(x=>x.instance.text == token)[0];
      let current_position = selectedRef.location.nativeElement.style.transform; 
      this.renderer.setStyle(selectedRef.location.nativeElement,'position','relative');
      this.renderer.setStyle(selectedRef.location.nativeElement,'transform',current_position+" "+'translateX(-100px)');
      this.renderer.setStyle(selectedRef.location.nativeElement,'position','absolute');
    }else{
      alert('please Select token');
    }
    
  }

  deleteToken(){
    let token = this.helper.getCurrentlySelected();
    if(token!=0){
      let selectedRef = this.componentrefs.filter(x=>x.instance.text == token)[0]; 
      let indexOfComponent = this.componentrefs.indexOf(selectedRef);
      console.log(indexOfComponent);
      this.playground.remove(indexOfComponent);
      this.componentrefs.splice(indexOfComponent,1);
      this.helper.setSelected(0);
    }else{
      alert('please Select token');
    }
  }
}
