export class MasterData{
  // AccountData:object[];
  // AssociateData:object[];
  // AllocationData:object[];
  Foo :string;
  }
  export class SearchRequest{
    
        MonthYear :Date;
    }

    export class MappingColumnDef
    {
      name: string;
      description: string;
      index: number;
      isSticky: boolean;
    }
    export class ForecastingInfo
    {
        Project:string;
        MonthYear:string;
        Vendor:string;
        Costcenter :string;
        WorkDayID :number;
        ResourceName :string;
        DTSOwner :string;
        PurchaseOrderNo :string;
        Group :string;
        Location :string;
        Hours :number;
        Rate :number;
        TotalAmount :number;
        ValidationComments :string;
    }
  export class User
  {
    AssociateID :string;
    AssociateName :string;
    MiddlName :string;
    LastName :string;
    ClientWorkDayID:string;
    Region:string;
    Location:string;
    Geography:string;
    isDeleted:string;
    CreatedBy:string;  

  }
  export class ProjectAllocation
  {

  }
  export class AccountInfo
  {
      AccountName :string;
      ESA_ProjectName :string
      ESA_ProjectID:string
      ESA_Project_StartDate:Date
      ESA_Project_EndDate:Date
      Client_ProjectCode :string;
      Client_CostCenter :string;
      DTS_Owner:string;
      Funding_Type:string;
      Customer_Name:string;
      Customer_Address:string;
      SOW_ID :string;
      SOW_StartDate :Date;
      SOW_EndDate:Date;
      CR_ID:string;
      CR_StartDate:Date;
      CR_EndDate:Date;
      PO_ID:string;
    
  }