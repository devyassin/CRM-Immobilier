import React from "react";
import HeaderTitle from "../../components/utils/titles/HeaderTitle";
import { IconTacheStyle, IconTacheSucces } from "../../components/utils/icons";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import IconStyleTwo from "../../components/utils/icons/IconStyleTwo";
import { TfiPencil } from "react-icons/tfi";
import FormTache from "../../components/utils/form/FormTache";
import Column from "../../components/taches/Column";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import ColumnSkelton from "../../components/utils/skeleton/ColumnSkelton";
import "react-loading-skeleton/dist/skeleton.css";
import {
    fetchAllTachesAfaire,
    fetchAllTachesEnCours,
    fetchAllTachesTermine,
} from "../../store/tacheSlice";
import CopyRight from "../../components/utils/Copyright/CopyRight";

const Taches = () => {
    const dispatch = useDispatch();

    const title = useSelector((state) => state.selectedPage.selectedPage);
    const visibility = useSelector((state) => state.overlay.show);
    const todosList = useSelector((state) => state.taches.todo);
    const progressList = useSelector((state) => state.taches.progress);
    const doneList = useSelector((state) => state.taches.done);
    const statusTodo = useSelector((state) => state.taches.statusTodo);
    const statusProgress = useSelector(
        (state) => state.taches.statusInprogress
    );
    const tache = useSelector((state) => state.taches.tache);
    const statusDone = useSelector((state) => state.taches.statusDone);
    useEffect(() => {
        dispatch(fetchAllTachesEnCours());
        dispatch(fetchAllTachesAfaire());
        dispatch(fetchAllTachesTermine());
    }, []);
    if (
        statusTodo === "loading" ||
        statusProgress === "loading" ||
        statusDone === "loading"
    ) {
        return (
            <div>
                <div className="flex items-center justify-between">
                    <HeaderTitle title={title} />
                    <IconTacheStyle number="??" />
                </div>
                <div className="flex items-center justify-end mt-2 pr-2">
                    <IconStyleTwo>
                        <TfiPencil size={20} />
                    </IconStyleTwo>
                </div>
                <div className="grid sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-3 mt-2 gap-4 ">
                    <ColumnSkelton type="red" />
                    <ColumnSkelton type="blue" />
                    <ColumnSkelton type="green" />
                </div>
            </div>
        );
    }

    if (
        statusTodo === "succeeded" &&
        statusProgress === "succeeded" &&
        statusDone === "succeeded"
    ) {
        const globalObject = [
            {
                title: "À faire",
                number: todosList.count,
                type: "todo",
                list: todosList.taches,
            },
            {
                title: "En cours",
                number: progressList.count,
                type: "progress",
                list: progressList.taches,
            },
            {
                title: "Terminé",
                number: doneList.count,
                type: "done",
                list: doneList.taches,
            },
        ];
        return (
            <div>
                <div className="flex items-center justify-between">
                    <HeaderTitle title={title} />
                    <IconTacheStyle
                        number={
                            todosList.count +
                            progressList.count +
                            doneList.count
                        }
                    />
                </div>
                <div className="flex items-center justify-end mt-2 pr-2">
                    <IconStyleTwo>
                        <TfiPencil size={20} />
                    </IconStyleTwo>
                </div>
                <div className="grid sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-3 mt-2 gap-4 ">
                    {globalObject.map((column, index) => {
                        return (
                            <Column
                                key={index}
                                title={column.title}
                                number={column.number}
                                type={column.type}
                                list={column.list}
                            />
                        );
                    })}
                </div>
                {visibility && <FormTache tache={tache} />}
                <div className="mt-6 text-[12px]">
                    <CopyRight />
                </div>
            </div>
        );
    }
};

export default Taches;
