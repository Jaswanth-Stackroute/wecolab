export class Company {
    companyId: string;
    companyName: string;
    emailId: string;
    firstName: string;
    lastName: string;
    phone: string;
    password: string
    constructor(
        companyId: string,
        companyName: string,
        emailId: string,
        firstName: string,
        lastName: string,
        phone: string,
        password: string
    ) {
        this.companyId = companyId;
        this.companyName = companyName;
        this.emailId = emailId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.password = password;
    }
}
