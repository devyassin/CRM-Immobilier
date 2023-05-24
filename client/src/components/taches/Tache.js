import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { deleteTache } from "../../store/tacheSlice";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { useState } from "react";
import { fetchOneTache, setOldTache } from "../../store/tacheSlice";
import { show } from "../../store/overlaySlice";
const Tache = ({
    type,
    tache: { id, title, status, deadline, description },
}) => {
    const dispatch = useDispatch();
    const [isAnimate, setIsAnimate] = useState(false);
    return (
        <motion.div
            animate={{
                x: isAnimate ? "110%" : "0%",
                opacity: isAnimate ? 0 : 1,
            }}
            initial={{
                x: "0%",
                opacity: 1,
            }}
            transition={{
                duration: 2,
            }}
            onClick={async () => {
                await dispatch(fetchOneTache(id));
                dispatch(setOldTache());
                dispatch(show());
            }}
            className={`flex flex-col cursor-grab ${
                type === "todo"
                    ? "bg-red-200"
                    : type === "progress"
                    ? "bg-blue-200"
                    : type === "done"
                    ? "bg-green-200"
                    : ""
            } p-1 pl-3 pb-4 rounded-lg`}
        >
            <div className="flex justify-between">
                <div></div>
                <AiFillCloseCircle
                    onClick={(event) => {
                        event.stopPropagation();
                        setIsAnimate(true);
                        setTimeout(() => {
                            dispatch(deleteTache(id));
                        }, 1000);
                    }}
                    className="cursor-pointer text-red-500 hover:text-red-400 duration-150 "
                    size={25}
                />
            </div>

            <h1 className="text-lg font-bold ">{title}</h1>
            <div className="flex items-center space-x-2 mb-3">
                <h1 className="text-lg">Date :</h1>
                <p className="opacity-60 mt-[2px]">{deadline}</p>
            </div>

            <p className="text-[12px] opacity-70 leading-4">{description}</p>
        </motion.div>
    );
};

export default Tache;
