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
    {
        name: "Tableau de bord",
        hover: "/dashboard",
        path: "/dashboard",
        icon: <FaChartPie size={25} />,
    },
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
    { name: "Devis", path: "/devis", icon: <FaFileContract size={23} /> },
    { name: "Bon de visite", path: "/bons", icon: <FaPaste size={23} /> },
    {
        name: "Facture",
        path: "/facture",
        icon: <FaFileInvoiceDollar size={23} />,
    },
    {
        name: "Transaction",
        path: "/transactions",
        icon: <FaDollarSign size={23} />,
    },
    { name: "Calendrier", path: "/calander", icon: <FaRegCalendar size={23} /> },
    { name: "Rendez-vous", path: "/calander", icon: <FaPhoneAlt size={23} /> },
];

export const URL = "http://127.0.0.1:8000";
