import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import {ChattingService} from '../../chatroom/Shared/chatting.service';

export class JwtResponse {
  constructor(
    public jwtToken: string,
    public daoUser: User,
  ) { }

}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  errorData: { errorTitle: string; errorDesc: string; };

  constructor(private httpClient: HttpClient, private chatService: ChattingService) { }
  authenticate(username: string, password: string) {
    return this.httpClient.post<any>(environment.userServiceURL + 'api/v1/authenticate', { username, password }).pipe
      (
        map(userData => {
          sessionStorage.setItem('username', username);
          let tokenStr = 'Bearer ' + userData.token;
          let daoUser = userData.daoUser;
          sessionStorage.setItem('token', tokenStr);
          sessionStorage.setItem('user', JSON.stringify(userData.daoUser));
          sessionStorage.setItem('name', userData.daoUser.firstName + " " + userData.daoUser.lastName)
          console.log(userData.token);
          return daoUser;

          //console.log(userData.daoUser.emailId);
        },
          catchError(this.handleError)
        )
      )
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username');
    if (user === null) {
      return false;
    }
    return true;
  }

  logOut() {
    this.chatService.disconnect();
    sessionStorage.removeItem('username');
    console.log(JSON.parse(sessionStorage.getItem('user')));
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('token');
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {

      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {

      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }

    // return an observable with a user-facing error message
    this.errorData = {
      errorTitle: 'Oops! Request for document failed',
      errorDesc: 'Something bad happened. Please try again later.'
    };
    return throwError(this.errorData);
  }
}
