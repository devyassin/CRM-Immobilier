import React from "react";
import { useSelector, useDispatch } from "react-redux";
import HeaderTitle from "../../components/utils/titles/HeaderTitle";
import SearchBar from "../../components/utils/searchbar/SearchBar";
import FormClient from "../../components/utils/form/FormClient";
import { IconStyleOne, IconStyleTwo } from "../../components/utils/icons";

import { TfiImport, TfiExport, TfiPlus } from "react-icons/tfi";
import TableOne from "../../components/utils/tables/TableOne";
import { useEffect } from "react";
import {
    fetchAllClients,
    fetchOneClient,
    addClient,
} from "../../store/clientSlice";
import IconUserStyle from "../../components/utils/icons/IconUserStyle";

const Clients = () => {
    const dispatch = useDispatch();
    const clients = useSelector((state) => state.clients.data);
    const status = useSelector((state) => state.clients.status);
    const error = useSelector((state) => state.clients.error);
    const client = useSelector((state) => state.clients.client);
    const searchClient = useSelector((state) => state.clients.searchClient);
    // const client = {
    //     nom: "hamid",
    //     prenom: "Cartwright",
    //     type: "Big company",
    //     tel: "+1-608-665-7593",
    //     address: "90612 Richard Loaf\nKaseyberg, NV 64191",
    //     email: "hamid88@yahoo.com",
    //     last_contacted: "2023-03-08 20:17:28",
    //     user_id: 1,
    // };

    useEffect(() => {
        dispatch(fetchAllClients(`${searchClient}`));
    }, [dispatch, searchClient]);

    console.log("clients---------------1");

    const title = useSelector((state) => state.selectedPage.selectedPage);
    const visibility = useSelector((state) => state.overlay.show);

    if (status === "loading") {
        return (
            <div>
                <div className="flex items-center justify-between">
                    <HeaderTitle title={title} />
                    <IconUserStyle number={clients.count} />
                </div>

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
                <div className="flex items-center justify-center mt-40">
                    <div class="loading-spinner"></div>
                </div>
            </div>
        );
    }

    if (status === "failed") {
        return <div>Error: {error}</div>;
    }

    if (status === "succeeded") {
        return (
            <div>
                <div className="flex items-center justify-between">
                    <HeaderTitle title={title} />
                    <IconUserStyle number={clients.count} />
                </div>

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
                {visibility && <FormClient client={client} />}
            </div>
        );
    }
};

export default Clients;
