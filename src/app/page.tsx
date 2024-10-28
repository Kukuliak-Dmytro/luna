import React from "react";
import Link from "next/link";
const HomePage = () => {
    return (
        <>
            <h1>Home Page</h1>
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