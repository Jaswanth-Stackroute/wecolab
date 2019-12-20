export class ExcelData {
    companyId:string;
    companyName:string;
    emailId:string;
    Users: number;
    registeredOn:Date;
    constructor(companyId:string,
        companyName:string,
        emailId:string,
        Users:number,
        registeredOn:Date)
        {
            this.companyId=companyId;
            this.companyName=companyName;
            this.emailId=emailId;
            this.Users=Users;
            this.registeredOn=registeredOn;
        }
}
