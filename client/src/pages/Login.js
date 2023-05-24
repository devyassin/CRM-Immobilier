import React from "react";
import { illustration, logo, icon } from "../assets/images";
import LoginInput from "../components/utils/form/LoginInput";
import LoginButton from "../components/utils/buttons/LoginButton";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { loginUser } from "../store/userSlice";
import {
    ToastLoading,
    Toastfailed,
    Toastsuccess,
    ToastWarn,
} from "../components/utils/toast/Toast";
import { showAlert, closeAlert } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const error = useSelector((state) => state.user.error);
    const navigate = useNavigate();
    const status = useSelector((state) => state.user.statusLogin);

    useEffect(() => {
        if (status === "succeeded") {
            Toastsuccess("Bonjour !");
            setTimeout(() => {
                navigate("/dashboard");
                window.location.reload();
            }, 3000);
        }

        if (status === "failed") {
            Toastfailed(error);
        }

        if (status == "loading") {
            ToastLoading("Login ...");
        }
    }, [status]);

    const onSubmitHandler = (e) => {
        e.preventDefault();

        dispatch(showAlert());
        setTimeout(() => {
            dispatch(closeAlert());
        }, 3000);
        if (!email || !password) {
            ToastWarn("Veuillez remplir toutes les champs !");
            return;
        }

        dispatch(loginUser({ email, password }));
    };
    const myToken = document.head
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

    return (
        <div className="login ">
            <div class="container sm:px-10">
                <div class="block xl:grid grid-cols-2 gap-4">
                    <div class="hidden xl:flex flex-col min-h-screen">
                        <a href="" class="-intro-x flex  items-center pt-5">
                            <img
                                alt="Rubick Tailwind HTML Admin Template"
                                class="w-12"
                                src={icon}
                            />
                            <span class="text-white text-xl ml-3">
                                {" "}
                                Tiguemi{" "}
                            </span>
                        </a>
                        <div class="my-auto">
                            <img
                                alt="Rubick Tailwind HTML Admin Template"
                                class="-intro-x w-1/2 -mt-16"
                                src={illustration}
                            />
                            <div class="-intro-x text-white font-medium text-4xl leading-tight mt-10">
                                Avec Tiguemi boostez
                                <br />
                                votre activité immobilière
                            </div>
                            <div class="-intro-x mt-5 text-lg text-white text-opacity-70 dark:text-slate-400">
                                Faites l'expérience d'une gestion immobilière
                                tout-en-un
                            </div>
                        </div>
                    </div>

                    <div class="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
                        <form
                            onSubmit={onSubmitHandler}
                            class="my-auto mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto"
                        >
                            <h2 class=" pb-2 intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
                                S'authentifier
                            </h2>

                            <div class="intro-x mt-2 text-slate-400 xl:hidden text-center">
                                A few more clicks to sign in to your account.
                                Manage all your e-commerce accounts in one place
                            </div>
                            <div class="intro-x mt-8">
                                <LoginInput
                                    onChangeHandler={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    value={email}
                                    type="email"
                                    placeholder="Email"
                                />
                                <LoginInput
                                    onChangeHandler={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    value={password}
                                    type="password"
                                    placeholder="Password"
                                />
                            </div>
                            <div class="intro-x flex text-slate-600 dark:text-slate-500 text-xs sm:text-sm mt-4">
                                <div class="flex items-center mr-auto">
                                    <input
                                        id="remember-me"
                                        type="checkbox"
                                        class="form-check-input border mr-2"
                                    />
                                    <label
                                        class="cursor-pointer select-none"
                                        for="remember-me"
                                    >
                                        Remember me
                                    </label>
                                </div>
                            </div>
                            <div class="intro-x mt-5 xl:mt-8 text-center xl:text-left">
                                <LoginButton />
                            </div>
                            <div class="intro-x mt-10 xl:mt-24 text-slate-600 dark:text-slate-500 text-center xl:text-left">
                                {" "}
                                By signin up, you agree to our{" "}
                                <a
                                    class="text-primary dark:text-slate-200"
                                    href=""
                                >
                                    Terms and Conditions
                                </a>{" "}
                                &{" "}
                                <a
                                    class="text-primary dark:text-slate-200"
                                    href=""
                                >
                                    Privacy Policy
                                </a>{" "}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
