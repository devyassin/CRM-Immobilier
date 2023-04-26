import {
    FaChartPie,
    FaUsers,
    FaUserPlus,
    FaBuilding,
    FaTasks,
    FaFileContract,
    FaPaste,
    FaFileInvoiceDollar,
    FaDollarSign,
    FaPhoneAlt,
    FaRegCalendar,
} from "react-icons/fa";

export const categories = [
    { name: "Dashboard", path: "/dashboard", icon: <FaChartPie size={25} /> },
    {
        name: "Clients",
        path: "/clients",
        icon: <FaUsers size={25} />,
    },
    { name: "Prospect", path: "/leads", icon: <FaUserPlus size={25} /> },
    { name: "Biens", path: "/biens", icon: <FaBuilding size={22} /> },
    {
        name: "Taches",
        path: "/taches",
        icon: <FaTasks size={22} />,
    },
    { name: "Devis", path: "/chat", icon: <FaFileContract size={23} /> },
    { name: "Bon de visite", path: "/post", icon: <FaPaste size={23} /> },
    { name: "Facture", path: "/post", icon: <FaFileInvoiceDollar size={23} /> },
    { name: "Transaction", path: "/post", icon: <FaDollarSign size={23} /> },
    { name: "Calander", path: "/calander", icon: <FaRegCalendar size={23} /> },
    { name: "Rendez-vous", path: "/calander", icon: <FaPhoneAlt size={23} /> },
];
