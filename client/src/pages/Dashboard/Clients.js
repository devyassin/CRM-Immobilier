import React from "react";
import { useSelector, useDispatch } from "react-redux";
import HeaderTitle from "../../components/utils/titles/HeaderTitle";
import SearchBar from "../../components/utils/searchbar/SearchBar";
import FormClient from "../../components/utils/form/FormClient";
import { IconStyleOne, IconStyleTwo } from "../../components/utils/icons";
import { tableClientFields } from "../../constants/tablesConstants";

import { CSVLink } from "react-csv";

import { TfiImport, TfiExport, TfiPlus } from "react-icons/tfi";
import TableOne from "../../components/utils/tables/TableOne";
import { useEffect } from "react";
import { fetchAllClients, setNameClient } from "../../store/clientSlice";
import IconUserStyle from "../../components/utils/icons/IconUserStyle";
import CopyRight from "../../components/utils/Copyright/CopyRight";

const Clients = () => {
    const dispatch = useDispatch();
    const clients = useSelector((state) => state.clients.data);
    const status = useSelector((state) => state.clients.status);
    const error = useSelector((state) => state.clients.error);
    const client = useSelector((state) => state.clients.client);
    const searchClient = useSelector((state) => state.clients.searchClient);
    const title = useSelector((state) => state.selectedPage.selectedPage);
    const visibility = useSelector((state) => state.overlay.show);

    useEffect(() => {
        dispatch(fetchAllClients(`${searchClient}`));
    }, [searchClient]);

    const searchClientDispatcher = (e) => {
        let searchClient = e.target.value;
        dispatch(setNameClient({ searchClient }));
    };

    

    if (status === "loading") {
        return (
            <div>
                <div className="flex items-center justify-between">
                    <HeaderTitle title={title} />
                    <IconUserStyle number={clients.count} />
                </div>

                <div className="flex items-center justify-end space-x-4">
                    <SearchBar
                        dipatcherFunction={searchClientDispatcher}
                        searchValue={searchClient}
                        placeHolder="Chercher un client ..."
                    />
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
                {visibility && <FormClient client={client} />}
            </div>
        );
    }

    // if (status === "failed") {
    //     return <div>Error: {error}</div>;
    // }

    if (status === "succeeded") {
        return (
            <div>
                <div className="flex items-center justify-between">
                    <HeaderTitle title={title} />
                    <IconUserStyle number={clients.count} />
                </div>

                <div className="flex items-center justify-end space-x-4">
                    <SearchBar
                        dipatcherFunction={searchClientDispatcher}
                        searchValue={searchClient}
                        placeHolder="Chercher un client ..."
                    />
                    <CSVLink data={clients.clients} filename="clients.csv">
                        <IconStyleOne>
                            <TfiExport size={25} />
                        </IconStyleOne>
                    </CSVLink>
                    <IconStyleOne>
                        <TfiImport size={25} />
                    </IconStyleOne>
                    <IconStyleTwo>
                        <TfiPlus size={25} />
                    </IconStyleTwo>
                </div>
                <TableOne fields={tableClientFields} />
                {visibility && <FormClient client={client} />}
                <div className="mt-20 text-[12px]">
                    <CopyRight />
                </div>
            </div>
        );
    }
};

export default Clients;
