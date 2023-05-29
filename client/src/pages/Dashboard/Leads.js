import React from "react";
import { useSelector, useDispatch } from "react-redux";
import HeaderTitle from "../../components/utils/titles/HeaderTitle";
import SearchBar from "../../components/utils/searchbar/SearchBar";
import { IconStyleOne, IconStyleTwo } from "../../components/utils/icons";
import TableLead from "../../components/utils/tables/TableLead";
import { tableLeadFields } from "../../constants/tablesConstants";
import { CSVLink } from "react-csv";
import FormLead from "../../components/utils/form/FormLead";
import { TfiImport, TfiExport, TfiPlus } from "react-icons/tfi";

import { useEffect } from "react";
import { fetchAllLeads, setNameLead } from "../../store/leadSlice";
import IconUserStyle from "../../components/utils/icons/IconUserStyle";
import CopyRight from "../../components/utils/Copyright/CopyRight";

const Leads = () => {
    const dispatch = useDispatch();
    const leads = useSelector((state) => state.leads.data);
    const status = useSelector((state) => state.leads.status);
    const error = useSelector((state) => state.leads.error);
    const lead = useSelector((state) => state.leads.lead);
    const searchLead = useSelector((state) => state.leads.searchLead);
    const title = useSelector((state) => state.selectedPage.selectedPage);
    const visibility = useSelector((state) => state.overlay.show);

    useEffect(() => {
        dispatch(fetchAllLeads(`${searchLead}`));
    }, [searchLead]);

    const searchLeadDispatcher = (e) => {
        let searchLead = e.target.value;
        dispatch(setNameLead({ searchLead }));
    };

    if (status === "loading") {
        return (
            <div>
                <div className="flex items-center justify-between">
                    <HeaderTitle title={title} />
                    <IconUserStyle number={leads.count} />
                </div>
                <div className="flex items-center justify-end space-x-4">
                    <SearchBar
                        dipatcherFunction={searchLeadDispatcher}
                        searchValue={searchLead}
                        placeHolder="Chercher un prospect ..."
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
                {visibility && <FormLead lead={lead} />}
            </div>
        );
    }

    if (status === "succeeded") {
        return (
            <div>
                <div className="flex items-center justify-between">
                    <HeaderTitle title={title} />
                    <IconUserStyle number={leads.count} />
                </div>
                <div className="flex items-center justify-end space-x-4">
                    <SearchBar
                        dipatcherFunction={searchLeadDispatcher}
                        searchValue={searchLead}
                        placeHolder="Chercher un prospect ..."
                    />
                    <CSVLink data={leads.leads} filename="prospects.csv">
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
                <TableLead fields={tableLeadFields} />
                {visibility && <FormLead lead={lead} />}
                <div className="mt-20 text-[12px] ">
                    <CopyRight />
                </div>
            </div>
        );
    }

    if (status === "failed") {
        return (
            <div>
                <div className="flex items-center justify-between">
                    <HeaderTitle title={title} />
                    <IconUserStyle number={leads.count} />
                </div>
                <div className="flex items-center justify-end space-x-4">
                    <SearchBar
                        dipatcherFunction={searchLeadDispatcher}
                        searchValue={searchLead}
                        placeHolder="Chercher un prospect ..."
                    />
                    <CSVLink data={leads.leads} filename="prospects.csv">
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
                <div className="flex items-center justify-center mt-40">
                    <div class="text-3xl text-red-500">
                        Tu peux pas supprimer ce prospect
                    </div>
                </div>
            </div>
        );
    }
};

export default Leads;
