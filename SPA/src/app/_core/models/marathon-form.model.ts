export interface Marathon_Form {
  record_ID: number;
  full_Name: string;
  date_Of_Birth: string | Date;
  gender: boolean;
  address: string;
  phone_Number: string;
  email_Address: string;
  from_Time: string | Date;
  to_Time: string | Date;
  distance: number;
  created_Time: string;
  created_By: string;
  updated_Time: string | null;
  updated_By: string;
  status: boolean;
}