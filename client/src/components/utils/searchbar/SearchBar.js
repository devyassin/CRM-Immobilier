import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNameClient } from "../../../store/clientSlice";

const SearchBar = () => {
    const dispatch = useDispatch();
    const searchClient = useSelector((state) => state.clients.searchClient);
    return (
        <div class="max-w-md ">
            <div class="relative flex  items-center w-64 md:w-96 h-12 rounded-lg  bg-white overflow-hidden">
                <div class="grid place-items-center h-full w-12 text-gray-300 hover:cursor-pointer duration-150 opacity-60  hover:opacity-100 ">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 "
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>

                <input
                    class=" h-full w-full focus:outline-none text-sm text-gray-700 border-none pr-2"
                    type="text"
                    id="search"
                    placeholder="Search client.."
                    value={searchClient}
                    onChange={(e) => {
                        let searchClient = e.target.value;
                        dispatch(setNameClient({ searchClient }));
                    }}
                />
            </div>
        </div>
    );
};

export default SearchBar;
