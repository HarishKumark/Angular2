import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormsModule, FormControl, FormArray, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Story Project';
  routingForm: FormGroup;
  showCustomPreQueueMsg = false;
  showEmergencyMsg = false;
  showNoAgentMsg = false;
  showBadWeatherMsg = false;
  bizUnit: string;
  wweFeatureJson: any;
  indexNumber = 0;
  attachmentsVal: any;
  show = false;
  size = false;
  multipleCheckBox: any;
  dispalyNameDropDown: string[];
  selectedOtherData: any;
  displayNameDynamic = [];
  fileData: File;

  requestCategory = [
    { value: '1', label: 'Voice Routing' },
    { value: '2', label: 'Digital Routing' },
    { value: '3', label: 'WWE' },
  ];

  requestType = [
    { value: '1', label: 'Existing Callflow Update' },
    { value: '2', label: 'New Callflow Setup' },
    { value: '3', label: 'WWE Configuration Change' },
  ];

  scrumteam = [
    { value: '204608674320', label: 'Rangers' },
    { value: '204666232256', label: 'OMNI Migrations and Development' },
    { value: '285399592916', label: 'Athenians' },
    { value: '340376628332', label: 'Avengers' },
    { value: '293621448956', label: 'Brave Hearts' },
    { value: '311782990368', label: 'Eagles' },
    { value: '333273433868', label: 'Express Sonics' },
    { value: '253172412312', label: 'Fast&Curious' },
    { value: '206564752148', label: 'Huskies' },
    { value: '293646063484', label: 'Mobilizers' },
    { value: '338136312220', label: 'Omni Agent WWE Intake' },
    { value: '277918126068', label: 'Omni Express' },
    { value: '323380487864', label: 'Optum' },
    { value: '253169324640', label: 'Orchestrators' },
    { value: '206574654292', label: 'Panthers' },
    { value: '299176983684', label: 'Pioneers' },
    { value: '310605609004', label: 'Serene' },
    { value: '218605761620', label: 'Spartans' },
    { value: '239168404908', label: 'Technocrats' },
    { value: '253171054396', label: 'The Code Depot' },
    { value: '323380478160', label: 'UHC' },
    { value: '96545499348', label: 'Vanguard' },
    { value: '251096380628', label: 'Warriors-Orx CS' },
  ];

  private featureValues = new Map<string, string[]>([
    ['Case Information (Iteration)', ['Caller ID', 'Unit', 'Segment', 'Function', 'CallType', 'UUID']],
    ['Case Information (Toast pop)', ['Caller Id', 'Unit']],
    ['Not Ready Reasons', ['Meeting', 'Lunch', 'Break', 'Fax', 'System Outage', 'Projetcs']],
    ['Disposition Codes', ['Accepted', 'Expired', 'Success', 'Wrong Number', 'System Outage', 'Projetcs']],
    ['Caller ID', ['SNI EI', 'SNI UHG EE ']],
    ['Screen pop', ['ISET', 'OneBreath']],
    ['Corporate Favourites', ['Pharmacy CVS Caremark',
      'Managed Health Network EAP', 'UES Survey Albuquerque', 'WF Wellness Coaching']]
  ]);

  private unitSegmentMap = new Map<string, string[]>([
    ['UHC', ['E&I', 'C&S', 'M&R', 'ProviderServices', 'SpecBen', 'NetMedTrans']],
    ['Optum', ['OptumCare', 'OptumRx', 'AARP']],
  ]);


  constructor(private fb: FormBuilder, private http: HttpClient, private dialog: MatDialog, private dateFormat: DatePipe) { }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.createForm();
    // this.http.get('https://rally1.rallydev.com/slm/webservice/v2.0/project/204608674320/health')
    //   .subscribe(
    //     data => console.log(data),
    //     err => console.log(err)
    //   );

    setTimeout((res) => {
      // tslint:disable-next-line: max-line-length
      this.multipleCheckBox = ['Case Information (Iteration)', 'Case Information (Toast pop)', 'Not Ready Reasons', 'Disposition Codes', 'Caller ID', 'Screen pop',
        'Corporate Favourites'];
    });

  }

  createForm() {
    this.routingForm = this.fb.group({
      routingDetails: this.fb.group({
        name: [''],
        founder: [''],
        selectedRequestType: [''],
        shortDescription: [''],
        callType: [''],
        skills: [''],
      }),
      preQueueDetails: this.fb.group({
        emergencyMsg: [''],
        NoAgentMsg: [''],
        customPreQueueMsg: [''],
        badWeatherMsg: [''],
      }),
      WWEfeatures: this.fb.group({
        bizUnit: ['', Validators.required],
        bizSegment: ['', Validators.required],
        ENT_DeliveryDate: ['', Validators.required],
        selectedTeam: ['', Validators.required],
        createdBy: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]*@Optum.com$')]],
        selectedValue: ['', Validators.required],
        userStoryTitle: ['', Validators.required],
        ENT_Prblm_Statement: ['', Validators.required],
        ENT_Additional_Information: ['', Validators.required],
        shortDesc1: ['', Validators.required],
        shortDesc2: ['', Validators.required],
        shortDesc3: ['', Validators.required],
        OtherData: [''],
        fileInfo: ['', Validators.required],
        displayValues: ['', Validators.required],
        wweCheckBoxValues: ['', Validators.required]
      }),
      itemRows: this.fb.array([this.initItemRows()])
    });
  }

  initItemRows() {
    return this.fb.group({
      scenerio: ['', Validators.required],
      when: ['', Validators.required],
      then: ['', Validators.required],
      given: ['', Validators.required],
      isEditable: [false, Validators.required],
      isClicked: [true, Validators.required]
    });
  }

  get formArr() {
    return this.routingForm.get('itemRows') as FormArray;
  }

  addNewRow(i: number) {
    this.indexNumber = i;
    this.formArr.push(this.initItemRows());
  }

  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }

  editRow(i: number): void {
    this.show = !this.show;
    this.formArr.at(i).patchValue({ isEditable: this.show, isClicked: false });
  }

  get targets(): FormGroup {
    return this.fb.group({
      targetName: '',
    });
  }

  get tfnLists(): FormGroup {
    return this.fb.group({
      carrier: '',
      tfn: ''
    });
  }

  addTfnList() {
    (this.routingForm.get('tfnLists') as FormArray).push(this.tfnLists);
  }

  submitForm(event) {
  }

  get bizUnits(): string[] {
    return Array.from(this.unitSegmentMap.keys());
  }

  get bizSegments(): string[] {
    return this.unitSegmentMap.get(this.routingForm.get('WWEfeatures').get('bizUnit').value);
  }

  OnChange($event) {
    if ($event.checked === true && $event.source.value === 'isCustomPreQueueMsg') {
      this.showCustomPreQueueMsg = true;
    } else if ($event.checked === false && $event.source.value === 'isCustomPreQueueMsg') {
      this.showCustomPreQueueMsg = false;
      // tslint:disable-next-line: no-string-literal
      this.routingForm.get('preQueueDetails')['controls'].customPreQueueMsg.reset();
    } else if ($event.checked === true && $event.source.value === 'isEmergencyMsg') {
      this.showEmergencyMsg = true;
    } else if ($event.checked === false && $event.source.value === 'isEmergencyMsg') {
      this.showEmergencyMsg = false;
      // tslint:disable-next-line: no-string-literal
      this.routingForm.get('preQueueDetails')['controls'].emergencyMsg.reset();
    } else if ($event.checked === true && $event.source.value === 'isBadWeatherMsg') {
      this.showBadWeatherMsg = true;
    } else if ($event.checked === false && $event.source.value === 'isBadWeatherMsg') {
      this.showBadWeatherMsg = false;
      // tslint:disable-next-line: no-string-literal
      this.routingForm.get('preQueueDetails')['controls'].badWeatherMsg.reset();
    } else if ($event.checked === true && $event.source.value === 'isNoAgentMsg') {
      this.showNoAgentMsg = true;
    } else if ($event.checked === false && $event.source.value === 'isNoAgentMsg') {
      this.showNoAgentMsg = false;
      // tslint:disable-next-line: no-string-literal
      this.routingForm.get('preQueueDetails')['controls'].NoAgentMsg.reset();
    }

  }

  wweJsonValClick(event) {
  }

  get requestCategoryVal() {
    return this.requestCategory;
  }

  openDialog(event) {
  }

  get featureValuesKey(): string[] {
    return Array.from(this.featureValues.keys());
  }

  featureValuesKeyDrop(selectedRequest): string[] {
    if (selectedRequest) {
      return this.featureValues.get(selectedRequest);
    }
  }

  remove(daata, data) {
    this.featureValues.get(data).splice(daata, 1);
  }

  otherEnteredData(data) {
    const val = this.routingForm.get('WWEfeatures').get('OtherData');
    if (val.value.length > 0) {
      const dropDownValue = this.featureValuesKeyDrop(String(data));
      dropDownValue.push(val.value + '+new');
      // this.routingForm.get('WWEfeatures').patchValue({ featureValuesKeyDropVal: val });
      this.routingForm.get('WWEfeatures').patchValue({ OtherData: '' });
    } else {
      alert('please the data.');
    }
  }

  onSelectFile(event) {
    this.size = false;
    const reader = new FileReader();
    this.fileData = event.target.files;
    // const fileInfo = event.target.files[0];
    this.routingForm.get('WWEfeatures').patchValue({ fileInfo: this.fileData });
    // this.routingForm.get('WWEfeatures').get('fileInfo').setValue(this.fileData);
    // reader.readAsDataURL(fileInfo);
    // if (fileInfo.size / 1024 / 1024 > 5) {
    //   this.size = true;
    //   return;
    // }
    // if (fileInfo) {
    //   this.fileToBase64(event, (result: any, headers: any) => {
    //     this.attachmentsVal = result;
    //   });
    // }
  }

  public fileToBase64(event, callback) {
    let url: any;
    let header: any;
    if (event.target.files && event.target.files[0]) {
      const srcFile = event.target.files[0];
      const reader = new FileReader();
      const textReader = new FileReader();
      reader.readAsDataURL(srcFile); // read file as data url
      // tslint:disable-next-line: no-shadowed-variable
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        // tslint:disable-next-line: whitespace
        url = (event.target as FileReader).result;
        const index = url.indexOf(',') + 1;
        url = url.slice(index);
        if (typeof callback === 'function') {
        }
      };
      // tslint:disable-next-line: only-arrow-functions
      textReader.onload = function () {
        header = textReader.result;
        header = header.split('\n');
        header = header[0].split('|');
        callback(url, header);
      };
      textReader.readAsText(srcFile);
    }
  }

  wweFeatureClick(formData: any) {
    if (formData) {
      const shrtDec = 'As a ' + formData.value.WWEfeatures.shortDesc1
        + ' I need ' + formData.value.WWEfeatures.shortDesc2
        + ' so that ' + formData.value.WWEfeatures.shortDesc3
        + ' ' + formData.value.WWEfeatures.ENT_Prblm_Statement
        + ' ' + formData.value.WWEfeatures.ENT_Additional_Information;

      const formDataForAPI = new FormData();
      formDataForAPI.append('name', shrtDec);
      // tslint:disable-next-line: max-line-length
      formDataForAPI.append('c_DeliverBy', this.dateFormat.transform(this.routingForm.get('WWEfeatures').get('ENT_DeliveryDate').value, 'yyyy/MM/dd'));
      formDataForAPI.append('scrumTeam', this.routingForm.get('WWEfeatures').get('selectedTeam').value);
      formDataForAPI.append('createdBy', this.routingForm.get('WWEfeatures').get('createdBy').value);
      formDataForAPI.append('c_AcceptanceCriteria', JSON.stringify(formData.value.itemRows));
      formDataForAPI.append('userStoryTitle', formData.value.WWEfeatures.userStoryTitle);
      this.createWWEFeature(formDataForAPI);
    }
  }

  createWWEFeature(formDataForAPI) {
    const body = new FormData();
    body.append('file', this.fileData);
    body.append('c_AcceptanceCriteria', formDataForAPI.get('c_AcceptanceCriteria'));
    body.append('c_DeliverBy', formDataForAPI.get('c_DeliverBy'));
    body.append('createdBy', formDataForAPI.get('createdBy'));
    body.append('scrumTeam', formDataForAPI.get('scrumTeam'));
    body.append('description', formDataForAPI.get('name'));
    body.append('userStory', formDataForAPI.get('userStoryTitle'));
    body.append('name', '');
    body.append('notes', '');
    body.append('dynamicSelect', this.selectedOtherData);
    body.append('project', '/project/' + formDataForAPI.get('createdBy'));
    console.log('data sending -> ', body);
    this.http.post('http://localhost:8080/create', body).subscribe(
      (res) => {
        console.log('res --- ', res);
      }, (err) => {
        console.log(err);
      });
  }

  validateCreatedBy() {
  }

  testVal(data) {
    this.selectedOtherData = '';
    if (data.checked) {
      this.selectedOtherData = data.source.value;
    }
  }

  onChangeForVal(event) {
    const val = event.source.value;
    if (event.checked) {
      this.displayNameDynamic.push(val);
      this.dispalyNameDropDown = this.featureValuesKeyDrop(String(val));
    } else {
      const i = this.displayNameDynamic.indexOf(val);
      this.displayNameDynamic.splice(i, 1);
    }
  }

  deleteEnteredData() {
  }

}
