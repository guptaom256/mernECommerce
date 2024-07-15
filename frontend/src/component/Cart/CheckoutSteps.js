import React, { Fragment } from "react";
import { MdLocalShipping } from "react-icons/md";
import { MdLibraryAddCheck } from "react-icons/md";
import { MdAccountBalance } from "react-icons/md";
import { Typography, Stepper, Step, StepLabel } from "@mui/material";
import "./CheckoutSteps.css";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <MdLocalShipping />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <MdLibraryAddCheck />,
    },
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <MdAccountBalance />,
    },
  ];

  const stepStyles = {
    boxSizing: "border-box",
    paddingTop: "1vmax",
  };

  return (
    <Fragment>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              style={{
                color: activeStep >= index ? "tomato" : "rgba(0,0,0,0.469)",
                fontSize: "2vmax",
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};

export default CheckoutSteps;
