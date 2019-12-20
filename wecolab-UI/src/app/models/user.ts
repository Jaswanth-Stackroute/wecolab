export class User {
    userId?: any;
    emailId: string;
    firstName: string;
    lastName: string;
    phone: string;
    profilePic?: File
    password: string;
    role?: string;
    enabled?: boolean;
    constructor(emailId: string, firstName: string, lastName: string, phone: string, profilePic: File, password: string) {
        this.emailId = emailId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.profilePic = profilePic;
        this.password = password;
    }
}
