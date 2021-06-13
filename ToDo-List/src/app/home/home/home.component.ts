import { Time } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from 'src/app/core/models/task';
import { AddTaskComponent } from 'src/app/modals/add-task/add-task.component';
import { EditTaskComponent } from 'src/app/modals/edit-task/edit-task.component';

// export interface Task {
//   position: number;
//   title: string;
//   description: string;
//   estimatedTime: string;
//   category: string;
//   date: string;
//   status: string;
// }

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit, AfterViewInit {

  taskList: Task[] = [
    {position: 1, title: 'first title', description: 'first description', estimatedTime: 'drc stie', category: 'random', date: '01-16-2021', status: 'drc stie'},
    {position: 2, title: 'second title', description: 'second description', estimatedTime: 'drc stie', category: 'random', date: '01-16-2021', status: 'drc stie'},
  ];

  displayedColumns: string[] = ['position', 'title', 'description', 'estimatedTime', 'category', 'date', 'status', 'actions'];
  dataSource;

  @ViewChild(MatSort) sort: MatSort;

  taskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.taskList);

    this.taskForm = this.fb.group({
      position: [''],
      title: [''],
      descpition: [''],
      estimatedTime: [''],
      category: [''],
      date: [''],
      status: ['']
    })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  onRowClick(row) {
    console.log(row);
  }

  onAdd() {
    console.log(this.taskForm.value);
    this.taskList.push(this.taskForm.value);

    this.dataSource.data = this.taskList;
  }

  onDelete(row) {
    console.log('Delete', row);
    const index = this.taskList.indexOf(row);
    if (index > -1) {
      this.taskList.splice(index, 1);
      this.dataSource.data = this.taskList;
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '300px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result) {
        this.taskList.push(result.value);
        this.dataSource.data = this.taskList;
      }
    });
  }

  onEdit(row) {
    const dialogRef = this.dialog.open(EditTaskComponent, {
      width: '300px',
      data: row
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result) {
        const taskIndex = this.taskList.findIndex(task => task.position == result.value.position);
        this.taskList[taskIndex].category = result.value.category;
        this.taskList[taskIndex].date = result.value.date;
        this.taskList[taskIndex].description = result.value.description;
        this.taskList[taskIndex].estimatedTime = result.value.estimatedTime;
        this.taskList[taskIndex].position = result.value.position;
        this.taskList[taskIndex].status = result.value.status;
        this.taskList[taskIndex].title = result.value.title;
      }
    });
  }

}
