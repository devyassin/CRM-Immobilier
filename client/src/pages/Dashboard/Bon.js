import React from "react";
import { useSelector, useDispatch } from "react-redux";
import HeaderTitle from "../../components/utils/titles/HeaderTitle";
import SearchBar from "../../components/utils/searchbar/SearchBar";
import { IconStyleOne, IconStyleTree } from "../../components/utils/icons";
import IconBonStyle from "../../components/utils/icons/IconBonStyle";
import { CSVLink } from "react-csv";
import TableBons from "../../components/utils/tables/TableBons";
import { tableBonsFields } from "../../constants/tablesConstants";
import { TfiExport, TfiPlus } from "react-icons/tfi";
import { useEffect } from "react";
import { fetchAllBons, setNameBon } from "../../store/BonSlice";

const Bon = () => {
    const dispatch = useDispatch();
    const bons = useSelector((state) => state.bons.data);
    const status = useSelector((state) => state.bons.status);
    const error = useSelector((state) => state.bons.error);
    const bon = useSelector((state) => state.bons.bon);
    const searchBon = useSelector((state) => state.bons.searchBon);
    const title = useSelector((state) => state.selectedPage.selectedPage);
    const visibility = useSelector((state) => state.overlay.show);

    useEffect(() => {
        dispatch(fetchAllBons(`${searchBon}`));
    }, [searchBon]);

    const searchBonDispatcher = (e) => {
        let searchBon = e.target.value;
        dispatch(setNameBon({ searchBon }));
    };

    if (status === "loading") {
        return (
            <div>
                <div className="flex items-center justify-between">
                    <HeaderTitle title={title} />
                    <IconBonStyle number={bons.count} />
                </div>
                <div className="flex items-center justify-end mt-4 pr-2 space-x-4">
                    <SearchBar
                        dipatcherFunction={searchBonDispatcher}
                        searchValue={searchBon}
                        placeHolder="Chercher un prospect ..."
                    />

                    <IconStyleOne>
                        <TfiExport size={25} />
                    </IconStyleOne>

                    <IconStyleTree route="/bons/FormBon">
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
                    <IconBonStyle number={bons.count} />
                </div>
                <div className="flex items-center justify-end mt-4 pr-2 space-x-4">
                    <SearchBar
                        dipatcherFunction={searchBonDispatcher}
                        searchValue={searchBon}
                        placeHolder="Chercher un prospect ..."
                    />
                    <CSVLink data={bons.bons} filename="bons.csv">
                        <IconStyleOne>
                            <TfiExport size={25} />
                        </IconStyleOne>
                    </CSVLink>

                    <IconStyleTree route="/bons/FormBon">
                        <TfiPlus size={25} />
                    </IconStyleTree>
                </div>
                <TableBons fields={tableBonsFields} />
            </div>
        );
    }
};

export default Bon;
