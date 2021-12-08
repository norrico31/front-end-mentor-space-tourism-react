import {useEffect, useRef} from 'react';

export default function TabList({handleClick, children, ...props}) {
    const tabList = useRef(null);
    let tabs = useRef([]);
    let tabFocus = useRef(0);
    
    useEffect(() => {
        tabs.current = tabList.current.querySelectorAll('[role="tab"]');
    }, [])
    
    const handleTabFocus = evt => {
        const keydownLeft = 37;
        const keydownRight = 39;
        
        // change the tabindex of the current tab to -1
        if (evt.keyCode === keydownLeft || evt.keyCode === keydownRight) {
            tabs.current[tabFocus.current].setAttribute("tabindex", -1);
    
             // if the right key is pushed, move to the next tab on the right
            if (evt.keyCode === keydownRight) {
                tabFocus.current++;
                if (tabFocus.current >= tabs.current.length) tabFocus.current = 0;
            } else if (evt.keyCode === keydownLeft) {
                tabFocus.current--;
                if (tabFocus.current < 0) tabFocus.current = (tabs.current.length - 1);
                // if (tabFocus.current <= -1) tabFocus.current = (tabs.current.length -1);
            }
            // console.log(tabFocus.current);
            tabs.current[tabFocus.current].setAttribute("tabindex", 0);
            tabs.current[tabFocus.current].focus();
        }
    }
    return (
        <div {...props} ref={tabList} onKeyDown={handleTabFocus}>
           {children}
        </div>
    )
}
