import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDS } from '../ds.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../../admin/user-management/user-management.model';
import { DSService } from '../service/ds.service';
const stuTemplate = {} as IDS;

@Component({
  selector: 'jhi-ds-detail',
  templateUrl: './ds-detail.component.html',
})
export class DSDetailComponent implements OnInit {
  dS: IDS | null = null;
  isSaving = false;
  constructor(protected dSService: DSService, protected route: ActivatedRoute) {}

  ngOnInit(): void {
    // this.activatedRoute.data.subscribe(({ dS }) => {
    //   this.dS = dS;
    // });
    const routeParams = this.route.snapshot.paramMap;
    const Id = Number(routeParams.get('id'));
    this.dSService.findById(Id).subscribe((data: IDS) => {
      this.dS = data;
      // @ts-ignore
      this.editForm.controls['id'].setValue(this.dS.id);
      // @ts-ignore
      this.editForm.controls['code'].setValue(this.dS.code);
      // @ts-ignore
      this.editForm.controls['name'].setValue(this.dS.name);
      // @ts-ignore
      this.editForm.controls['marks'].setValue(this.dS.marks);
      // @ts-ignore
      this.editForm.controls['classes'].setValue(this.dS.classes);

      console.log('id ' + this.editForm.controls.id);
    });
  }
  editForm = new FormGroup({
    id: new FormControl(stuTemplate.id),
    code: new FormControl(stuTemplate.code),
    name: new FormControl(stuTemplate.name),
    marks: new FormControl(stuTemplate.marks),
    classes: new FormControl(stuTemplate.classes),
  });

  save(): void {
    this.isSaving = true;
    const stu = this.editForm.getRawValue();
    if (stu.id !== null) {
      this.dSService.updateStudent(stu, stu.id).subscribe({
        next: () => this.onSaveSuccess(),
        error: () => this.onSaveError(),
      });
    } else {
      this.dSService.creStudent(stu).subscribe({
        next: () => this.onSaveSuccess(),
        error: () => this.onSaveError(),
      });
    }
  }

  previousState(): void {
    window.history.back();
  }
  private onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  private onSaveError(): void {
    this.isSaving = false;
  }
}
