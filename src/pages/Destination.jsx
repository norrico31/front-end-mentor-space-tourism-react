import {useState, useEffect, useRef} from 'react';
import Main from "../components/Main";
import TabList from '../components/TabList'
import {Button} from '../components/Button';

import data from '../data.json';
const destinations = data.destinations.reduce((total, item) => ({...total, [item.name]: item}), {});

export default function Destination() {
    const root = document.querySelector('#root');
    const [planet, planetSet] = useState('Moon')
    const destination = destinations[planet];
    let primaryNav = useRef(null);
    useEffect(function() {
        let flag = false;
        primaryNav.current = document.getElementById('primary-navigation'); 
        if (!flag) {
            root.removeAttribute('class');
            primaryNav.current.classList.remove('tech-nav');
            root.classList.add('destination');
        }
        return () => flag = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [primaryNav])
    
    const handleClick = planetArg => () =>  planetSet(planetArg);
    console.log('Destination Component')
    
    return (
        <Main mainStyle='grid-container grid-container--destination flow'>
            <h1 className="numbered-title"><span aria-hidden="true">01</span> Pick your destination</h1>
            <picture>
                <source srcSet={destination.images.webp} type="image/webp" />
                <img src={destination.images.png} alt={`The ${planet}`} />
            </picture>
        
            <TabList className="tab-list underline-indicators flex" role="tablist" aria-label="destination list">
                <Button aria-selected={planet === 'Moon' ? "true" : "false"} tabIndex="0" role="tab" className="uppercase ff-sans-cond text-accent letter-spacing-2" onClick={handleClick('Moon')}>Moon</Button>
                <Button aria-selected={planet === 'Mars' ? "true" : "false"} tabIndex="-1" role="tab" className="uppercase ff-sans-cond text-accent letter-spacing-2" onClick={handleClick('Mars')}>Mars</Button>
                <Button aria-selected={planet === 'Europa' ? "true" : "false"} tabIndex="-1" role="tab" className="uppercase ff-sans-cond text-accent letter-spacing-2" onClick={handleClick('Europa')}>Europa</Button>
                <Button aria-selected={planet === 'Titan' ? "true" : "false"} tabIndex="-1" role="tab" className="uppercase ff-sans-cond text-accent letter-spacing-2" onClick={handleClick('Titan')}>Titan</Button>
            </TabList>

            {/* <!-- The moon --> */}
            <Article 
                destinationClassName="destination-meta flex"
                className="destination-info flow"
                tabIndex="0"
                role="tabpanel"
                destination={destination}
            />
        </Main>
    )
}

function Article({destination: {name, description, distance, travel}, destinationClassName, ...rest}) {
    return (
        <article {...rest} id="moon-tab" tabIndex="0" role="tabpanel">
            <h2 className="fs-800 uppercase ff-serif">{name}</h2>
            <p>{description}</p>
            <div className={destinationClassName}>
                <div>
                    <h3 className="text-accent fs-200 uppercase">Avg. distance</h3>
                    <p className="ff-serif uppercase">{distance}</p>
                </div>
                <div>
                    <h3 className="text-accent fs-200 uppercase">Est. travel time</h3>
                    <p className="ff-serif uppercase">{travel}</p>
                </div>
            </div>
        </article>
    )
}
