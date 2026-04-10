import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';

const CarouselBox = (props) => {
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = props.images.length;

    const handleNext = () => setActiveStep((prev) => prev + 1);
    const handleBack = () => setActiveStep((prev) => prev - 1);

    return (
        <div className="flex-grow flex relative flex-col">
            <SwipeableViews
                index={activeStep}
                onChangeIndex={setActiveStep}
                enableMouseEvents
            >
                {props.images.map((step, index) => (
                    <div key={step.label} className="relative">
                        {Math.abs(activeStep - index) <= 2 && (
                            <img
                                className="block w-full h-[235px] overflow-hidden object-contain"
                                src={step.imgPath}
                                alt={step.label}
                            />
                        )}
                    </div>
                ))}
            </SwipeableViews>
            
            {props.showTitle && (
                <div className="flex w-full h-[35px] pl-4 bg-black/10 absolute items-center top-0 left-0">
                    <p>{props.images[activeStep]?.label}</p>
                </div>
            )}
            
            {props.showControl && props.images.length > 1 && (
                <>
                    <button
                        onClick={handleBack}
                        disabled={activeStep === 0}
                        className="absolute top-1/2 bg-black/10 text-white mx-2 p-1 disabled:opacity-50"
                    >
                        &lt;
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                        className="absolute top-1/2 right-0 bg-black/10 text-white mx-2 p-1 disabled:opacity-50"
                    >
                        &gt;
                    </button>
                </>
            )}
            
            <div className="mt-[-1rem] bg-transparent relative flex justify-center p-2">
                 <span>{activeStep + 1} / {maxSteps}</span>
            </div>
        </div>
    );
};

export default CarouselBox;
