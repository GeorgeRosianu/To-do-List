import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/app/core/models/task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.less']
})
export class AddTaskComponent implements OnInit {

  taskForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      position: ['', Validators.required],
      title: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ])],
      descpition: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(30)
      ])],
      estimatedTime: [''],
      category: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ])],
      date: ['', Validators.required],
      status: ['', Validators.required]
    })
  }

  onAdd() {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  get title() {
    return this.taskForm.get('title');
  }

  /*
  this.taskForm = this.fb.group({
      position: [this.data.position, Validators.required],
      title: [this.data.title,
      {
        validators: Validators.minLength(3),
        updateOn: 'blur'
      }],
      description: [this.data.description, 
      {
        validators: [
          Validators.compose([
            Validators.minLength(3),
            Validators.maxLength(50)
          ])
        ],
        updateOn: 'blur'
      }],
      estimatedTime: [this.data.estimatedTime, Validators.required],
      category: [this.data.category,
      {
        validators: [
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20)
          ])
        ],
        updateOn: 'blur'
      }],
      date: [this.data.date, Validators.required],
      status: [this.data.status, Validators.required]
    })
  */

}
