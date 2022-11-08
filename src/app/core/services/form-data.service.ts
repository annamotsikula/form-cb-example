import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { map, Observable } from "rxjs";
import { IFormInput } from "../interfaces/board.interface";

@Injectable({
    providedIn: 'root'
}) 
export class FormDataService {

    constructor(private _http: HttpClient) {

    }
    getInputFields(): Observable<IFormInput[]> {
        return this._http.get<IFormInput[]>('assets/form/input.json')
        .pipe(
            map(res => res.sort((a, b)=> a.order - b.order))
        )
    }
    createFormGroup(controls: IFormInput[], data: any) {
        const group: any = {}
        controls.forEach(control => {
            group[control.id] = control.required ? 
            new FormControl(data[control.id] || '', [Validators.required, Validators.minLength(3)]) :
            new FormControl(data[control.id] || '')
        })

        return new FormGroup(group)
    }
   
}