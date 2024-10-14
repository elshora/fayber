interface NavComponentProps {
  title: string;
  target: string;
  Icon?: any;
  classes?: string;
  disabled?: boolean;
}
interface RootLayoutProps {
  children: React.ReactNode;
  params: { lng: string };
}
interface LanguageToggleProps {
  lng: string;
}
type JobTitle = "project_manager" | "inventory_manager";
interface StaffMember {
  picture_url: string;
  id?: string | number;
  picture?: File;
  username: string;
  first_name: string;
  second_name: string;
  phone_number: string;
  address: string;
  roles?: string;
  job_title: JobTitle;
  age?: number;
  academic_qualifications?: string;
  graduation_year?: string;
  university?: string;
  current_position?: string;
  previous_job?: string;
  national_id_number?: string;
  salary?: number;
  additional_information?: string;
}
interface UserRole {
  id?: string | number;
  name: string;
  permissions: string;
  type: string;
}
interface Product {
  id: string;
  productName: string;
  nameInArabic: string;
  productCode: string;
  unit: string;
  unitInArabic: string;
  category: string;
  more?: string;
}
interface ProductDetails {
  category_name_ar: string;
  category_name_en: string;
  product_code: string;
  product_name_ar: string;
  product_name_en: string;
  unit_name_ar: string;
  unit_name_en: string;
}
interface Project {
  id: string;
  project_name: string;
  staff_id: string;
  inventory_id: string;
  start_date: Date | undefined;
  location: string;
}
interface Category {
  category_id: string;
  category_name_en: string;
  category_name_ar: string;
}
interface Unit {
  unit_id: string | number;
  unit_name_ar: string;
  unit_name_en: string;
}
interface Store {
  id: string;
  inventory_name: string;
  store_manager: string;
  location: string;
  phone_number: string;
}
interface Task {
  id: string | number;
  manager_name?: string;
  task_body: string;
  start_date: Date | undefined;
  end_date: Date | undefined;
}
// interface Order {
//   id: string | Number;
//   projectName: string;
//   product: string;
//   amount: string;
//   address: string;
//   store: string;
//   status: string;
// }
interface VerifyOrderData {
  id: number;
  store_id?: number;
  state?: number;
  source?: string;
  count?: number;
}

interface InventoryOrders {
  id: number;
  inventoryName: string;
  from: string;
  address: string;
  amount: number;
  product: string;
  status: string;
}
interface Order {
  id: number;
  projectName: string;
  product: string;
  amount: string;
  address: string;
  store: string;
  status: string;
}

interface Contractor {
  id: string;
  contractor_name: string;
  first_name: string;
  last_name: string;
}
interface Pagination {
  pageNumber: string;
  pageSize: string;
  total: number;
}
interface OrderData {
  records: Order[];
  pagination: Pagination;
}
interface ConvenantUser {
  academic_qualifications: string;
  additional_information: string;
  address: string;
  age: number;
  client_id: string;
  covenant_details: CovenantsDetails;
  created_at: string;
  current_position: string;
  first_name: string;
  graduation_year: string;
  id: string;
  job_title: string;
  last_login_ts: string;
  national_id_number: string;
  password: string;
  phone_number: string;
  picture_url: string;
  previous_job: string;
  roles: string;
  salary: number;
  second_name: string;
  university: string;
  username: string;
}
interface CovenantsDetails {
  approved: number;
  client_id: string;
  id: number;
  note: string;
  notified: number;
  original_cash: number;
  received_date: string;
  reminder_cash: number;
  staff_id: string;
}
interface StaffData {
  id: string;
  client_id: string;
  username: string;
  password: string;
  created_at: string;
  last_login_ts: string;
  first_name: string;
  second_name: string;
  phone_number: string;
  address: string;
  job_title: string;
  roles: string;
  picture_url: string;
  age: number;
  academic_qualifications: string;
  graduation_year: string;
  university: string;
  current_position: string;
  previous_job: string;
  national_id_number: string;
  salary: number;
  additional_information: string;
}

interface CovenantDetails {
  id: string;
  client_id: string;
  original_cash: number;
  reminder_cash: number;
  approved: number;
  notified: number;
  note: string;
  received_date: string;
  staff_data: StaffData;
  expenses_details: any[];
  first_name: string;
  second_name: string;
  phone_number: string;
}
interface Contractors {
  account_number: string;
  additional_information: string;
  address: string;
  age: string;
  client_id: string;
  commercial_register: string;
  created_at: string;
  id: string;
  name: string;
  national_number: string;
  payment_method: string;
  tax_card: string;
}
interface Inventory {
  client_id: string;
  id: string;
  inventory_name: string;
  location: string;
  phone_number: string;
  staff_id: string;
}

interface Order {
  cancelled: any;
  client_id: string;
  contractor: string;
  created_at: string;
  created_by: string;
  id: string;
  inventory: Inventory;
  inventory_id: number;
  order_note: string;
  ordered_products: { product_code: string; quantity: string }[] | any; // Adjust type as needed based on actual data
  project: Project;
  project_id: number;
  state: string;
  tracking: string;
  type: string;
  user_type: string;
  stores: string[];
  project: { project_name: string };
  status: any;
  to_inventory: ToInventory;
}
interface ToInventory {
  client_id: string;
  id: number;
  inventory_name: string;
  location: string;
  phone_number: string;
  staff_id: string;
}

interface InventoryOrder {
  cancelled: null | string;
  client_id: string;
  created_at: string;
  created_by: string;
  from_inventory: Record<string, any>; // Adjust type as needed based on actual data
  from_inventory_id: null | number;
  id: number;
  order_note: string;
  ordered_products: { product_code: string; quantity: string }[] | any; // Adjust type as needed based on actual data
  to_inventory: ToInventory;
  to_inventory_id: number;
  tracking: null | string;
  user_type: "admin" | "user"; // Adjust enum as needed
  status: string;
  state: string;
  stores: string[];
  project: { project_name: string };
}
interface ProjectDetails {
  id: number;
  client_id: number;
  inventory_id: number;
  staff_id: number;
  project_name: string;
  location: string;
  start_date: string; // Assuming date is in ISO format string
  end_date: string; // Assuming date is in ISO format string
  state: string;
}

interface TransactionDetails {
  id: number;
  cash_id: number; // The covenant id
  amount: number; // The amount spent
  transaction: string; // Description of the transaction
  type: "payment" | "refund"; // Type of the transaction
  note: string; // Notes about the transaction
  receipt_url: string; // URL for the receipt
  transaction_date: string; // Assuming date is in ISO format string
  project_details: ProjectDetails; // Project details
}
