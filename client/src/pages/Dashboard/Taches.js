import React from "react";
import HeaderTitle from "../../components/utils/titles/HeaderTitle";
import { IconTacheStyle, IconTacheSucces } from "../../components/utils/icons";
import { useSelector, useDispatch } from "react-redux";
import IconStyleTwo from "../../components/utils/icons/IconStyleTwo";
import { TfiPencil } from "react-icons/tfi";
import Column from "../../components/taches/Column";

const Taches = () => {
    const title = useSelector((state) => state.selectedPage.selectedPage);
    return (
        <div>
            <div className="flex items-center justify-between">
                <HeaderTitle title={title} />
                <IconTacheStyle number="25" />
            </div>
            <div className="flex items-center justify-end mt-2 pr-2">
                <IconStyleTwo>
                    <TfiPencil size={20} />
                </IconStyleTwo>
            </div>
            <div className="grid sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-3 mt-2 gap-4 ">
                <Column title="À faire" number="5" type="todo" />
                <Column title="En cours" number="12" type="progress" />
                <Column title="Terminé" number="7" type="done" />
            </div>
        </div>
    );
};

export default Taches;
