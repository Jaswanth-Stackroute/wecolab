export class Contact
{
    EmailId:string;
    FirstName:string;
    LastName:string;
    phone:string;
    issue:string;
    Message:string;

    constructor(
        EmailId:string,
        FirstName:string,
        LastName:string,
        phone:string,
        issue:string,
        Message:string,
    )
    {
        this.EmailId=EmailId;
        this.FirstName=FirstName;
        this.LastName=LastName;
        this.phone=phone;
        this.issue=issue;
    }
}
