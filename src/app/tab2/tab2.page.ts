import { Component, OnInit } from '@angular/core';


import { Subscription } from 'rxjs';
import { Task } from '../models/task.interface';
import { DataService } from '../tabs/data.service';


@Component({
  selector: 'app-history',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  history:Array<Task> = [];
  historySub:Subscription;

  constructor(
    private dataService:DataService
  ) { }

  ngOnInit() {
    this.historySub = this.dataService.list$.subscribe( taskData => this.history = taskData );
  }
  
  changeCheckboxStatus(id:number){
    this.dataService.taskList.forEach((tasks)=> {
      if(tasks.created == id){
        tasks.status = true;
      }
    });
    this.dataService.saveData();
  }

  delete( itemStart ) {
    this.dataService.deleteFromList( itemStart );
  }
}
