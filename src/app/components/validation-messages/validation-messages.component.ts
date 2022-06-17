import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-validation-messages',
  templateUrl: './validation-messages.component.html',
  styleUrls: ['./validation-messages.component.scss']
})
export class ValidationMessagesComponent implements OnInit {
  @Input() control: FormControl | any;
  @Input() fieldName: string;
  @Input() regexPattern: RegExp;
  constructor() { }

  ngOnInit(): void {
  }

}
