import React from "react";
import { useSelector, useDispatch } from "react-redux";
import HeaderTitle from "../../components/utils/titles/HeaderTitle";
import SearchBar from "../../components/utils/searchbar/SearchBar";

import { IconStyleOne, IconStyleTwo } from "../../components/utils/icons";
import {
    tableClientFields,
    tableTransacionFields,
} from "../../constants/tablesConstants";
import TableTransaction from "../../components/utils/tables/TableTransaction";

import { CSVLink } from "react-csv";

import { TfiFilter, TfiExport } from "react-icons/tfi";
import { useEffect } from "react";
import { fetchAllTransactions } from "../../store/transactionSlice";
import IconTransactionStyle from "../../components/utils/icons/IconTransactionStyle";
const Transactions = () => {
    const dispatch = useDispatch();
    const transactions = useSelector((state) => state.transactions.data);
    const status = useSelector((state) => state.transactions.status);
    const error = useSelector((state) => state.transactions.error);
    const transaction = useSelector((state) => state.clients.transaction);
    const title = useSelector((state) => state.selectedPage.selectedPage);
    const visibility = useSelector((state) => state.overlay.show);

    useEffect(() => {
        dispatch(fetchAllTransactions());
    }, []);
    if (status === "loading") {
        return (
            <div>
                <div className="flex items-center pb-2 justify-between">
                    <HeaderTitle title={title} />
                    <IconTransactionStyle number={transactions.count} />
                </div>
                <div className="flex items-center justify-end space-x-4">
                    <SearchBar placeHolder="Chercher par client ..." />
                    <IconStyleOne>
                        <TfiFilter size={25} />
                    </IconStyleOne>
                    <IconStyleOne>
                        <TfiExport size={25} />
                    </IconStyleOne>
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
                <div className="flex items-center pb-2 justify-between">
                    <HeaderTitle title={title} />
                    <IconTransactionStyle number={transactions.count} />
                </div>
                <div className="flex items-center justify-end space-x-4">
                    <SearchBar placeHolder="Chercher par client ..." />
                    <IconStyleOne>
                        <TfiFilter size={25} />
                    </IconStyleOne>
                    <CSVLink
                        data={transactions.transactions}
                        filename="transactions.csv"
                    >
                        <IconStyleOne>
                            <TfiExport size={25} />
                        </IconStyleOne>
                    </CSVLink>
                </div>
                <TableTransaction fields={tableTransacionFields} />
            </div>
        );
    }

    if (status === "failed") {
        return <div className="text-4xl text-red-400 text-center">Error</div>;
    }
};

export default Transactions;
