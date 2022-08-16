import React, { useEffect, useState } from 'react';
import './Nav.css';

function Nav() {
    const [isScrolled, setScroll] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 400) {
                setScroll(true);
            } else setScroll(false);
        });

        return () => {
            window.removeEventListener("scroll", setScroll(false));
        };
    }, []);

    return (
        <nav className={`nav ${isScrolled && "nav__black"}`}>
            <div className="nav__logo">OnlineFlix</div>
            <img
                className='nav__avatar'
                src="https://rb.gy/g1pwyx"
                alt="Avatar" />
        </nav>
    )
}

export default Nav;