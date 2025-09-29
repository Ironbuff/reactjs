import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { authAction } from '../../store/auth'
import React from 'react';


interface Item {
    id: number;
    title: string;
    links?: string;
}

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const items: Item[] = [
        { id: 1, title: "Login", links: "/login" },
        { id: 2, title: "Register", links: "/register" },
        { id: 3, title: "Add Habit", links: "/habit" },
        { id: 4, title: "Logout" , links:'/'}
    ];

    const isLoggedIn = useSelector((state: any) => state?.auth?.isloggedIn);

    const handleLogout = () => {
        localStorage.clear();
        dispatch(authAction.logout());
        window.location.reload()
        navigate("/");
    };

    const navItems = isLoggedIn ? items.slice(2, 4) : items.slice(0, 2);

    return (
        <div className="flex flex-row items-center w-full h-[9ch] shadow-md justify-between px-28 border-b border-b-gray-50">
            <Link to={'/'} className="font-bold text-2xl flex items-center justify-center text-red-300">
                Habit
                <span className="text-neutral-700  font-semibold px-1">App</span>
            </Link>
            <div className="flex flex-row items-center justify-center gap-x-2">
                {navItems.map((value) =>
                    value.title === "Logout" ? (
                        <button
                            key={value.id}
                            onClick={handleLogout}
                            className="text-base font-normal p-2 rounded-xl bg-red-400 hover:bg-red-500 text-neutral-100 hover:text-neutral-50 duration-300 ease-in-out transition-all "
                        >
                            {value.title}
                        </button>
                    ) : (
                        value.links &&(
                            <Link
                            to={value.links}
                            key={value.id}
                            className="text-base font-normal p-2 rounded-xl bg-red-400 hover:bg-red-500 text-neutral-100 hover:text-neutral-50 duration-300 ease-in-out transition-all "
                        >
                            {value.title}
                        </Link>
                        )                 
                    )
                )}
            </div>
        </div>
    );
};

export default Navbar;
