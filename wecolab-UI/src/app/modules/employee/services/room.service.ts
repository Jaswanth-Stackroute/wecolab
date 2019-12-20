import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "src/environments/environment";
@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private _http:HttpClient) { }

  private _url_userData: string = environment.userServiceURL+'api/v1/user/getUserByCompanyId?id=';
  private _url_saveRoom: string = environment.roomServiceURL+"api/v1/saveRoomAndUsers";
  // private _url_postRoomId: string = environment.roomAddressServiceURL+"saveroomLink";
  private _url_userRoomInfo: string = environment.roomServiceURL +"api/v1/getRoomParticipantByUserId/";
  private _url_postRoomDatawithUserEmails: string = environment.emailNotificationServiceURL+"notification";
  private _url_deleteRoomById: string = environment.roomServiceURL+"api/v1/deleteRoom/";
  private _url_companyRoomInfo: string = environment.roomServiceURL+"api/v1/getRoomParticipantByCompanyId/";


  getAllUsersOfCompany(companyId){
    // let companyId = "1234";
    return this._http.get(this._url_userData+companyId);
  }

  createRoom(roomData){
    return this._http.post(this._url_saveRoom, roomData[0]);
  }

  // createRoomLink(roomId) {
  //   var formattedRoomId= {
  //       "data": {
  //         "roomId": roomId 
  //       }
  //   }

  //   return this._http.post(this._url_postRoomId, formattedRoomId);
  // }

  getUserRoomInfo(userId){
    return this._http.get(this._url_userRoomInfo+userId);
  }

  getCompanyRoomInfo(companyId){
    return this._http.get(this._url_companyRoomInfo+companyId);
  }

  createRoomDataWithUserEmails(RoomDataWithUserEmails){
    return this._http.post(this._url_postRoomDatawithUserEmails, RoomDataWithUserEmails[0]);
  }

  deleteRoomById(roomId){
    return this._http.delete(this._url_deleteRoomById + roomId);
  }
}
