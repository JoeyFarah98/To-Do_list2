import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  taskList:Array<Task> = new Array();
  list$ = new BehaviorSubject<Task[]>( this.taskList ) ;
  constructor() {
    this.loadData().then((data:Array<Task>) => {
      data.forEach((item) => {
        this.taskList.push(item)
      })
      this.sortList();
      this.list$.next( this.taskList );
    })
  }

  addToList( task:Task ) {
    this.taskList.push( task );
    this.list$.next( this.taskList );
    this.sortList();
    this.saveData();
  }

  deleteFromList( id:number ) {
    this.taskList.forEach( (task:Task, index ) => {
      if( task.created == id ) {
        this.taskList.splice( index, 1 );
      }
    });
    this.saveData();
    this.list$.next( this.taskList );
  }

  saveData() {
    let data = JSON.stringify( this.taskList );
    try {
      window.localStorage.setItem("tasks" , data );
      if( !window.localStorage.getItem("tasks") ) {
        throw("local storage not available");
      }
    }
    catch( exc ) {
      console.log( exc );
    }

    this.list$.next(this.taskList);
  }

  loadData() {
    return new Promise( (resolve,reject) => {
      if( !window.localStorage.getItem("tasks") ) {
        reject( false );
      }
      else{
        let data = JSON.parse( window.localStorage.getItem("tasks") );
        console.log(data);
        resolve( data );
      }
    } );
  }

  sortList(){
    this.taskList.sort( (task1:Task, task2:Task ) => {
      return task2.created - task1.created;
    })
  }
}
