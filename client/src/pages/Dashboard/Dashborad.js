import React from "react";

import HeaderTitle from "../../components/utils/titles/HeaderTitle";
import { useSelector } from "react-redux";
import LineChartCompanyGain from "../../components/Charts/LineChartCompanyGain";
import PieChartLeadSource from "../../components/Charts/PieChartLeadSource";
import PieChartLeadStatus from "../../components/Charts/PieChartLeadStatus";
import BarChartClientType from "../../components/Charts/BarChartClientType";
import PieChartBienStatus from "../../components/Charts/PieChartBienStatus";
import RadarChartTypeBien from "../../components/Charts/RadarChartTypeBien";
import PieChartTacheStatus from "../../components/Charts/PieChartTacheStatus";
import TransactionsTracking from "../../components/Charts/TransactionsTracking";

const Dashborad = () => {
    const title = useSelector((state) => state.selectedPage.selectedPage);
    console.log("nice");
    return (
        <div>
            <div>
                <HeaderTitle title={title} />
            </div>
            <div className="grid p-4 gap-8 grid-cols-2 ">
                <LineChartCompanyGain />
                <PieChartLeadSource />
                <PieChartLeadStatus />
                <TransactionsTracking />
                <BarChartClientType />
                <PieChartBienStatus />
                <PieChartTacheStatus />
                <RadarChartTypeBien />
            </div>
        </div>
    );
};

export default Dashborad;
