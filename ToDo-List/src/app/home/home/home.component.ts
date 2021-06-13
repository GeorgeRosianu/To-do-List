import { Time } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from 'src/app/core/models/task';
import { AddTaskComponent } from 'src/app/modals/add-task/add-task.component';
import { EditTaskComponent } from 'src/app/modals/edit-task/edit-task.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit, AfterViewInit {

  taskList: Task[] = [
    {position: 1, title: 'Send email', description: 'Send an email update to the team', estimatedTime: '9:00', category: 'Email', date: '02-06-2021', status: 'Complete'},
    {position: 2, title: 'Call design agency', description: 'Call to finalize mockups', estimatedTime: '13:00', category: 'Call', date: '02-06-2021', status: 'Complete'},
    {position: 3, title: 'Touch Base with recr', description: 'Is the new role being added', estimatedTime: '10:30', category: 'Meeting', date: '04-06-2021', status: 'In Progress'},
    {position: 4, title: 'Meet with eng team', description: '', estimatedTime: '10:00', category: 'Meeting', date: '05-06-2021', status: 'Not Started'},
  ];

  displayedColumns: string[] = ['position', 'title', 'description', 'estimatedTime', 'category', 'date', 'status', 'actions'];
  dataSource;
  titleSearchValue;

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

  searchByTitle() {
    this.dataSource.data = this.taskList.filter(e => e.title.toLowerCase() == this.titleSearchValue.toLowerCase());
  }

  clearTitleSearch() {
    this.titleSearchValue = '';
    this.dataSource.data = this.taskList;
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
