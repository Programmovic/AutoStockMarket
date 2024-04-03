import { MoneyOff } from "@mui/icons-material";
import { iconButtonClasses } from "@mui/material";
import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus,
  IconCar,
  IconMoneybag,
  IconCoinMonero,
  IconReport,
  IconFileInvoice,
  IconVector,
  IconCoinEuro,
  IconMessageChatbot,
  IconExchange,
  IconUser,
  IconGardenCart,
  IconWaterpolo,
  IconDashboard
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconDashboard,
    href: "/",
    translatedTitle: "ملف 2 - السيارات",
  },
  {
    navlabel: true,
    subheader: "Cars Inventory",
  },
  {
    id: uniqueId(),
    title: "Cars",
    icon: IconCar,
    href: "/CarsInventory/Cars",
    translatedTitle: "ملف 2 - السيارات",
  },
  {
    id: uniqueId(),
    title: "Sold Cars",
    icon: IconCar,
    href: "/CarsInventory/SoldCars",
    translatedTitle: "ملف 2 - المباعة",
  },
  {
    navlabel: true,
    subheader: "Sales Management",
  },
  {
    id: uniqueId(),
    title: "Daily Transactions",
    icon: IconMoneybag,
    href: "/SalesManagment/DailyTransactions",
    translatedTitle: "ملف 1 - يومية",
  },
  {
    id: uniqueId(),
    title: "Income",
    icon: IconCoinMonero,
    href: "/SalesManagment/Income",
    translatedTitle: "ملف 1 - المدخول",
  },
  {
    id: uniqueId(),
    title: "Daily Reports",
    icon: IconReport,
    href: "/SalesManagment/DailyReports",
    translatedTitle: "ملف 1 - تقارير يومية",
  },
  {
    id: uniqueId(),
    title: "Invoices",
    icon: IconFileInvoice,
    href: "/SalesManagment/Invoices",
    translatedTitle: "ملف 1 - الفواتير",
  },
  {
    id: uniqueId(),
    title: "Inventory Management",
    icon: IconVector,
    href: "/utilities/shadow",
    translatedTitle: "ملف 2 - إدارة المخزون",
  },
  {
    id: uniqueId(),
    title: "Expenses",
    icon: IconCoinEuro,
    href: "/SalesManagment/Expenses",
    translatedTitle: "ملف 2 - المصروفات",
  },
  {
    id: uniqueId(),
    title: "Maintenance",
    icon: IconMessageChatbot,
    href: "/SalesManagment/Maintenance",
    translatedTitle: "ملف 2 - الصيانة",
  },
  {
    id: uniqueId(),
    title: "Exhibition Car Maintenance",
    icon: IconExchange,
    href: "/SalesManagment/ExhibitionCarMaintenance",
    translatedTitle: "ملف 2 - صيانة السيارات في المعرض",
  },
  {
    navlabel: true,
    subheader: "Customer Management",
  },
  {
    id: uniqueId(),
    title: "Exhibition Debts",
    icon: IconMoneybag,
    href: "/CustomerManagement/ExhibitionDebts",
    translatedTitle: "ملف 1 - ديون المعرض",
  },
  {
    navlabel: true,
    subheader: "Employee Management",
  },
  {
    id: uniqueId(),
    title: "All Employees",
    icon: IconUser,
    href: "/EmployeeManagement/Employees",
    translatedTitle: "ملف 1 - حضور وغياب الموظفين",
  },
  {
    id: uniqueId(),
    title: "Employee Attendance",
    icon: IconUser,
    href: "/EmployeeManagement/EmployeeAttendance",
    translatedTitle: "ملف 1 - حضور وغياب الموظفين",
  },
  {
    id: uniqueId(),
    title: "Employee Salaries",
    icon: IconMoneybag,
    href: "/EmployeeManagement/EmployeeSalary",
    translatedTitle: "ملف 1 - رواتب الموظفين",
  },
  {
    navlabel: true,
    subheader: "Document Management",
  },
  {
    id: uniqueId(),
    title: "Jalal Decor",
    icon: IconReport,
    href: "/utilities/shadow",
    translatedTitle: "ملف 2 - زينة جالل",
  },
  {
    navlabel: true,
    subheader: "Reports and Analytics",
  },
  {
    id: uniqueId(),
    title: "Fixed Expenses",
    icon: IconMoneybag,
    href: "/ReportsAndAnalytics/FixedExpenses",
    translatedTitle: "ملف 1 - المصروفات الثابتة",
  },
  {
    id: uniqueId(),
    title: "Exhibition Expenses",
    icon: IconMoneybag,
    href: "/ReportsAndAnalytics/ExhibitionExpenses",
    translatedTitle: "ملف 2 - مصروف المعرض",
  },
  {
    id: uniqueId(),
    title: "Recoveries",
    icon: IconMoneybag,
    href: "/ReportsAndAnalytics/Recoveries",
    translatedTitle: "ملف 2 - مصروف المعرض",
  },
  {
    navlabel: true,
    subheader: "Quick Links to other sections/pages",
  },
  {
    id: uniqueId(),
    title: "External Car Maintenance",
    icon: IconCar,
    href: "/utilities/shadow",
    translatedTitle: "ملف 2 - صيانة السيارات الخارجية",
  },
  {
    id: uniqueId(),
    title: "Vehicle Maintenance",
    icon: IconCar,
    href: "/utilities/shadow",
    translatedTitle: "ملف 2 - صيانة المركبات",
  },
  {
    id: uniqueId(),
    title: "Precision Garage",
    icon: IconGardenCart,
    href: "/utilities/shadow",
    translatedTitle: "ملف 2 - كراج الدقة",
  },
  {
    id: uniqueId(),
    title: "Garages and Car Washes",
    icon: IconWaterpolo,
    href: "/utilities/shadow",
    translatedTitle: "ملف 2 - كراجات ومغاسل السيارات",
  },
  {
    id: uniqueId(),
    title: "Recoveries",
    icon: IconMoneybag,
    href: "/utilities/shadow",
    translatedTitle: "ملف 2 – التعويضات",
  },
  {
    id: uniqueId(),
    title: "External Debts",
    icon: IconMoneybag,
    href: "/utilities/shadow",
    translatedTitle: "ملف 2 - الديون الخارجية",
  },
];

// Function to add language prefix to hrefs
function localizeMenuItems(langCode) {
  return Menuitems.map(item => {
    // Check if item has an 'href' property
    if (item.href) {
      // Prepend the language code to the 'href' if langCode is not empty
      const updatedHref = langCode ? `/${langCode}${item.href}` : item.href;
      return { ...item, href: updatedHref };
    }
    // Return item as is if there's no 'href'
    return item;
  });
}
// Export the localized menu items
export default localizeMenuItems;