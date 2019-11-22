import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { HierarchicalrequirementService } from '../services/hierarchicalrequirement.service';

@Component({
  selector: 'app-wwe-feature',
  templateUrl: './wwe-feature.component.html',
  styleUrls: ['./wwe-feature.component.css']
})
export class WweFeatureComponent implements OnInit {

  routingForm: FormGroup;


  scenerioVal: any;
  test = false;

  @Input() bizUnitVal;
  @Input() scrumTeam;
  @Input() deliverDate;

  
  @Output() wweJson = new EventEmitter();



  @Input() selectedRequestType: any = [];



  wweFeatures = [
    { value: '1', label: 'Case Information (Iteration)' },
    { value: '2', label: 'Case Information (Toast pop)' },
    { value: '3', label: 'Not Ready Reasons' },
    { value: '4', label: 'Disposition Codes' },
    { value: '5', label: 'Caller ID' },
    { value: '6', label: 'Screen pop' },
    { value: '7', label: 'Corporate Favourites' },
  ];
  
  

  @Input() multipleCheckBox: any;



  // tslint:disable-next-line: max-line-length
  constructor(private fb: FormBuilder, private http: HttpClient,
     private hierarchicalrequirementService: HierarchicalrequirementService, private dateFormat: DatePipe) { }


  ngOnInit() {
    this.createForm();

    setTimeout((res) => {
      // tslint:disable-next-line: max-line-length
      // this.multipleCheckBox = ['Case Information (Iteration)', 'Case Information (Toast pop)', 'Not Ready Reasons', 'Disposition Codes', 'Caller ID', 'Screen pop',
      //   'Corporate Favourites'];
    });

  }



  createForm() {
    this.routingForm = this.fb.group({
      WWEfeatures: this.fb.group({
        // selectedRequestType: ['', Validators.required],
        // multipleCheckBox: this.fb.array([]),
        featureValuesKeyDropVal: [''],
        ENT_Prblm_Statement: ['', Validators.required],
        ENT_Additional_Information: ['', Validators.required],
        shortDesc1: ['', Validators.required],
        shortDesc2: ['', Validators.required],
        shortDesc3: ['', Validators.required],
        OtherData: [''],
        fileInfo: ['']
      }),
      
    });

    // this.routingForm.valueChanges
    //   .subscribe(data => this.onValueChanged(data));

  }

  onValueChanged(data: any): void {
    console.log('data ', data);
  }

 onChange(event) {
    const interests = <FormArray>this.routingForm.get('WWEfeatures').get('multipleCheckBox') as FormArray;
    if (event.checked) {
      interests.push(new FormControl(event.source.value));
      this.selectedRequestType.push(event.source.value);
    } else {
      const i = interests.controls.findIndex(x => x.value === event.source.value);
      this.selectedRequestType.pop(i);
      interests.removeAt(i);
    }

    console.log('interests', interests);

  }



}
