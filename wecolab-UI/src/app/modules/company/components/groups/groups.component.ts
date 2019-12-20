import { Component, OnInit, ViewChild } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ConfirmationDialogService } from '../../services/confirmation-dialog.service';
import { ChattingService } from 'src/app/modules/chatroom/Shared/chatting.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  constructor(private groupService: GroupService, private fb: FormBuilder,private confirmDialog:ConfirmationDialogService,private chatService:ChattingService) { }
  groups: any[];
  createNewGroupForm: FormGroup;
  public loadContent: boolean = false;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  ngOnInit() {
    this.getData(); // call service here

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.setForm();
    this.chatService.allGroupsBehavior.subscribe((data) => {
      this.groups = data;
    })
  }


  public setForm() {
    this.createNewGroupForm = this.fb.group({
      groupName: [''],
      description: [''],
      members: [this.dropdownList]
    });
    this.loadContent = true;
  }
  get groupName() { return this.createNewGroupForm.get('groupName'); }
  get description() { return this.createNewGroupForm.get('description'); }
  get members() { return this.createNewGroupForm.get('members'); }
  // get f() { return this.form.controls; }

  public save() {
    console.log(this.createNewGroupForm.value);
  }

  public resetForm() {
    this.setForm();
  }

  public onItemSelect(item: any) {
    console.log(item);
    console.log(this.createNewGroupForm.value);
  }
  public onDeSelect(item: any) {
    console.log(item);
  }

  public onSelectAll(items: any) {
    console.log(items);
  }
  public onDeSelectAll(items: any) {
    console.log(items);
  }

  onCreate() {
    this.groupService.createGroup(this.createNewGroupForm.value).subscribe(
      data =>
      {
        console.log(data);
      }
    )
  }

  getData() {
    let tmp = [];
    this.groupService.getGroups().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        tmp.push({ item_id: i, item_text: data[i].email });
      }
      this.groups = data;
      this.dropdownList = tmp;
    });
  }

  deleteGroup()
  {
    this.confirmDialog.confirm('Confirm Deletion', 'Are you sure you want to remove this employee ?')
    .then((confirmed) => 
    {
     
      if(confirmed===true)
      {
        this.groupService.removeGroup().subscribe(
          data =>{
            console.log(data);
          }
        )
      }
      else
      {
        console.log("clicked cancel");
      }
    })
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }
}
