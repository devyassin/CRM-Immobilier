import React from "react";
import { useSelector, useDispatch } from "react-redux";
import HeaderTitle from "../../components/utils/titles/HeaderTitle";
import SearchBar from "../../components/utils/searchbar/SearchBar";
import FormClient from "../../components/utils/form/FormClient";
import { IconStyleOne, IconStyleTwo } from "../../components/utils/icons";
import { TfiImport, TfiExport, TfiPlus } from "react-icons/tfi";
import TableOne from "../../components/utils/tables/TableOne";
import { useEffect } from "react";
import { fetchAllClients, fetchOneClient } from "../../store/clientSlice";
import axios from "axios";

const Clients = () => {
    const dispatch = useDispatch();
    const clients = useSelector((state) => state.clients.data);
    const status = useSelector((state) => state.clients.status);
    const error = useSelector((state) => state.clients.error);

    useEffect(() => {
        // dispatch(fetchAllClients());
        dispatch(fetchOneClient(2));
    }, [dispatch]);

    console.log(clients);

    const title = useSelector((state) => state.selectedPage.selectedPage);
    const visibility = useSelector((state) => state.overlay.show);

    return (
        <div>
            <HeaderTitle title={title} />
            <div className="flex items-center justify-end space-x-4">
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
