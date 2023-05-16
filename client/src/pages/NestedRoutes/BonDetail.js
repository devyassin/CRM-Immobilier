import React from "react";
import HeaderTitle from "../../components/utils/titles/HeaderTitle";
import { logo, icon, pngwing } from "../../assets/images";
import { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllBiens } from "../../store/bienSlice";
import { fetchOneBon, setGlobalStatus } from "../../store/BonSlice";
import { useRef } from "react";
import { pxfuel } from "../../assets/images";
import { useState } from "react";
import ReactPrint from "react-to-print";

const BonDetail = () => {
    const ref = useRef();
    const [active, setActive] = useState(false);
    const { id } = useParams();

    const dispatch = useDispatch();
    const bon = useSelector((state) => state.bons.bon);
    const user = useSelector((state) => state.user.user);
    const status = useSelector((state) => state.bons.status);
    const statusBiens = useSelector((state) => state.biens.status);
    const biens = useSelector((state) => state.biens.data);

    useEffect(() => {
        dispatch(fetchAllBiens(["", "", "", "", "", "", "nonlocal"]));
        dispatch(fetchOneBon(id));
    }, []);
    if (status === "loading") {
        return (
            <div>
                <div className="flex items-center justify-between">
                    <HeaderTitle title="Imprimer Bon de visite" />
                    <Link to="/bons">
                        <IoArrowBackCircleSharp
                            size={50}
                            className="cursor-pointer text-blue-400 hover:opacity-80 duration-150"
                        />
                    </Link>
                </div>
                <div className="flex items-center justify-center mt-40 ">
                    <div class="loading-spinner"></div>
                </div>
            </div>
        );
    }

    if (bon.raison !== "" && statusBiens === "succeeded") {
        return (
            <div>
                <div className="flex items-center mb-4 justify-between">
                    <HeaderTitle title="Imprimer Bon de visite" />
                    <Link
                        to="/bons"
                        onClick={() => {
                            dispatch(setGlobalStatus({}));
                        }}
                    >
                        <IoArrowBackCircleSharp
                            size={50}
                            className="cursor-pointer text-blue-400 hover:opacity-80 duration-150"
                        />
                    </Link>
                </div>
                <div
                    ref={ref}
                    className={`flex p-6 ${
                        active === false ? "mx-0" : "mx-32"
                    }  flex-col space-y-14   `}
                >
                    <div className="flex space-x-4">
                        {/* part 1 */}
                        <div className="flex flex-col items-start space-y-4">
                            {/* item 1 */}
                            <div className="flex flex-col items-start -space-y-2 bg-white  rounded-md p-2">
                                <h1 className="text-4xl uppercase text-gradient font-black text-blue-900">
                                    Bon de visite
                                </h1>
                                <div className="flex text-[8px] font-bold text-blue-900 items-center space-x-2">
                                    <p>Réf : #0000{bon.id} &#174;</p>
                                    <p>{user.email}</p>
                                </div>
                                <div className="flex text-[8px] font-bold text-blue-900 items-center space-x-2">
                                    <p>
                                        Modèle déposé&#169; - Reproduction
                                        Interdite - Tél : {user.tel}
                                    </p>
                                </div>
                            </div>
                            {/* item 2 */}
                            <div className="bg-white h-[300px] border-2 w-[350px] relative  flex flex-col justify-between rounded-md p-2">
                                <h1 className="text-md mt-4 font-bold text-blue-900 ">
                                    Cachet de l'agence
                                </h1>
                                <h1 className="text-md mt-4 font-bold text-blue-900 ">
                                    Représentée par :{"  "}
                                    <span className="text-black uppercase opacity-75 font-semibold text-[12px] ml-2">
                                        {user.name}
                                    </span>
                                </h1>
                                <img
                                    className="w-80 absolute top-14 opacity-5 -rotate-[20deg]"
                                    src={pngwing}
                                />
                            </div>

                            {/* item 3 */}
                            <div className=" h-[200px] w-[350px] rounded-md flex justify-end relative">
                                <div className="w-[300px] flex flex-col space-y-2 p-4 bg-white rounded-md">
                                    <div className="flex justify-between mb-4">
                                        <span className="text-md  font-bold text-blue-900">
                                            à{" "}
                                            <span className="text-black uppercase opacity-75 font-semibold text-[12px] ml-2">
                                                {user.address}
                                            </span>
                                        </span>
                                        <span className="text-md  font-bold text-blue-900">
                                            le{" "}
                                            <span className="text-black uppercase opacity-75 font-semibold text-[12px] ml-2">
                                                {bon.created_at
                                                    .substring(0, 10)
                                                    .replace(/-/g, "/")}
                                            </span>
                                        </span>
                                    </div>
                                    <div className="flex space-x-4">
                                        <div className="bg-blue-50 h-[100px] rounded-md text-center w-full">
                                            <p className="text-[11px] mt-2 font-bold text-blue-900">
                                                {" "}
                                                client
                                            </p>
                                        </div>
                                        <div className="bg-blue-50 h-[100px] rounded-md text-center   w-full">
                                            <p className="text-[11px] mt-2 font-bold text-blue-900">
                                                accompagnateur
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute left-0 top-20 bg-white px-2 pt-2 rounded-md text-md  font-bold text-blue-900 -rotate-90">
                                    Signatures
                                </div>
                            </div>
                        </div>
                        {/* part 2 */}
                        <div className="flex flex-col space-y-4 w-full ">
                            {/* item 1 */}
                            <div className="flex flex-col items-start space-y-8  w-full bg-white h-[240px]  rounded-md p-2 ">
                                <div className="flex space-x-2 mt-4">
                                    <h1 className="text-md  font-bold text-blue-900 ">
                                        Accompagnateur :
                                    </h1>
                                    <span className="text-black uppercase opacity-75 font-semibold text-[10px] ">
                                        {bon.accompagnateur}
                                    </span>
                                </div>
                                <div className="flex space-x-2 mt-4">
                                    <h1 className="text-md  font-bold text-blue-900 ">
                                        Client :
                                    </h1>
                                    <span className="text-black uppercase opacity-75 font-semibold text-[10px] ">
                                        {bon.lead.nom} {bon.lead.prenom}
                                    </span>
                                </div>
                                <div className="flex space-x-2 mt-4">
                                    <h1 className="text-md  font-bold text-blue-900 ">
                                        Tel :
                                    </h1>
                                    <span className="text-black uppercase opacity-75 font-semibold text-[10px] ">
                                        {bon.lead.tel}
                                    </span>
                                </div>
                                <div className="flex space-x-2 mt-4">
                                    <h1 className="text-md  font-bold text-blue-900 ">
                                        Raison :
                                    </h1>
                                    <span className="text-black uppercase opacity-75 font-semibold text-[10px] ">
                                        {bon.raison}
                                    </span>
                                </div>
                            </div>
                            {/* item 2 */}
                            <div className="flex flex-col items-start space-y-8  w-full bg-white h-[355px]  rounded-md p-2 ">
                                <div className="flex space-x-2 mt-4">
                                    <h1 className="text-md  font-bold text-blue-900 ">
                                        Bien visité :
                                    </h1>
                                    <span className="text-black uppercase opacity-75 font-semibold text-[10px] ">
                                        {bon.bien.NomBien}
                                    </span>
                                </div>
                                <div className="flex space-x-2 mt-4">
                                    <h1 className="text-md  font-bold text-blue-900 ">
                                        Date de visite :
                                    </h1>
                                    <span className="text-black uppercase opacity-75 font-semibold text-[10px] ">
                                        {bon.date_visite
                                            .substring(0, 10)
                                            .replace(/-/g, "/")}
                                    </span>
                                </div>
                                <div className="flex space-x-2 mt-4">
                                    <h1 className="text-md  font-bold text-blue-900 ">
                                        Address :
                                    </h1>
                                    <span className="text-black uppercase opacity-75 font-semibold text-[10px] ">
                                        {bon.bien.address}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ReactPrint
                    trigger={() => (
                        <button className="btn btn-primary mt-8 py-3 px- ml-2 w-full xl:w-32 xl:mr-3 align-top">
                            Imprimer
                        </button>
                    )}
                    content={() => ref.current}
                />
            </div>
        );
    }
};

export default BonDetail;
