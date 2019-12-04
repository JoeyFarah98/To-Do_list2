import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { timer, Subscription } from 'rxjs';
import { Task } from '../models/task.interface';
import { DataService } from '../tabs/data.service';
import { getLocaleDateTimeFormat } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-tracker',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  taskForm:FormGroup;
  whencreated:number;

  constructor(
    private formBuilder:FormBuilder,
    private dataService:DataService
  ) { }

  ngOnInit() {
    this.taskForm = this.formBuilder.group({
     taskName: ['', [Validators.required, Validators.minLength(3) ] ] 
    });
  }


  addTask() {
    let task:Task = {
      name: this.taskForm.get('taskName').value,
      created: new Date().getTime(),
      status: false

    }
    this.dataService.addToList( task );  
    this.taskForm.reset();  
  }
}
