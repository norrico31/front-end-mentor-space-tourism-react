import {useState, useEffect, useRef} from 'react';
import Main from '../components/Main';
import TabList from '../components/TabList';
import {Button} from '../components/Button';
import data from '../data.json';

const technologies = data.technology.reduce((total, tech, idx) => ({...total, [idx]: tech}), {});

function techIdName(idx) {
    switch (idx) {
        case 0:
            return 'launch-vehicle';
        case 1:
            return 'space-port';
        case 2:
            return 'space-capsule';
        default:
            return idx;
    }
}

export default function Technology() {
    const root = document.getElementById('root');
    const primaryNav = useRef(null);
    const [tech, techSet] = useState(0);
    const {name, description} = technologies[tech];


    useEffect(() => {
        let flag = true;
        primaryNav.current = document.getElementById('primary-navigation');
        if (flag) {
            root.removeAttribute('class');
            primaryNav.current.classList.add('tech-nav');
            root.classList.add('technology');
        }
        return () => flag = false;
    }, [root])
    const handleClick = index => () => techSet(index);
    console.log('Technology Component')
    return (
        <Main mainStyle="flex flex-container--technology flow">
            <h1 className="numbered-title"><span aria-hidden="true">03</span> Space launch 101</h1>

            <div className="flow">
                <div id={techIdName(tech)} className="technology--img" role="img"></div>

                <TabList className="numbered-indicators flex" role="tablist" aria-label="technology list">
                    <Button aria-selected={tech === 0 ? 'true' : 'false'} role="tab" className="bg-dark ff-serif text-accent" tabIndex="0" onClick={handleClick(0)}>1</Button>
                    <Button aria-selected={tech === 1 ? 'true' : 'false'} role="tab" className="bg-dark ff-serif text-accent" tabIndex="-1" onClick={handleClick(1)}>2</Button>
                    <Button aria-selected={tech === 2 ? 'true' : 'false'} role="tab" className="bg-dark ff-serif text-accent" tabIndex="-1" onClick={handleClick(2)}>3</Button>
                </TabList>
                <Article name={name} description={description} />
            </div>
        </Main>
    )
}

function Article({name, description}) {
    return (
        <article className="tech-details flow" id="commander-tab" role="tabpanel">
            <header className="flow flow--space-small">
            <h2 className="fs-200 ff-sans-cond text-accent uppercase">The terminology ...</h2>
            <p className="fs-700 uppercase ff-serif uppercase">{name}</p>
            </header>
            <p>{description}</p>
        </article> 
    )
}