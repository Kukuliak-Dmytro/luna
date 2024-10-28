import React from "react";
import Link from "next/link";
const HomePage = () => {
    return (
        <>
            <h1>Hello, Luna Edge, my name is Dmytro</h1>
            <ul>
                <li>
                    <Link href="/login">
                        Login
                    </Link>
                </li>
                <li>
                    <Link href="/register">
                        Register
                    </Link>
                </li>
            </ul>
        </>
    );
};

export default HomePage;