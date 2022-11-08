import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormDataService } from 'src/app/core/services/form-data.service';
import { sloganData } from '../../core/board.data';
import { IAuthBoard, IFormInput } from '../../core/interfaces/board.interface';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  listData: IAuthBoard[] = sloganData
  formArrayData$: Observable<IFormInput[]>;
  constructor(private _service: FormDataService) {
    this.formArrayData$ = this._service.getInputFields()
   }

  ngOnInit(): void {
  }

}
