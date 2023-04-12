import React from "react";
import { MdDelete, MdEmail, MdCreate } from "react-icons/md";

const TableOne = () => {
    return (
        <div class="relative  overflow-x-auto overflow-scroll tableScroll h-80 md:h-[400px] mt-10 shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left  text-gray-500 ">
                <thead class="text-md text-blue-400  bg-gray-50 ">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            First Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            last Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Type
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Phone
                        </th>

                        <th scope="col" class="px-6 py-3">
                            Address
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Last Contacted
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b hover:bg-gray-50 duration-150 ">
                        <td class="px-6 py-4">Lamouadden</td>
                        <td class="px-6 py-4">Yassine</td>
                        <td class="px-6 py-4">
                            <p className="w-32 py-2 text-center text-white bg-red-500 rounded-lg opacity-90">
                                personal business
                            </p>
                        </td>
                        <td class="px-6 py-4">+212651358737</td>
                        <td class="px-6 py-4">Agadir</td>
                        <td class="px-6 py-4">mouden529@gmail.com</td>
                        <td class="px-6 py-4">10/04/2023</td>
                        <td class="px-6 py-4 flex space-x-2 mt-4">
                            <MdDelete
                                className="duration-150 cursor-pointer hover:opacity-60"
                                size={20}
                                color="red"
                            />
                            <MdCreate
                                className="duration-150 cursor-pointer hover:opacity-60"
                                size={20}
                                color="blue"
                            />
                            <MdEmail
                                className="duration-150 cursor-pointer hover:opacity-60"
                                size={20}
                                color="orange"
                            />
                        </td>
                    </tr>
                    <tr class="bg-white border-b  ">
                        <td class="px-6 py-4">Lamouadden</td>
                        <td class="px-6 py-4">Yassine</td>
                        <td class="px-6 py-4">
                            <p className="w-32 py-2 text-center text-white bg-red-500 rounded-lg opacity-90">
                                personal business
                            </p>
                        </td>
                        <td class="px-6 py-4">+212651358737</td>
                        <td class="px-6 py-4">Agadir</td>
                        <td class="px-6 py-4">mouden529@gmail.com</td>
                        <td class="px-6 py-4">10/04/2023</td>
                        <td class="px-6 py-4 flex space-x-2 mt-4">
                            <MdDelete
                                className="duration-150 cursor-pointer hover:opacity-60"
                                size={20}
                                color="red"
                            />
                            <MdCreate
                                className="duration-150 cursor-pointer hover:opacity-60"
                                size={20}
                                color="blue"
                            />
                            <MdEmail
                                className="duration-150 cursor-pointer hover:opacity-60"
                                size={20}
                                color="orange"
                            />
                        </td>
                    </tr>
                    <tr class="bg-white border-b  ">
                        <td class="px-6 py-4">Lamouadden</td>
                        <td class="px-6 py-4">Yassine</td>
                        <td class="px-6 py-4">
                            <p className="w-32 py-2 text-center text-white bg-red-500 rounded-lg opacity-90">
                                personal business
                            </p>
                        </td>
                        <td class="px-6 py-4">+212651358737</td>
                        <td class="px-6 py-4">Agadir</td>
                        <td class="px-6 py-4">mouden529@gmail.com</td>
                        <td class="px-6 py-4">10/04/2023</td>
                        <td class="px-6 py-4 flex space-x-2 mt-4">
                            <MdDelete
                                className="duration-150 cursor-pointer hover:opacity-60"
                                size={20}
                                color="red"
                            />
                            <MdCreate
                                className="duration-150 cursor-pointer hover:opacity-60"
                                size={20}
                                color="blue"
                            />
                            <MdEmail
                                className="duration-150 cursor-pointer hover:opacity-60"
                                size={20}
                                color="orange"
                            />
                        </td>
                    </tr>
                    <tr class="bg-white border-b  ">
                        <td class="px-6 py-4">Lamouadden</td>
                        <td class="px-6 py-4">Yassine</td>
                        <td class="px-6 py-4">
                            <p className="w-32 py-2 text-center text-white bg-red-500 rounded-lg opacity-90">
                                personal business
                            </p>
                        </td>
                        <td class="px-6 py-4">+212651358737</td>
                        <td class="px-6 py-4">Agadir</td>
                        <td class="px-6 py-4">mouden529@gmail.com</td>
                        <td class="px-6 py-4">10/04/2023</td>
                        <td class="px-6 py-4 flex space-x-2 mt-4">
                            <MdDelete
                                className="duration-150 cursor-pointer hover:opacity-60"
                                size={20}
                                color="red"
                            />
                            <MdCreate
                                className="duration-150 cursor-pointer hover:opacity-60"
                                size={20}
                                color="blue"
                            />
                            <MdEmail
                                className="duration-150 cursor-pointer hover:opacity-60"
                                size={20}
                                color="orange"
                            />
                        </td>
                    </tr>
                    <tr class="bg-white border-b  ">
                        <td class="px-6 py-4">Lamouadden</td>
                        <td class="px-6 py-4">Yassine</td>
                        <td class="px-6 py-4">
                            <p className="w-32 py-2 text-center text-white bg-red-500 rounded-lg opacity-90">
                                personal business
                            </p>
                        </td>
                        <td class="px-6 py-4">+212651358737</td>
                        <td class="px-6 py-4">Agadir</td>
                        <td class="px-6 py-4">mouden529@gmail.com</td>
                        <td class="px-6 py-4">10/04/2023</td>
                        <td class="px-6 py-4 flex space-x-2 mt-4">
                            <MdDelete
                                className="duration-150 cursor-pointer hover:opacity-60"
                                size={20}
                                color="red"
                            />
                            <MdCreate
                                className="duration-150 cursor-pointer hover:opacity-60"
                                size={20}
                                color="blue"
                            />
                            <MdEmail
                                className="duration-150 cursor-pointer hover:opacity-60"
                                size={20}
                                color="orange"
                            />
                        </td>
                    </tr>
                    <tr class="bg-white border-b  ">
                        <td class="px-6 py-4">Lamouadden</td>
                        <td class="px-6 py-4">Yassine</td>
                        <td class="px-6 py-4">
                            <p className="w-32 py-2 text-center text-white bg-red-500 rounded-lg opacity-90">
                                personal business
                            </p>
                        </td>
                        <td class="px-6 py-4">+212651358737</td>
                        <td class="px-6 py-4">Agadir</td>
                        <td class="px-6 py-4">mouden529@gmail.com</td>
                        <td class="px-6 py-4">10/04/2023</td>
                        <td class="px-6 py-4 flex space-x-2 mt-4">
                            <MdDelete
                                className="duration-150 cursor-pointer hover:opacity-60"
                                size={20}
                                color="red"
                            />
                            <MdCreate
                                className="duration-150 cursor-pointer hover:opacity-60"
                                size={20}
                                color="blue"
                            />
                            <MdEmail
                                className="duration-150 cursor-pointer hover:opacity-60"
                                size={20}
                                color="orange"
                            />
                        </td>
                    </tr>
                    <tr class="bg-white border-b  ">
                        <td class="px-6 py-4">Lamouadden</td>
                        <td class="px-6 py-4">Yassine</td>
                        <td class="px-6 py-4">
                            <p className="w-32 py-2 text-center text-white bg-red-500 rounded-lg opacity-90">
                                personal business
                            </p>
                        </td>
                        <td class="px-6 py-4">+212651358737</td>
                        <td class="px-6 py-4">Agadir</td>
                        <td class="px-6 py-4">mouden529@gmail.com</td>
                        <td class="px-6 py-4">10/04/2023</td>
                        <td class="px-6 py-4 flex space-x-2 mt-4">
                            <MdDelete
                                className="duration-150 cursor-pointer hover:opacity-60"
                                size={20}
                                color="red"
                            />
                            <MdCreate
                                className="duration-150 cursor-pointer hover:opacity-60"
                                size={20}
                                color="blue"
                            />
                            <MdEmail
                                className="duration-150 cursor-pointer hover:opacity-60"
                                size={20}
                                color="orange"
                            />
                        </td>
                    </tr>
                    <tr class="bg-white border-b  ">
                        <td class="px-6 py-4">Lamouadden</td>
                        <td class="px-6 py-4">Yassine</td>
                        <td class="px-6 py-4">
                            <p className="w-32 py-2 text-center text-white bg-red-500 rounded-lg opacity-90">
                                personal business
                            </p>
                        </td>
                        <td class="px-6 py-4">+212651358737</td>
                        <td class="px-6 py-4">Agadir</td>
                        <td class="px-6 py-4">mouden529@gmail.com</td>
                        <td class="px-6 py-4">10/04/2023</td>
                        <td class="px-6 py-4 flex space-x-2 mt-4">
                            <MdDelete
                                className="duration-150 cursor-pointer hover:opacity-60"
                                size={20}
                                color="red"
                            />
                            <MdCreate
                                className="duration-150 cursor-pointer hover:opacity-60"
                                size={20}
                                color="blue"
                            />
                            <MdEmail
                                className="duration-150 cursor-pointer hover:opacity-60"
                                size={20}
                                color="orange"
                            />
                        </td>
                    </tr>
                    <tr class="bg-white border-b  ">
                        <td class="px-6 py-4">Lamouadden</td>
                        <td class="px-6 py-4">Yassine</td>
                        <td class="px-6 py-4">
                            <p className="w-32 py-2 text-center text-white bg-red-500 rounded-lg opacity-90">
                                personal business
                            </p>
                        </td>
                        <td class="px-6 py-4">+212651358737</td>
                        <td class="px-6 py-4">Agadir</td>
                        <td class="px-6 py-4">mouden529@gmail.com</td>
                        <td class="px-6 py-4">10/04/2023</td>
                        <td class="px-6 py-4 flex space-x-2 mt-4">
                            <MdDelete
                                className="duration-150 cursor-pointer hover:opacity-60"
                                size={20}
                                color="red"
                            />
                            <MdCreate
                                className="duration-150 cursor-pointer hover:opacity-60"
                                size={20}
                                color="blue"
                            />
                            <MdEmail
                                className="duration-150 cursor-pointer hover:opacity-60"
                                size={20}
                                color="orange"
                            />
                        </td>
                    </tr>
                    <tr class="bg-white border-b  ">
                        <td class="px-6 py-4">Lamouadden</td>
                        <td class="px-6 py-4">Yassine</td>
                        <td class="px-6 py-4">
                            <p className="w-32 py-2 text-center text-white bg-red-500 rounded-lg opacity-90">
                                personal business
                            </p>
                        </td>
                        <td class="px-6 py-4">+212651358737</td>
                        <td class="px-6 py-4">Agadir</td>
                        <td class="px-6 py-4">mouden529@gmail.com</td>
                        <td class="px-6 py-4">10/04/2023</td>
                        <td class="px-6 py-4 flex space-x-2 mt-4">
                            <MdDelete
                                className="duration-150 cursor-pointer hover:opacity-60"
                                size={20}
                                color="red"
                            />
                            <MdCreate
                                className="duration-150 cursor-pointer hover:opacity-60"
                                size={20}
                                color="blue"
                            />
                            <MdEmail
                                className="duration-150 cursor-pointer hover:opacity-60"
                                size={20}
                                color="orange"
                            />
                        </td>
                    </tr>
                    <tr class="bg-white border-b  ">
                        <td class="px-6 py-4">Lamouadden</td>
                        <td class="px-6 py-4">Yassine</td>
                        <td class="px-6 py-4">
                            <p className="w-32 py-2 text-center text-white bg-red-500 rounded-lg opacity-90">
                                personal business
                            </p>
                        </td>
                        <td class="px-6 py-4">+212651358737</td>
                        <td class="px-6 py-4">Agadir</td>
                        <td class="px-6 py-4">mouden529@gmail.com</td>
                        <td class="px-6 py-4">10/04/2023</td>
                        <td class="px-6 py-4 flex space-x-2 mt-4">
                            <MdDelete
                                className="duration-150 cursor-pointer hover:opacity-60"
                                size={20}
                                color="red"
                            />
                            <MdCreate
                                className="duration-150 cursor-pointer hover:opacity-60"
                                size={20}
                                color="blue"
                            />
                            <MdEmail
                                className="duration-150 cursor-pointer hover:opacity-60"
                                size={20}
                                color="orange"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default TableOne;
