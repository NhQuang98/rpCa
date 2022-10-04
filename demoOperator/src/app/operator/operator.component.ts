import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {toNumbers} from "@angular/compiler-cli/src/version_helpers";

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.css']
})
export class OperatorComponent implements OnInit {
  // a !: number;
  // b !: number;
  form1 = this.formBuilder.group({
    a:'',
    b:''
  })
  constructor(private formBuilder:FormBuilder) {

  }
  onClick1(){
      // @ts-ignore
    window.alert(Number(this.form1.value.a+ this.form1.value.b))
  }
  onClick2(){
    // @ts-ignore
    window.alert(Number(this.form1.value.a- this.form1.value.b))
  }
  onClick3(){
    // @ts-ignore
    window.alert(Number(this.form1.value.a* this.form1.value.b))
  }
  onClick4(){
    // @ts-ignore
    window.alert(Number(this.form1.value.a/ this.form1.value.b))
  }


  ngOnInit(): void {
  }

}
