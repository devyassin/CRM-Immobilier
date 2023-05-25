import React from "react";
import { useSelector, useDispatch } from "react-redux";
import HeaderTitle from "../../components/utils/titles/HeaderTitle";
import SearchBar from "../../components/utils/searchbar/SearchBar";
import { IconStyleOne, IconStyleTree } from "../../components/utils/icons";
import IconDevisStyle from "../../components/utils/icons/IconDevisStyle";
import { CSVLink } from "react-csv";
import TableDevis from "../../components/utils/tables/TableDevis";
import { tableDevisFields } from "../../constants/tablesConstants";
import { TfiImport, TfiExport, TfiPlus } from "react-icons/tfi";
import { useEffect } from "react";
import { fetchAllDevis, setNameDevis } from "../../store/devisSlice";
import CopyRight from "../../components/utils/Copyright/CopyRight";

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

    if (status === "loading") {
        return (
            <div>
                <div className="flex items-center justify-between">
                    <HeaderTitle title={title} />
                    <IconDevisStyle number={devis.count} />
                </div>
                <div className="flex items-center justify-end mt-4 pr-2 space-x-4">
                    <SearchBar
                        dipatcherFunction={searchDevisDispatcher}
                        searchValue={searchDevis}
                        placeHolder="Chercher un client ..."
                    />

                    <IconStyleOne>
                        <TfiExport size={25} />
                    </IconStyleOne>

                    <IconStyleTree route="/devis/AddDevis">
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
        return (
            <div>
                <div className="flex items-center justify-between">
                    <HeaderTitle title={title} />
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
                    <IconStyleTree route="/devis/FormDevis">
                        <TfiPlus size={25} />
                    </IconStyleTree>
                </div>
                <TableDevis fields={tableDevisFields} />
                <div className="mt-20 text-[12px] ">
                    <CopyRight />
                </div>
            </div>
        );
    }
};

export default Devis;
