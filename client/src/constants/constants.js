import {
    CiCalendar,
    CiBag1,
    CiChat1,
    CiCircleList,
    CiAlarmOn,
    CiBitcoin,
    CiDeliveryTruck,
    CiUser,
} from "react-icons/ci";
export const categories = [
    { name: "Dashboard", icon: <CiUser size={30} /> },
    { name: "Menu Layout", icon: <CiDeliveryTruck size={30} /> },
    { name: "Inbox", icon: <CiBitcoin size={30} /> },
    { name: "File Manager", icon: <CiAlarmOn size={30} /> },
    { name: "Point of sale", icon: <CiCircleList size={30} /> },
    { name: "chat", icon: <CiChat1 size={30} /> },
    { name: "post", icon: <CiBag1 size={30} /> },
    { name: "Calander", icon: <CiCalendar size={30} /> },
];
