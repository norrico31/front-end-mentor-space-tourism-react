import {useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import Main from "../components/Main";

export default function Space() {
    const root = document.querySelector('#root');
    let primaryNav = useRef(null);

    useEffect(function() {
        let flag = false;
        primaryNav.current = document.getElementById('primary-navigation');
        if (!flag) {
            root.removeAttribute('class');
            primaryNav.current.classList.remove('tech-nav');
            root.classList.add('home');
        }
         return () => flag = true;
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    console.log('Space Component')
    return (
        <Main mainStyle='grid-container grid-container--home'>
            <div>
                <h1 className="text-accent fs-500 ff-sans-cond uppercase letter-spacing-1">So, you want to travel to <span className="d-block fs-900 ff-serif text-white">Space</span></h1>
                <p>Let’s face it; if you want to go to space, you might as well genuinely go to 
                    outer space and not hover kind of on the edge of it. Well sit back, and relax 
                    because we’ll give you a truly out of this world experience!
                </p> 
            </div>
            <div>
                <Link to="destination" className="large-button uppercase ff-serif text-dark bg-white">Explore</Link>
            </div>
        </Main>
    )
}
