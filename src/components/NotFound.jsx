import { useEffect, useRef } from "react"
import { Link } from "react-router-dom";

export default function NotFound() {
    const root = document.getElementById('root');
    let primaryNav = useRef(null);
    useEffect(() => {
        let flag = true;
        primaryNav.current = document.querySelector('#primary-navigation');
        if (flag) {
            root.removeAttribute('class');
            primaryNav.current.classList.remove('tech-nav');
            root.classList.add('home');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <main style={{ padding: "2rem" }}>
            <p style={{marginBottom: '1rem'}}>There's nothing here!</p>
            <Link to='/' className="notfound">Go to the home page.</Link>
        </main>
    )
}
