import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DashboardService } from '../dashboard/dashboard.service';
import {MasterData, SearchRequest, ForecastingInfo, MappingColumnDef} from '../model/projectInfo';
//import { Workbook } from 'exceljs';
import * as Excel from 'exceljs/dist/exceljs.min.js';
import * as XLSX  from 'xlsx';
import * as fsaver from 'file-saver';
import { DatePipe, JsonPipe } from '@angular/common';
import { Config } from '../common/config';
import { HttpEventType } from '@angular/common/http';
import {ExcelService} from '../common/service/excelService'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  //styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private _dashboardService: DashboardService, 
              private _config : Config,
              private datePipe: DatePipe,
              private _excelService: ExcelService
              ){};
  masterData:MasterData = new MasterData();
  searchRequest:SearchRequest = new SearchRequest();
  columnHeader:object[];
  columns:MappingColumnDef[] = [];
  columnsProps:string[];
  forecastInfo:ForecastingInfo[];
   wsheet:object[];
  wbook:[];
  accountDataObject:object[];
  selectedFile=null;
  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();
  ngOnInit(): void {
    debugger;
    console.log("dashboard");
  };
  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }

    //let fileToUpload = <File>files[0];
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    let url = this._config.forecastingUrl + "/uploadinfo";
    this._dashboardService.uploadFiles(formData).subscribe(event => {
       if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * event.loaded / event.total);
      else if (event.type === HttpEventType.Response) {
        this.message = 'Upload success.';
        this.onUploadFinished.emit(event.body);
      }
    });
  }
  
  onUpload(event)
  {     
    debugger; 
    const accountData = [];
    const associateData = [];
    const allocationData = [];
    
    const workbook = new Excel.Workbook();   
      
        const target: DataTransfer = <DataTransfer>(event.target);
        if (target.files.length !== 1) {
          throw new Error('Cannot use multiple files');
        }      
        var name  = target.files[0].name; 
        const arryBuffer = new Response(target.files[0]).arrayBuffer();          
        arryBuffer.then(function (data) {                
            workbook.xlsx.load(data)
            .then(function () { 
              debugger;           
              const accountSheet = workbook.getWorksheet("AccountInfo"); 
              
              accountSheet.eachRow(                              
                function (accountrow) {  
                  debugger;                 
                  accountData.push(accountrow.values);                 
              });   
              debugger;            
              //const localaccountDataObject = XLSX.utils.sheet_to_json(accountSheet); 
              // const associateSheet = workbook.getWorksheet("Users");  
                  
              //  associateSheet.eachRow(                              
              //   function (associaterow) {                   
              //     associateData.push(associaterow.values);  
              // }); 

              // const allocationSheet = workbook.getWorksheet("ProjectAllocation");          
              //  allocationSheet.eachRow(                              
              //   function (allocationrow) {                   
              //     allocationData.push(allocationrow.values);    
              // }); 
                       
            });            
        }); 
        debugger;         
        //this.accountDataObject = XLSX.utils.sheet_to_json(accountData);
        debugger;
        this.accountDataObject = accountData; 
        // this.masterData.AccountData = accountData;    
        // this.masterData.AssociateData = associateData;    
        // this.masterData.AllocationData = allocationData;  
             
               // console.log("masterdata",this.masterData);
  };

 
  uploadData()
  {
    debugger;    
   // this.masterData.Foo="bar";
    this._dashboardService.uploadProjectInfo(this.accountDataObject);
    //this._dashboardService.uploadInfo();
  }
  generateForecastingData()
  {
    this.searchRequest.MonthYear = new Date("2020/03/01");
    this._dashboardService.getForecastData(this.searchRequest).subscribe(res =>{       
       this.forecastInfo = res;
       console.log(this.forecastInfo);
       this._excelService.exportJsonAsExcelFile(this.forecastInfo,"Forecasting_Details");
    });
  }
  generateBillingData()
  {
    this.searchRequest.MonthYear = new Date("2020/03/01");
    this._dashboardService.getBillingData(this.searchRequest).subscribe(res =>{              
       console.log(res);
       this._excelService.exportJsonAsExcelFile(res,"Billing_Details");
    });
  }
  generateExcel() {
    this.searchRequest.MonthYear = new Date("2020/03/01");
    this._dashboardService.getForecastData(this.searchRequest).subscribe(res =>{
       debugger;
       this.forecastInfo = res;
       console.log(this.forecastInfo);
    //})
   
    //Excel Title, Header, Data
    const title = 'Forecasting Mar 2020';
    const header = ["Year", "Month", "Make", "Model", "Quantity", "Pct"]
    this.columnHeader = res;
    let index = 0;
    this.columns = [];
    for (let item in this.columnHeader[0]) {
      let column: MappingColumnDef = new MappingColumnDef();
      column.name = item;
      //var isStaticColumn = this.stickyColList.filter(col => col.toLowerCase() == column.name.toLowerCase())[0];
      column.index = index;
      this.columns.push(column);
      index = index + 1;
    }
    this.columnsProps = this.columns.filter(ix => ix.index >=0).map((column: MappingColumnDef) => column.name);
    // const data = [
    //   [2007, 1, "Volkswagen ", "Volkswagen Passat", 1267, 10],
    //   [2007, 1, "Toyota ", "Toyota Rav4", 819, 6.5],
    //   [2007, 1, "Toyota ", "Toyota Avensis", 787, 6.2],
    //   [2007, 1, "Volkswagen ", "Volkswagen Golf", 720, 5.7],
    //   [2007, 1, "Toyota ", "Toyota Corolla", 691, 5.4],
    //   [2007, 1, "Peugeot ", "Peugeot 307", 481, 3.8],
    //   [2008, 1, "Toyota ", "Toyota Prius", 217, 2.2],
    //   [2008, 1, "Skoda ", "Skoda Octavia", 216, 2.2],
    //   [2008, 1, "Peugeot ", "Peugeot 308", 135, 1.4],
    //   [2008, 2, "Ford ", "Ford Mondeo", 624, 5.9],
    //   [2008, 2, "Volkswagen ", "Volkswagen Passat", 551, 5.2],
    //   [2008, 2, "Volkswagen ", "Volkswagen Golf", 488, 4.6],
    //   [2008, 2, "Volvo ", "Volvo V70", 392, 3.7],
    //   [2008, 2, "Toyota ", "Toyota Auris", 342, 3.2],
    //   [2008, 2, "Volkswagen ", "Volkswagen Tiguan", 340, 3.2],
    //   [2008, 2, "Toyota ", "Toyota Avensis", 315, 3],
    //   [2008, 2, "Nissan ", "Nissan Qashqai", 272, 2.6],
    //   [2008, 2, "Nissan ", "Nissan X-Trail", 271, 2.6],
    //   [2008, 2, "Mitsubishi ", "Mitsubishi Outlander", 257, 2.4],
    //   [2008, 2, "Toyota ", "Toyota Rav4", 250, 2.4],
    //   [2008, 2, "Ford ", "Ford Focus", 235, 2.2],
    //   [2008, 2, "Skoda ", "Skoda Octavia", 225, 2.1],
    //   [2008, 2, "Toyota ", "Toyota Yaris", 222, 2.1],
    //   [2008, 2, "Honda ", "Honda CR-V", 219, 2.1],
    //   [2008, 2, "Audi ", "Audi A4", 200, 1.9],
    //   [2008, 2, "BMW ", "BMW 3-serie", 184, 1.7],
    //   [2008, 2, "Toyota ", "Toyota Prius", 165, 1.6],
    //   [2008, 2, "Peugeot ", "Peugeot 207", 144, 1.4]
    // ];

   const forecastData =[
      {project:"DE - Pricing Fees and Adder",monthYear:"2-2020",vendor:"Cognizant",costcenter:"test",workDayID:"test",resourceName:"Govindaraj,Baalaji Peedampalli",dtsOwner:"test",purchaseOrderNo:"1",group:"DEB",location:"Offshore",hours:"160.0",rate:"30.0",totalAmount:"4800.0",validationComments:"test"},
      {project:"DE - Pricing Fees and Adder",monthYear:"2-2020",vendor:"Cognizant",costcenter:"test",workDayID:"test",resourceName:"Amarnath",dtsOwner:"tet",purchaseOrderNo:"1",group:"DEB",location:"Offshore",hours:"160.0",rate:"29.0",totalAmount:"4640.0",validationComments:"Working days is not updated for Location - Offshore, No leave reported by associate"}
    ]
    //Create workbook and worksheet
    let workbook = new Excel.Workbook();
    let worksheet = workbook.addWorksheet('Forecast');
    //Add Row and formatting
    let titleRow = worksheet.addRow([title]);
    titleRow.font = { name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true }
    worksheet.addRow([]);
    let subTitleRow = worksheet.addRow(['Date : ' + this.datePipe.transform(new Date(), 'medium')])
  
    //Add Image
    // let logo = workbook.addImage({
    //   base64: logoFile.logoBase64,
    //   extension: 'png',
    // });
    // worksheet.addImage(logo, 'E1:F3');
    worksheet.mergeCells('A1:D2');
    //Blank Row 
    worksheet.addRow([]);
    //Add Header Row
    //let headerRow = worksheet.addRow(this.columnsProps);
    
    // Cell Style : Fill and Border
    // headerRow.eachCell((cell, number) => {
    //   cell.fill = {
    //     type: 'pattern',
    //     pattern: 'solid',
    //     fgColor: { argb: 'FFFFFF00' },
    //     bgColor: { argb: 'FF0000FF' }
    //   }
    //   cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    // })
    debugger;
    worksheet.addRow(this.forecastInfo)
     // forecastData.forEach(row =>{
    //     debugger;
    //     worksheet.addRow(row);
    // });
    debugger;
    let nthrow = worksheet.getRow(7)
    console.log(nthrow.values)
    // worksheet.addRows(data);
    // Add Data and Conditional Formatting
    // this.forecastInfo.forEach(d => {      
    //   let row = worksheet.addRow(d);
    //   let qty = row.getCell(5);
    //   let color = 'FF99FF99';
    //   if (+qty.value < 500) {
    //     color = 'FF9999'
    //   }
    //   qty.fill = {
    //     type: 'pattern',
    //     pattern: 'solid',
    //     fgColor: { argb: color }
    //   }
    // }
    // );
    worksheet.getColumn(3).width = 30;
    worksheet.getColumn(4).width = 30;
    worksheet.addRow([]);
    //Footer Row
    let footerRow = worksheet.addRow(['This is system generated excel sheet.']);
    footerRow.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFCCFFE5' }
    };
    footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    //Merge Cells
    worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);
    //Generate Excel File with given name
    debugger;
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fsaver.saveAs(blob, 'Forecasting_Mar2020.xlsx');
    })
  })
  }
}
