import React from "react";
import { useSelector, useDispatch } from "react-redux";
import HeaderTitle from "../../components/utils/titles/HeaderTitle";
import SearchBar from "../../components/utils/searchbar/SearchBar";
import { TfiExport, TfiPlus, TfiFilter } from "react-icons/tfi";
import { IconStyleOne, IconStyleTwo } from "../../components/utils/icons";
import FormBien from "../../components/utils/form/FormBien";
import TableBien from "../../components/utils/tables/TableBien";
import { tableBienFields } from "../../constants/tablesConstants";
import FilterBien from "../../components/utils/filters/FilterBien";
import IconBienStyle from "../../components/utils/icons/IconBienStyle";

import { CSVLink } from "react-csv";
import { useEffect } from "react";
import { fetchAllBiens, setFilterName } from "../../store/bienSlice";
const Biens = () => {
    const dispatch = useDispatch();
    const biens = useSelector((state) => state.biens.data);
    const status = useSelector((state) => state.biens.status);
    const error = useSelector((state) => state.biens.error);
    const bien = useSelector((state) => state.biens.bien);
    const filterName = useSelector((state) => state.biens.filterName);
    const filterStatus = useSelector((state) => state.biens.filterStatus);
    const filterPrice = useSelector((state) => state.biens.filterPrice);
    const filterOrder = useSelector((state) => state.biens.filterOrder);
    const title = useSelector((state) => state.selectedPage.selectedPage);
    const visibility = useSelector((state) => state.overlay.show);
    const visibilityFilter = useSelector((state) => state.overlay.showFilter);

    useEffect(() => {
        dispatch(
            fetchAllBiens([filterName, filterStatus, filterPrice, filterOrder])
        );
    }, [filterName, filterStatus, filterPrice, filterOrder]);

    const searchClientDispatcher = (e) => {
        let filterName = e.target.value;
        dispatch(setFilterName({ filterName }));
    };

    if (status === "loading") {
        return (
            <div>
                <div className="flex items-center justify-between">
                    <HeaderTitle title={title} />
                    <IconBienStyle number={biens.count} />
                </div>

                <div className="flex items-center justify-end mt-4 space-x-4">
                    <SearchBar
                        dipatcherFunction={searchClientDispatcher}
                        searchValue={filterName}
                        placeHolder="Chercher un client ..."
                    />
                    <IconStyleOne>
                        <TfiFilter size={25} />
                    </IconStyleOne>
                    <IconStyleOne>
                        <TfiExport size={25} />
                    </IconStyleOne>
                    <IconStyleTwo>
                        <TfiPlus size={25} />
                    </IconStyleTwo>
                </div>
                <div className="flex items-center justify-center mt-40">
                    <div class="loading-spinner"></div>
                </div>
                {visibility && <FormBien bien={bien} />}
            </div>
        );
    }

    if (status === "succeeded") {
        return (
            <div>
                <div className="flex items-center justify-between">
                    <HeaderTitle title={title} />
                    <IconBienStyle number={biens.count} />
                </div>

                <div className="flex items-center justify-end mt-4 space-x-4">
                    <SearchBar
                        dipatcherFunction={searchClientDispatcher}
                        searchValue={filterName}
                        placeHolder="Chercher un client ..."
                    />
                    <IconStyleOne type="filter">
                        <TfiFilter size={25} />
                    </IconStyleOne>
                    <CSVLink data={biens.biens} filename="biens.csv">
                        <IconStyleOne>
                            <TfiExport size={25} />
                        </IconStyleOne>
                    </CSVLink>
                    <IconStyleTwo>
                        <TfiPlus size={25} />
                    </IconStyleTwo>
                </div>
                <TableBien fields={tableBienFields} />
                {visibility && <FormBien bien={bien} />}
                {visibilityFilter && <FilterBien />}
            </div>
        );
    }
};

export default Biens;
