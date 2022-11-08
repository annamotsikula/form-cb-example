import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { IFormInput } from 'src/app/core/interfaces/board.interface';
import { FormDataService } from 'src/app/core/services/form-data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnChanges {
  @Input() formDisplayData!: IFormInput[];
  formData!: FormGroup
  data = {}
  allowTerms: boolean = false
  checkStatus: boolean = false
  constructor(private _service: FormDataService) { }

  ngOnChanges(): void {
    this.formData = this._service.createFormGroup(this.formDisplayData, this.data)
    console.log(this.formData.value)
    this.formData.controls['email'].addValidators(Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"))
  

    
  }
  onSubmit() {
    if(this.isValid()) {
      alert(`Successfully Signed Up. User: ${JSON.stringify(this.formData.value)}`)
    }
  }
  isValid(): boolean {
    if(this.formData.valid && this.allowTerms && this.checkStatus) {
      return true
    }
    return false
  }
}
