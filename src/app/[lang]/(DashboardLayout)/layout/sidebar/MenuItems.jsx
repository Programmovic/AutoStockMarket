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
  IconSettings,
  IconCoinEuro,
  IconMessageChatbot,
  IconExchange,
  IconUser,
  IconGardenCart,
  IconWaterpolo,
  IconDashboard
} from "@tabler/icons-react";
import { TfiDashboard } from "react-icons/tfi";
import { FaExchangeAlt } from "react-icons/fa";
import { GiMoneyStack, GiMechanicGarage, GiTakeMyMoney   } from "react-icons/gi";
import { FaCalendarDays, FaCoins,FaUsers   } from "react-icons/fa6";
import { HiMiniIdentification } from "react-icons/hi2";
import { BiSolidCarMechanic } from "react-icons/bi";
import { IoCalendar } from "react-icons/io5";
import { BsBank2 } from "react-icons/bs";
import { RiTodoLine } from "react-icons/ri";
import { RiExternalLinkLine } from "react-icons/ri";
import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: TfiDashboard,
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
    title: "Transactions",
    icon: FaExchangeAlt,
    href: "/SalesManagment/Transactions",
    translatedTitle: "ملف 1 - يومية",
  },
  {
    id: uniqueId(),
    title: "Daily Transactions",
    icon: FaCalendarDays,
    href: "/SalesManagment/DailyTransactions",
    translatedTitle: "ملف 1 - يومية",
  },
  {
    id: uniqueId(),
    title: "Income",
    icon: FaCoins,
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
    title: "Expenses",
    icon: GiMoneyStack,
    href: "/SalesManagment/Expenses",
    translatedTitle: "ملف 2 - المصروفات",
  },
  {
    id: uniqueId(),
    title: "Maintenance",
    icon: GiMechanicGarage,
    href: "/SalesManagment/Maintenance",
    translatedTitle: "ملف 2 - الصيانة",
  },
  {
    id: uniqueId(),
    title: "External Car Maintenance",
    icon: BiSolidCarMechanic,
    href: "/SalesManagment/ExternalCarMaintenance",
    translatedTitle: "ملف 2 - صيانة السيارات في المعرض",
  },
  {
    navlabel: true,
    subheader: "Customer Management",
  },
  {
    id: uniqueId(),
    title: "Customers",
    icon: FaUsers,
    href: "/CustomerManagement/Customers",
    translatedTitle: "ملف 1 - ديون المعرض",
  },
  {
    id: uniqueId(),
    title: "Exhibition Debts",
    icon: GiTakeMyMoney,
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
    icon: HiMiniIdentification,
    href: "/EmployeeManagement/Employees",
    translatedTitle: "ملف 1 - حضور وغياب الموظفين",
  },
  {
    id: uniqueId(),
    title: "Employee Attendance",
    icon: IoCalendar,
    href: "/EmployeeManagement/EmployeeAttendance",
    translatedTitle: "ملف 1 - حضور وغياب الموظفين",
  },
  {
    id: uniqueId(),
    title: "Employee Salaries",
    icon: BsBank2,
    href: "/EmployeeManagement/EmployeeSalary",
    translatedTitle: "ملف 1 - رواتب الموظفين",
  },
  {
    navlabel: true,
    subheader: "Reports and Analytics",
  },
  {
    id: uniqueId(),
    title: "Fixed Expenses",
    icon: RiTodoLine,
    href: "/ReportsAndAnalytics/FixedExpenses",
    translatedTitle: "ملف 1 - المصروفات الثابتة",
  },
  {
    id: uniqueId(),
    title: "Exhibition Expenses",
    icon: RiExternalLinkLine,
    href: "/ReportsAndAnalytics/ExhibitionExpenses",
    translatedTitle: "ملف 2 - مصروف المعرض",
  },
  {
    id: uniqueId(),
    title: "Recoveries",
    icon: RiTodoLine,
    href: "/ReportsAndAnalytics/Recoveries",
    translatedTitle: "ملف 2 - مصروف المعرض",
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
