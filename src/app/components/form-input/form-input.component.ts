import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IFormInput } from 'src/app/core/interfaces/board.interface';

@Component({
  selector: 'form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})
export class FormInputComponent implements OnChanges {
  @Input() metaData!: IFormInput
  @Input() parentForm!: FormGroup
  @Output() sendStatus: EventEmitter<boolean> = new EventEmitter<boolean>(false)
  toggleShowPassw: boolean = false
  
  constructor() {
   }

  ngOnChanges(): void {
    this.createForm();
  }
  createForm() {
    this.parentForm.addControl(`${this.metaData.id}`, new FormControl('', [Validators.required]))
  }
  passwordValid(data: any) {
    this.sendStatus.emit(data)
  }
  get password() {
    return this.parentForm.controls['password'] as FormControl;
  }
  get email() {
    return this.parentForm.controls['email'] as FormControl;
  }

 
}
