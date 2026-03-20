import React, { useEffect } from 'react'
import userData from '@/controllers/userData';
import useAuth from '@/controllers/Authentication';
const Session = () => {
    const {checkSession} = useAuth();
    const { grabUserData } = userData();
    useEffect(() => {
      void (async () => {
        await checkSession();
        await grabUserData();
      })();
    }, []);
    return <></>
}

export default Session;