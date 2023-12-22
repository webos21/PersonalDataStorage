import { styled, keyframes } from '@mui/system';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';

const pulse = keyframes`
  0% {transform: scale(1);}
  20% {transform: scale(1.4);} 
  50% {transform: scale(.9);} 
  80% {transform: scale(1.2);} 
  100% {transform: scale(1);}
`;

const sonar = keyframes`
  0% {transform: scale(.9); opacity:1;}
  100% {transform: scale(2);opacity: 0;}
`;

const BadgeNum = styled('div')({
    /* Your existing CSS properties */
    animation: `${pulse} 1.5s 1`,
    '&:after': {
        /* Your existing CSS properties */
        animation: `${sonar} 1.5s 1`,
        content: "''",
        display: 'block',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle, #01a9fe 100%, transparent 100%)',
        opacity: 0
    }
});

const AlarmAnimation = () => {
    const [count, setCount] = useState(1);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCount((prev) => prev + 1);
        }, 2000); // Update every 2 seconds

        return () => clearInterval(intervalId); // Cleanup the interval on component unmount
    }, []);

    return (
        <Box id="badge">
            <BadgeNum>{count}</BadgeNum>
        </Box>
    );
};

export default AlarmAnimation;
