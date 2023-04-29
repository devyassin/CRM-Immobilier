import React from "react";
import { useSelector, useDispatch } from "react-redux";
import HeaderTitle from "../../components/utils/titles/HeaderTitle";
import SearchBar from "../../components/utils/searchbar/SearchBar";
import { IconStyleOne, IconStyleTwo } from "../../components/utils/icons";
import IconDevisStyle from "../../components/utils/icons/IconDevisStyle";
import { CSVLink } from "react-csv";

import { TfiImport, TfiExport, TfiPlus } from "react-icons/tfi";
import { useEffect } from "react";
import { fetchAllDevis, setNameDevis } from "../../store/devisSlice";

const Devis = () => {
    const dispatch = useDispatch();
    const devis = useSelector((state) => state.devis.data);
    const status = useSelector((state) => state.devis.status);
    const error = useSelector((state) => state.devis.error);
    const devi = useSelector((state) => state.devis.devis);
    const searchDevis = useSelector((state) => state.devis.searchDevis);
    const title = useSelector((state) => state.selectedPage.selectedPage);
    const visibility = useSelector((state) => state.overlay.show);

    useEffect(() => {
        dispatch(fetchAllDevis(`${searchDevis}`));
    }, [searchDevis]);

    const searchDevisDispatcher = (e) => {
        let searchDevis = e.target.value;
        dispatch(setNameDevis({ searchDevis }));
    };

    if (status === "succeeded") {
        return (
            <div>
                <div className="flex items-center justify-between">
                    <HeaderTitle title="Devis" />
                    <IconDevisStyle number={devis.count} />
                </div>
                <div className="flex items-center justify-end mt-4 pr-2 space-x-4">
                    <SearchBar
                        dipatcherFunction={searchDevisDispatcher}
                        searchValue={searchDevis}
                        placeHolder="Chercher un client ..."
                    />
                   
                    <CSVLink data={devis.devis} filename="devis.csv">
                        <IconStyleOne>
                            <TfiExport size={25} />
                        </IconStyleOne>
                    </CSVLink>
                    <IconStyleTwo>
                        <TfiPlus size={25} />
                    </IconStyleTwo>
                </div>
                {/* <TableLead fields={tableLeadFields} />
                {visibility && <FormLead lead={lead} />} */}
            </div>
        );
    }
};

export default Devis;
