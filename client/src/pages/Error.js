import React from "react";
import { errorIllustration } from "../assets/images";
import { useNavigate } from "react-router-dom";

const Error = () => {
    const navigate = useNavigate();
    return (
        <div class="py-5">
            <div class="container">
                <div class="error-page flex flex-col lg:flex-row items-center justify-center h-screen text-center lg:text-left">
                    <div class="-intro-x lg:mr-20">
                        <img
                            alt=""
                            class="h-48 lg:h-auto"
                            src={errorIllustration}
                        />
                    </div>
                    <div class="text-white mt-10 lg:mt-0">
                        <div class="intro-x text-8xl font-medium">404</div>
                        <div class="intro-x text-xl lg:text-3xl font-medium mt-5">
                            Oops. This page has gone missing.
                        </div>
                        <div class="intro-x text-lg mt-3">
                            You may have mistyped the address or the page may
                            have moved.
                        </div>
                        <button
                            onClick={() => {
                                navigate("/login");
                            }}
                            class="intro-x btn py-3 px-4 text-white border-white mt-10"
                        >
                            back to home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Error;
