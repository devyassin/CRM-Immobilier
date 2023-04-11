import React from "react";
import { useSelector, useDispatch } from "react-redux";
import HeaderTitle from "../../components/utils/titles/HeaderTitle";
import SearchBar from "../../components/utils/searchbar/SearchBar";
import FormClient from "../../components/utils/form/FormClient";
import { IconStyleOne, IconStyleTwo } from "../../components/utils/icons";
import { TfiImport, TfiExport, TfiPlus } from "react-icons/tfi";
import TableOne from "../../components/utils/tables/TableOne";

const Clients = () => {
    const title = useSelector((state) => state.selectedPage.selectedPage);
    const visibility = useSelector((state) => state.overlay.show);

    return (
        <div>
            <HeaderTitle title={title} />
            <div className="flex space-x-4 items-center justify-end">
                <SearchBar />
                <IconStyleOne>
                    <TfiExport size={25} />
                </IconStyleOne>
                <IconStyleOne>
                    <TfiImport size={25} />
                </IconStyleOne>
                <IconStyleTwo>
                    <TfiPlus size={25} />
                </IconStyleTwo>
            </div>
            <TableOne />
            {visibility && <FormClient />}
        </div>
    );
};

export default Clients;
