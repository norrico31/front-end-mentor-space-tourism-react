import {useState, useRef} from 'react'
import {NavLink, Link} from 'react-router-dom';
import {useClickOutside} from '../hooks/useHook';
import {AnimatePresence, motion} from 'framer-motion';
import Logo from '../assets/shared/logo.svg';

function Header() {
    const [toggle, toggleSet] = useState(false);
    const nav = useRef(null);
    const navToggle = useRef(null);
    const handleClick = () => {
        const visibility = nav.current.getAttribute("data-visible");
        toggleSet(true);
        if (visibility === 'false') {
            nav.current.setAttribute('data-visible', true);
            navToggle.current.setAttribute('aria-expanded', true);
        } else {
            nav.current.setAttribute('data-visible', false);
            navToggle.current.setAttribute('aria-expanded', false);
        }
    }
    useClickOutside(nav, () => {
        if (toggle) toggleSet(false);
    });
    return (
        <>
            <Link to="#main" className="skip-to-content">Skip to content</Link>
            <header className="primary-header flex">
                <div>
                    <Link to="/" ><motion.img src={Logo} alt="space tourism logo" className="logo" variants={motionLogo} initial='hidden' animate='visible'/></Link>
                </div>
                <button className="mobile-nav-toggle" aria-controls="primary-navigation" onClick={handleClick} ref={navToggle} data-expanded={toggle ? "true" : "false"}><span className="sr-only" aria-expanded="false">Menu</span></button>
                <nav>
                    <AnimatePresence>
                        <motion.ul id="primary-navigation" data-visible={toggle ? "true" : "false"} className="primary-navigation underline-indicators flex" ref={nav} variants={ulVariant} animate='visible' initial='hidden'>
                            <motion.li variants={liVariant}><NavLink className={className} to="/" onClick={handleClose(toggleSet)}><span aria-hidden="true">00</span>Home</NavLink></motion.li>
                            <motion.li variants={liVariant}><NavLink className={className} to="destination" onClick={handleClose(toggleSet)}><span aria-hidden="true">01</span>Destination</NavLink></motion.li>
                            <motion.li variants={liVariant}><NavLink className={className} to="crew" onClick={handleClose(toggleSet)}><span aria-hidden="true">02</span>Crew</NavLink></motion.li>
                            <motion.li variants={liVariant}><NavLink className={className} to="technology" onClick={handleClose(toggleSet)}><span aria-hidden="true">03</span>Technology</NavLink></motion.li>
                        </motion.ul>
                    </AnimatePresence>
                </nav>
            </header>
        </>
    )
}

export default Header


const handleClose = cbSetter => () => cbSetter(false);
let className = `${({isActive}) => isActive && 'active' } ff-sans-cond uppercase text-white letter-spacing-2`

const motionLogo = {
    hidden: {
        opacity: 0,
        x: '-200px'
    },
    visible: {
        opacity: 1,
        x: '0px',
        transition: {duration: 1, delay: 3}
    }
}
const ulVariant = {
    hidden: {
       opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.2,
            delay: 2,
            when: 'beforeChildren',
            staggerChildren: 0.2
        }
    }
}
const liVariant = {
    hidden: {
        x: '100vw'
    },
    visible: {
        x: 0,
        transition: {
            type: 'forwards'
        }
    }
}