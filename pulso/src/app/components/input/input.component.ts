import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers:[
    {
      provide:NG_VALUE_ACCESSOR,
      useExisting:forwardRef(() => InputComponent ),
      multi:true
    }]
})
export class InputComponent implements OnInit, ControlValueAccessor {

  @Input() type:string;
  @Input() placeholder:string;
  @Input() iconName:string;

  private _value:string;
  isDisabled:boolean;
  onChange = (_: any) => {};
  onTouch = () => {};

  constructor() { }

  ngOnInit() {

  }

  get value(){
    return this._value
  }

  set value(v:string){
    if (v !== this._value){
      this._value = v;
      this.onTouch();
      this.onChange(v)
    }
  }


  writeValue(obj: any): void {
    if(obj){
      this._value = obj;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}


