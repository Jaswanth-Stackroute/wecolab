import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExcelServicesService } from '../../services/excel-services.service';
import { Chart } from 'chart.js';
import { User } from 'src/app/models/user';
import { AdminService } from '../../services/admin.service';
import { ExcelData } from 'src/app/models/excel-data';

export interface UserLength {
  [key: string]: number;
}
@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})

export class GoalsComponent implements OnInit {
  ownerData: User[];
  excelData = [];

  title = 'excel-upload-download';
  LineChart = [];
  Line1Chart = [];
  jan: number = 0;
  feb: number = 0;
  march: number = 0;
  april: number = 0;
  may: number = 0;
  june: number = 0;
  july: number = 0;
  aug: number = 0;
  sep: number = 0;
  oct: number = 0;
  nov: number = 0;
  dec: number = 0;
  jan1: number = 0;
  feb1: number = 0;
  march1: number = 0;
  april1: number = 0;
  may1: number = 0;
  june1: number = 0;
  july1: number = 0;
  aug1: number = 0;
  sep1: number = 0;
  oct1: number = 0;
  nov1: number = 0;
  dec1: number = 0;
  companyData: any[];


  myhash = new Map();

  ngOnInit() {

    this.getAllCompanyInfo();


  }


  constructor(private excelService: ExcelServicesService, private http: HttpClient, private adminService: AdminService) {

  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.excelData, 'Wecolab');
  }

  totalCompany: number;
  getAllCompanyInfo() {
    let temp = [];
    return this.adminService.getAllCompany().subscribe(
      (data: any) => {
        this.ownerData = data;
        this.totalCompany = this.ownerData.length;
        // this.owner = this.companyData[0].daouser;
        // console.log(this.companyData[['daouser']]);
        console.log(this.ownerData);
        //console.log(this.ownerData[1].company.registeredOn.getMonth());
        for (let t = 0; t < data.length; t++) {
          console.log(this.ownerData[t]['company']['id']);
          this.adminService.getEmployeesByCompanyId(this.ownerData[t]['company']['id']).subscribe(
            (data1) => {
              //console.log(this.ownerData[t]['company']['id']);
              console.log(data1[0]);
              console.log("length:" + data1.length);
              this.myhash.set(this.ownerData[t]['company']['companyId'], data1.length);
              console.log(this.ownerData[t]['company']['companyId'] + ":" + this.myhash[this.ownerData[t]['company']['companyId']]);

            }
          )
          temp.push(this.ownerData[t]['company']);
          if (this.ownerData[t].enabled) {

            switch ((new Date(this.ownerData[t]['company']['registeredOn']).getMonth() + 1)) {
              case 1:
                // this.jan=this.jan1+this.myhash[this.ownerData[t]['company']['companyId']];
                this.jan++;
                break;
              case 2:
                // this.feb=this.feb1+this.myhash[this.ownerData[t]['company']['companyId']];
                this.feb++;
                break;
              case 3:
                // this.march=this.march1+this.myhash[this.ownerData[t]['company']['companyId']];
                this.march++;
                break;
              case 4:
                // this.april=this.april1+this.myhash[this.ownerData[t]['company']['companyId']];
                this.april++;
                break;
              case 5:
                //  this.may=this.may1+this.myhash[this.ownerData[t]['company']['companyId']];
                this.may++;
                break;
              case 6:
                // this.june=this.june1+this.myhash[this.ownerData[t]['company']['companyId']];
                this.june++;
                break;
              case 7:
                // this.july=this.july1+this.myhash[this.ownerData[t]['company']['companyId']];
                this.july++
                break;
              case 8: this.aug++;
                //  this.aug=this.aug+this.myhash[this.ownerData[t]['company']['companyId']];
                break;
              case 9:
                //  this.sep=this.sep+this.myhash[this.ownerData[t]['company']['companyId']];
                this.sep++;
                break;
              case 10:
                //  this.oct=this.oct+this.myhash[this.ownerData[t]['company']['companyId']];
                this.oct++;
                break;
              case 11:
                //  this.nov=this.nov+this.myhash[this.ownerData[t]['company']['companyId']];
                this.nov++;
                break;
              case 12:
                //  this.dec=this.dec+this.myhash[this.ownerData[t]['company']['companyId']];
                this.dec++;
                // console.log("dec:"+this.dec1);
                // console.log(this.myhash[this.ownerData[t]['company']['companyId']])
                break;
            }
          }
        }
        this.drawLineChart();
        console.log(temp);
        this.companyData = temp;

        // this.drawLineChart();
        // this.drawline1Chart();

        // let newDate = new Date(temp[0]['registeredOn']);
        //console.log(new Date().getMonth());



        // this.generateExcelData();

      }

    )


  }


  drawLineChart() {
    this.LineChart = new Chart('lineChart', {
      type: 'line',
      data: {
        labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
          label: 'Number of Company registerd in a month',
          data: [this.jan, this.feb, this.march, this.april, this.may, this.june, this.july, this.aug, this.sep, this.oct, this.nov, this.dec],
          fill: false,
          lineTension: 0.2,
          borderColor: "red",
          borderWidth: 1,

        }]
      },
      options: {
        title: {
          text: "Companies Registered (verified) In A Month",
          display: true,
          responsive: true,
          maintainAspectRatio: false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  // drawline1Chart(){
  //   this.Line1Chart = new Chart('line1Chart', {
  //     type: 'line',
  //     data: {
  //       labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
  //       datasets: [{
  //         label: 'Number of Users registerd in a month',
  //         data: [this.jan1, this.feb1, this.march1, this.april1, this.may1, this.june1, this.july1, this.aug1, this.sep1, this.oct1, this.nov1, this.dec1],
  //         //  data:[1,2,3,1,1,1,1,1,1,1,1,1],
  //         fill: false,
  //         lineTension: 0.2,
  //         borderColor: "blue",
  //         borderWidth: 1,

  //       }]
  //     },
  //     options: {
  //       title: {
  //         text: "Users Registered In A Month",
  //         display: true,
  //         responsive: true,
  //         maintainAspectRatio: false
  //       },
  //       scales: {
  //         yAxes: [{
  //           ticks: {
  //             beginAtZero: true
  //           }
  //         }]
  //       }
  //     }
  //   });
  // }



  generateExcelData() {
    // console.log(this.companyData[0]['companyId']);
    for (let t = 0; t < this.ownerData.length; t++) {
      if (this.ownerData[t].enabled) {
        this.excelData.push(new ExcelData(this.companyData[t]['companyId'], this.companyData[t]['companyName'], this.ownerData[t]['emailId'], this.companyData[t]['Users'], this.companyData[t]['registeredOn']));

      }
    }

    //this.excelData=this.companyData;
    //console.log(this.excelData); 
  }

  // generateChartData() {
  //   console.log(this.ownerData.length)
  //   for (let t = 0; t < this.ownerData.length; t++) {
  //     if (this.ownerData[t].enabled) {

  //       switch ((new Date(this.ownerData[t]['company']['registeredOn']).getMonth() + 1)) {
  //         case 1:
  //           // this.jan=this.jan1+this.myhash[this.ownerData[t]['company']['companyId']];
  //           this.jan++;
  //           break;
  //         case 2:
  //           // this.feb=this.feb1+this.myhash[this.ownerData[t]['company']['companyId']];
  //           this.feb++;
  //           break;
  //         case 3:
  //           // this.march=this.march1+this.myhash[this.ownerData[t]['company']['companyId']];
  //           this.march++;
  //           break;
  //         case 4:
  //           // this.april=this.april1+this.myhash[this.ownerData[t]['company']['companyId']];
  //           this.april++;
  //           break;
  //         case 5:
  //           //  this.may=this.may1+this.myhash[this.ownerData[t]['company']['companyId']];
  //           this.may++;
  //           break;
  //         case 6:
  //           // this.june=this.june1+this.myhash[this.ownerData[t]['company']['companyId']];
  //           this.june++;
  //           break;
  //         case 7:
  //           // this.july=this.july1+this.myhash[this.ownerData[t]['company']['companyId']];
  //           this.july++
  //           break;
  //         case 8: this.aug++;
  //           //  this.aug=this.aug+this.myhash[this.ownerData[t]['company']['companyId']];
  //           break;
  //         case 9:
  //           //  this.sep=this.sep+this.myhash[this.ownerData[t]['company']['companyId']];
  //           this.sep++;
  //           break;
  //         case 10:
  //           //  this.oct=this.oct+this.myhash[this.ownerData[t]['company']['companyId']];
  //           this.oct++;
  //           break;
  //         case 11:
  //           //  this.nov=this.nov+this.myhash[this.ownerData[t]['company']['companyId']];
  //           this.nov++;
  //           break;
  //         case 12:
  //           //  this.dec=this.dec+this.myhash[this.ownerData[t]['company']['companyId']];
  //           this.dec++;
  //           // console.log("dec:"+this.dec1);
  //           // console.log(this.myhash[this.ownerData[t]['company']['companyId']])
  //           break;
  //       }
  //     }
  //     this.drawLineChart();

  //   }
  // }

}
