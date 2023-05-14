import React from "react";
import { useSelector, useDispatch } from "react-redux";
import HeaderTitle from "../../components/utils/titles/HeaderTitle";
import SearchBar from "../../components/utils/searchbar/SearchBar";
import { IconStyleOne, IconStyleTree } from "../../components/utils/icons";
import IconFactureStyle from "../../components/utils/icons/IconFactureStyle";
import { CSVLink } from "react-csv";
import TableFacture from "../../components/utils/tables/TableFacture";
import { tableFactureFields } from "../../constants/tablesConstants";
import { TfiExport, TfiPlus } from "react-icons/tfi";
import { useEffect } from "react";
import {
    fetchAllFacture,
    setNameFacture,
    fetchOneFacture,
} from "../../store/factureSlice";

import { fetchAllBiens } from "../../store/bienSlice";

const Facture = () => {
    const dispatch = useDispatch();
    const factures = useSelector((state) => state.factures.data);
    const status = useSelector((state) => state.factures.status);
    const error = useSelector((state) => state.factures.error);
    const facture = useSelector((state) => state.factures.facture);
    const searchFacture = useSelector((state) => state.factures.searchFacture);
    const title = useSelector((state) => state.selectedPage.selectedPage);
    const visibility = useSelector((state) => state.overlay.show);

    useEffect(() => {
        dispatch(fetchAllFacture(`${searchFacture}`));
    }, [searchFacture]);

    useEffect(() => {
        dispatch(fetchAllBiens(["", "", "", "", "", "", "nonlocal"]));
    }, []);

    const searchFactureDispatcher = (e) => {
        let searchFacture = e.target.value;
        dispatch(setNameFacture({ searchFacture }));
    };

    if (status === "loading") {
        return (
            <div>
                <div className="flex items-center justify-between">
                    <HeaderTitle title={title} />
                    <IconFactureStyle number={factures.count} />
                </div>
                <div className="flex items-center justify-end mt-4 pr-2 space-x-4">
                    <SearchBar
                        dipatcherFunction={searchFactureDispatcher}
                        searchValue={searchFacture}
                        placeHolder="Chercher un client ..."
                    />

                    <IconStyleOne>
                        <TfiExport size={25} />
                    </IconStyleOne>

                    <IconStyleTree route="/facture/FormFacture">
                        <TfiPlus size={25} />
                    </IconStyleTree>
                </div>
                <div className="flex items-center justify-center mt-40">
                    <div class="loading-spinner"></div>
                </div>
            </div>
        );
    }

    if (status === "succeeded") {
        console.log(factures);
        return (
            <div>
                <div className="flex items-center justify-between">
                    <HeaderTitle title={title} />
                    <IconFactureStyle number={factures.count} />
                </div>
                <div className="flex items-center justify-end mt-4 pr-2 space-x-4">
                    <SearchBar
                        dipatcherFunction={searchFactureDispatcher}
                        searchValue={searchFacture}
                        placeHolder="Chercher un client ..."
                    />

                    <CSVLink data={factures.factures} filename="devis.csv">
                        <IconStyleOne>
                            <TfiExport size={25} />
                        </IconStyleOne>
                    </CSVLink>
                    <IconStyleTree route="/facture/FormFacture">
                        <TfiPlus size={25} />
                    </IconStyleTree>
                </div>
                <TableFacture fields={tableFactureFields} />
            </div>
        );
    }
};

export default Facture;
