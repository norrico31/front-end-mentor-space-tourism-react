import { useState, useEffect, useRef } from "react";
import { Button } from "../components/Button";
import Main from "../components/Main";
import TabList from '../components/TabList';
import {Picture} from '../components/Picture';
import data from '../data.json';

const crews = data.crew.reduce((total, crew) => ({...total, [crew.role]:crew}), {});

export default function Crew() {
    const root = document.getElementById('root');
    const [role, roleSet] = useState('Commander');
    const crew = crews[role];
    let primaryNav = useRef(null);

    useEffect(() => {
        let flag = false;
        primaryNav.current = document.getElementById('primary-navigation');
        if (!flag) {
            root.removeAttribute('class');
            primaryNav.current.classList.remove('tech-nav');
            root.classList.add('crew');
        }
        return () => flag = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleClick = role => () => roleSet(role);
    console.log('Crew Component')

    return (
        <Main mainStyle="grid-container grid-container--crew flow">
            <h1 className="numbered-title"><span aria-hidden="true">02</span> Meet your crew</h1>
            <TabList className="dot-indicators flex" role="tablist" aria-label="crew member list">
                <Button aria-selected={role === 'Commander' ? 'true' : 'false'} role="tab" tabIndex="0" onClick={handleClick('Commander')}>
                    <span className="sr-only">The commander</span>
                </Button>
                <Button aria-selected={role === 'Mission Specialist' ? 'true' : 'false'} role="tab" tabIndex="-1" onClick={handleClick('Mission Specialist')}>
                    <span className="sr-only">The mission specialist</span>
                </Button>
                <Button aria-selected={role === 'Pilot' ? 'true' : 'false'} role="tab" tabIndex="-1" onClick={handleClick('Pilot')}>
                    <span className="sr-only">The pilot</span>
                </Button>
                <Button aria-selected={role === 'Flight Engineer' ? 'true' : 'false'} role="tab" tabIndex="-1" onClick={handleClick('Flight Engineer')}>
                    <span className="sr-only">The crew engineer</span>
                </Button>
            </TabList>
            <Article role={crew.role} bio={crew.bio} name={crew.name} />
            <Picture png={crew.images.png} webp={crew.images.webp} name={crew.name} />
        </Main>
    )
}

function Article(props) {
    const {role, bio, name} = props;
    return (
        <article className="crew-details flow" role="tabpanel">
            <header className="flow flow--space-small">
                <h2 className="fs-600 ff-serif uppercase">{role}</h2>
                <p className="fs-700 uppercase ff-serif">{name}</p>
            </header>
            <p>{bio}</p>
        </article> 
    )
}

