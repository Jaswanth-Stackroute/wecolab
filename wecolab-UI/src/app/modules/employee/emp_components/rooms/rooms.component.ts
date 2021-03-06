import { Component, OnInit } from '@angular/core';
import {RoomService} from '../../services/room.service'; 
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})

export class RoomsComponent implements OnInit {
  roomName: any;
  roomDesc: any;
  model: any;
  roomId;
  time = {hour: 13, minute: 30};
  meridian = true;
  user_data: any;
  dropdownList = [];
  dropdownSettings = {};
  selectedItems = [];
  selectedEmails = [];
  RoomData = [];
  RoomDataWithUserEmails = [];
  userRoomData:any = [];
  singleRoomData = {};
  buttonDisable: any = [];
  disableDeleteButton:any = [];
  currentUserInfo: any;
  disableCreateButton: any = true;
  companyUserInfo:any;

  // if(this.roomDesc && this.roomName && this.model && this.time){
  //   this.disableCreateButton = false;
  // }
  constructor(private service: RoomService, private router: Router, private toaster:ToastrService) {}

  ngOnInit() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.currentUserInfo = JSON.parse(sessionStorage.getItem("user"));
    this.companyUserInfo = JSON.parse(window.localStorage.getItem('userList'));
    console.log(this.currentUserInfo);
    this.service.getUserRoomInfo(this.currentUserInfo.userId).subscribe(data=>{
      console.log(data);
      this.userRoomData = data;
      for(let i=0;i<this.userRoomData.length;i++){
        console.log(i);
        if(this.userRoomData[i].adminId == this.currentUserInfo.userId){
          console.log("ayush true",this.userRoomData[i].adminId);
          console.log("ayush true",this.currentUserInfo.userId);
          this.disableDeleteButton[i] = false;
          // this.buttonDisable = this.checkJoinTime(this.singleRoomData["sqlDate"], this.singleRoomData["sqlTime"]);
          // var joinButton = <HTMLInputElement>document.getElementById("joinButton");
          // joinButton.disabled = true; 
        }
        else
        {
          console.log("ayush false",this.userRoomData[i].adminId);
          console.log("ayush false",this.currentUserInfo.userId);
          this.disableDeleteButton[i] = true;
          // this.buttonDisable = this.checkJoinTime(this.singleRoomData["sqlDate"], this.singleRoomData["sqlTime"]);
          // var joinButton = <HTMLInputElement>document.getElementById("joinButton");
          // joinButton.disabled = true; 
        }
        for(let k=0;k<this.companyUserInfo.length;k++){
          if(this.userRoomData[i].adminId == this.companyUserInfo[k]["id"]){
            console.log("praveen");
            this.userRoomData[i]["createdUserName"] = this.companyUserInfo[k]["name"];
          }
        }
        console.log("Calling checkJoinTime");
        this.buttonDisable[i] = this.checkJoinTime(this.userRoomData[i]["sqlDate"], this.userRoomData[i]["sqlTime"]);
        console.log("After Calling checkJoinTime");
        console.log(this.buttonDisable);
      }
    });
  }

  onItemSelect(item: any) {
    this.selectedItems.push(item["item_id"]);
    this.selectedEmails.push(item["item_text"]);
  }
  onSelectAll(items: any) {
    this.selectedItems = [];
    for(let i=0; i<this.dropdownList.length; i++){
      this.selectedItems.push(this.dropdownList[i]["item_id"]);
      this.selectedEmails.push(this.dropdownList[i]["item_text"]);
    }
  }
  onDeSelect(item: any){
    const index = this.selectedItems.indexOf(item);
    if (index > -1) {
      this.selectedItems.splice(index, 1);
      this.selectedEmails.splice(index, 1);
    }
  }
  onDeSelectAll(item: any){
    this.selectedItems = null;
    this.selectedEmails = null;
  }
  getAllUsersOfCompany(){
    this.service.getAllUsersOfCompany(this.currentUserInfo.company.id).subscribe(data => {
      this.user_data = data;
      let tmp = [];
      for (let i = 0; i < this.user_data.length; i++) {
        tmp.push({ item_id: this.user_data[i]["id"], item_text: this.user_data[i]["email"] });
      }
      console.log("lohani2280", tmp);
      tmp = tmp.filter(e =>  e.item_text !== this.currentUserInfo.emailId);
      this.dropdownList = tmp;
    })
  }
  createRoom(){
    console.log(this.roomName);
    console.log(this.roomDesc);
    console.log(this.model);
    console.log(this.time);
    console.log(this.selectedItems);
    let acceptedDateFormat = this.model["year"] + "-" + this.model["month"] + "-" + this.model["day"];
    let acceptedTimeFormat = this.time["hour"] + ":" + this.time["minute"] + ":" + "00";
    this.selectedItems.push(this.currentUserInfo.userId);
    this.RoomData.push({
        "adminId": this.currentUserInfo.userId,
        "companyId": this.currentUserInfo.company.id,
        "agenda": this.roomDesc,
        "name": this.roomName,
        "sqlDate": acceptedDateFormat,
        "sqlTime": acceptedTimeFormat,
        "uIds" : this.selectedItems
      });
    
    this.RoomDataWithUserEmails.push({
      "roomCreator": this.currentUserInfo.emailId,
      "roomDescription": this.roomDesc,
      "roomName": this.roomName,
      "date": acceptedDateFormat,
      "time": acceptedTimeFormat,
      "emails" : this.selectedEmails
      });

    this.service.createRoom(this.RoomData).subscribe(data => {
      console.log(data);
      this.roomId = data["id"];
      this.userRoomData.push({
        "adminId": this.currentUserInfo.userId,
        "companyId": this.currentUserInfo.company.id,
        "agenda": this.roomDesc,
        "name": this.roomName,
        "sqlDate": acceptedDateFormat,
        "sqlTime": acceptedTimeFormat,
        "uIds" : this.selectedItems,
        "url": data["url"],
        "roomUser": data["roomUser"],
        "createdUserName": this.currentUserInfo.firstName+ " " + this.currentUserInfo.lastName
      });
      this.buttonDisable.push(true);
      console.log(this.roomId);
      this.service.createRoomDataWithUserEmails(this.RoomDataWithUserEmails).subscribe(data2 => {
        console.log(data2);
      });
      this.roomName = null;
      this.roomDesc = null;
      this.time = {hour: 13, minute: 30};
      this.selectedItems = [];
      // this.selectedEmails = [];
      this.model = [];
      this.onDeSelectAll(this.selectedItems);
      console.log(this.selectedItems);
      this.disableCreateButton = true;
    });
  }

  checkJoinTime(sqlDate, sqlTime){
    var meetingtime = new Date(sqlDate + ' ' + sqlTime).valueOf();
    var presentTime = new Date().valueOf();
    console.log("ayush12345");
    console.log(meetingtime, presentTime);
    if(meetingtime <= presentTime)
      return false;
    else{
      return true;
    }
  }

  getRoomDetails(roomName){
    console.log(roomName);
    for(let i=0;i<this.userRoomData.length;i++){
      if(this.userRoomData[i].name == roomName){
        this.singleRoomData = this.userRoomData[i];
        let userList = JSON.parse(window.localStorage.getItem('userList'));
        console.log(this.singleRoomData);
        console.log("lohani2280", userList);
        this.singleRoomData["roomUserName"] = [];
        for(let j=0;j<this.singleRoomData["roomUser"].length;j++){
          for(let k=0;k<userList.length;k++){
            if(this.singleRoomData["roomUser"][j] == userList[k]["id"]){
              console.log("finally", userList[k]["name"]);
              this.singleRoomData["roomUserName"].push(userList[k]["name"]);
            }
          }
        }
      }
    }
  }
  deleteRoomById(roomId){
    console.log("heyya");
    this.userRoomData = this.userRoomData.filter(e =>  e.id !== roomId);
    this.service.deleteRoomById(roomId).subscribe(data => {
      console.log(data);
    });;
  }
  async validateForm(){
    await new Promise(resolve => setTimeout(resolve, 500));
    let invalidDate = 1;
    let date = Date();
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    console.log(dd,mm,yyyy);
    console.log(this.model["day"],this.model["month"],this.model["year"]);
    if(this.model["day"]<dd || this.model["month"]<mm || this.model["year"]<yyyy){
      console.log("true");
      this.toaster.error("Choose valid date");
      invalidDate = 0;
    }
    console.log(this.roomDesc, this.roomName, this.model);
    if(this.roomDesc==null || this.roomName==null  || this.model==null || invalidDate==0){
      this.disableCreateButton = true;
    }
    else{
      this.disableCreateButton = false;
    }
  }
  onNavigate(roomUrl){
    window.open(roomUrl, "_blank");
  }
}