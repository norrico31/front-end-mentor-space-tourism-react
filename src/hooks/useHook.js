import {useEffect, useRef} from 'react';

export const useClickOutside = (ref, cb) => useEventListener('click', evt => {
    if (ref.current === null || ref.current.contains(evt.target)) return;
    cb(evt);
}, document);


function useEventListener(eventType, cb, element = window)  {
    const callbackRef = useRef(cb);

    useEffect(function() {
        callbackRef.current = cb;
    }, [cb]);

    useEffect(() => {
        if (element == null) return;
        const handler = evt => callbackRef.current(evt);
        element.addEventListener(eventType, handler);

        return () => element.removeEventListener(eventType, handler);
    }, [eventType, element])
}