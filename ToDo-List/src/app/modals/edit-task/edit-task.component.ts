import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomValidators } from 'src/app/core/helpers/custom-validators';
import { Task } from 'src/app/core/models/task';


@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.less']
})
export class EditTaskComponent implements OnInit {

  taskForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
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
      estimatedTime: [this.data.estimatedTime, CustomValidators.time()],
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
      date: [this.data.date, CustomValidators.date()],
      status: [this.data.status, Validators.required]
    })
  }

  onAdd() {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  get date() {
    return this.taskForm.get('date');
  }

  get estimatedTime() {
    return this.taskForm.get('estimatedTime');
  }

  get position() {
    return this.taskForm.get('position');
  }
}
