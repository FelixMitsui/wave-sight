import { useEffect, useRef } from 'react';

const useSyncCallback = callback => {
    const proxyState = useRef({ current: false });

    const setProxyState = () => {
        proxyState.current = true;
    };

    useEffect(() => {
        if (proxyState.current === true) {
            proxyState.current = false;
            callback();
        }
    });
    return setProxyState;
};
export default useSyncCallback;
