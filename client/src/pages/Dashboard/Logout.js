import React from "react";
import { CiLogout } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import { showLog, hide } from "../../store/overlaySlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const visibility = useSelector((state) => state.overlay.showLog);
    return (
        <div>
            <CiLogout
                onClick={() => dispatch(showLog())}
                size={35}
                className="absolute text-white font-bold cursor-pointer left-[13rem] top-1"
            />
            {visibility && (
                <motion.div
                    animate={{
                        y: "-70%",
                        scale: 1,
                    }}
                    initial={{
                        y: 0,
                        x: "-50%",
                        scale: 0.8,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 120,
                    }}
                    className="absolute z-40  p-6 -translate-x-1/2 bg-white rounded-lg shadow-lg w-full m-4 mr-10 md:m-0 sm:max-w-xl top-1/2 left-1/2 -translate-y-2/3"
                >
                    <h1 className="text-4xl font-bold text-center">
                        Êtes-vous sûr de vouloir vous déconnecter ?
                    </h1>
                    <div className="flex justify-center space-x-10">
                        <button
                            type="submit"
                            class="btn btn-primary mt-8 py-3 px-4 w-full xl:w-32 xl:mr-3 align-top"
                            onClick={() => {
                                localStorage.removeItem("user");
                                localStorage.removeItem("token");
                                localStorage.removeItem("route");
                                localStorage.removeItem("routed");
                                navigate("/login");
                            }}
                        >
                            Oui
                        </button>
                        <button
                            onClick={() => {
                                dispatch(hide());
                            }}
                            class="btn  btn-danger mt-8 py-3 px-4 w-full xl:w-32 xl:mr-3 align-top"
                        >
                            Non
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default Logout;
