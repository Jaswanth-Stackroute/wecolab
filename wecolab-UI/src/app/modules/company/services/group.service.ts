import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ChattingService } from '../../chatroom/Shared/chatting.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private _http:HttpClient,private chatservice:ChattingService) {
    
   }

  getGroups()
  {
    return this._http.get<any>(environment.chatServiceURL+'user');
  }
  getGroupMembers(groupId)
  {
    return this._http.get<any>(environment.chatServiceURL+'users'+groupId);
  }

  createGroup(groupData)
  {
    console.log(groupData);
    return this._http.post("",groupData);
  }

  removeGroup()
  {
    return this._http.delete("");
  }
}
