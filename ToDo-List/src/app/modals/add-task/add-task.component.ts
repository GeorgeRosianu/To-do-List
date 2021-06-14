import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomValidators } from 'src/app/core/helpers/custom-validators';
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
      position: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(5),
        CustomValidators.numbers
      ])],
      title: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ])],
      descpition: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(30)
      ])],
      estimatedTime: ['', CustomValidators.time()],
      category: ['', {
        validators: [
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20)
          ])
        ],
        updateOn: 'blur'
      }],
      date: ['', CustomValidators.date()],
      status: ['', Validators.required]
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

  get title() {
    return this.taskForm.get('title');
  }
}
