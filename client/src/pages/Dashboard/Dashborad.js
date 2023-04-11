import React from "react";
import SearchBar from "../../components/utils/searchbar/SearchBar";
import HeaderTitle from "../../components/utils/titles/HeaderTitle";
import { useSelector } from "react-redux";

const Dashborad = () => {
    const title = useSelector((state) => state.selectedPage.selectedPage);
    return (
        <div>
            <HeaderTitle title={title} />
        </div>
    );
};

export default Dashborad;
