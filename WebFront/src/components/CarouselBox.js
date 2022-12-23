import * as React from 'react';

import { Box, IconButton, MobileStepper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import SwipeableViews from 'react-swipeable-views';

const CarouselBox = (props) => {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = props.images.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    return (
        <Box sx={{ flexGrow: 1, display: 'flex', position: 'relative', flexDirection: 'column' }}>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
            >
                {props.images.map((step, index) => (
                    <div key={step.label}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <Box
                                component="img"
                                sx={{
                                    display: 'block',
                                    width: '100%',
                                    height: 235,
                                    overflow: 'hidden',
                                    objectFit: 'contain'
                                }}
                                src={step.imgPath}
                                alt={step.label}
                            />
                        ) : null}
                    </div>
                ))}
            </SwipeableViews>
            {props.showTitle && (
                <Box
                    sx={{
                        display: 'flex',
                        width: '100%',
                        height: 35,
                        pl: 2,
                        bgcolor: 'rgba(0, 0, 0, 0.1)',
                        position: 'absolute',
                        alignItems: 'center',
                        top: 0,
                        left: 0
                    }}
                >
                    <Typography>{props.images[activeStep]?.label}</Typography>
                </Box>
            )}
            {props.showControl && props.images.length > 1 && (
                <IconButton
                    size="small"
                    onClick={handleBack}
                    disabled={activeStep === 0}
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        bgcolor: 'rgba(0, 0, 0, 0.1)',
                        color: 'white',
                        m: '0 8px'
                    }}
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                </IconButton>
            )}
            {props.showControl && props.images.length > 1 && (
                <IconButton
                    size="small"
                    onClick={handleNext}
                    disabled={activeStep === maxSteps - 1}
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        right: '0%',
                        bgcolor: 'rgba(0, 0, 0, 0.1)',
                        color: 'white',
                        m: '0 8px'
                    }}
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </IconButton>
            )}
            <MobileStepper
                steps={maxSteps}
                position="static"
                sx={{ mt: -4, bgcolor: 'transparent', position: 'relative' }}
                activeStep={activeStep}
                backButton={<div />}
                nextButton={<div />}
            />
        </Box>
    );
};

export default CarouselBox;
