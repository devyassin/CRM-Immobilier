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
    { name: "Dashboard", path: "/dashboard", icon: <CiUser size={30} /> },
    {
        name: "Menu Layout",
        path: "/menu",
        icon: <CiDeliveryTruck size={30} />,
    },
    { name: "Inbox", path: "/inbox", icon: <CiBitcoin size={30} /> },
    { name: "File Manager", path: "/file", icon: <CiAlarmOn size={30} /> },
    {
        name: "Point of sale",
        path: "/point",
        icon: <CiCircleList size={30} />,
    },
    { name: "chat", path: "/chat", icon: <CiChat1 size={30} /> },
    { name: "post", path: "/post", icon: <CiBag1 size={30} /> },
    { name: "Calander", path: "/calander", icon: <CiCalendar size={30} /> },
];
