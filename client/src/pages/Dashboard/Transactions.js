import React from "react";
import { useSelector, useDispatch } from "react-redux";
import HeaderTitle from "../../components/utils/titles/HeaderTitle";
import SearchBar from "../../components/utils/searchbar/SearchBar";

import { IconStyleOne, IconStyleTwo } from "../../components/utils/icons";
import { tableClientFields } from "../../constants/tablesConstants";

import { CSVLink } from "react-csv";

import { TfiImport, TfiExport, TfiPlus } from "react-icons/tfi";
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
    return (
        <div className="flex items-center justify-between">
            <HeaderTitle title={title} />
            <IconTransactionStyle number={transactions.count} />
        </div>
    );
};

export default Transactions;
