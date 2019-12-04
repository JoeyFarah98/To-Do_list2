import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { timer, Subscription } from 'rxjs';
import { Task } from '../Models/task.interface';
import { DataService } from '../tabs/data.service';
import { getLocaleDateTimeFormat } from '@angular/common';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.page.html',
  styleUrls: ['./tracker.page.scss'],
})
export class TrackerPage implements OnInit {
  taskForm:FormGroup;
  whencreated:number;

  constructor(
    private formBuilder:FormBuilder,
    private dataService:DataService
  ) { }

  ngOnInit() {
    this.taskForm = this.formBuilder.group({
     name: ['', [Validators.required, Validators.minLength(3) ] ] 
    });
  }


  addTask() {
    let task:Task = {
      name: this.taskForm.get('name').value,
      created: new Date().getTime(),
      status: false

    }
    this.dataService.addToList( task );  
    this.taskForm.reset();  
  }
}
