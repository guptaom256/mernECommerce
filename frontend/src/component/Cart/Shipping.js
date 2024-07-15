import React, { Fragment, useState } from "react";
import "./Shipping.css";
import { saveShippingInfo } from "../../actions/cartAction.js";
import MetaData from "../layout/MetaData.js";
import { MdOutlinePinDrop } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { MdLocationCity } from "react-icons/md";
import { MdPublic } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { MdOutlineTransferWithinAStation } from "react-icons/md";
import { Country, State } from "country-state-city";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import CheckoutSteps from "./CheckoutSteps.js";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useNavigate();

  const { shippingInfo } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pincode, setPincode] = useState(shippingInfo.pincode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert.error("Phone Number should be 10 digit.");
      return;
    }

    dispatch(
      saveShippingInfo({ address, city, state, country, pincode, phoneNo })
    );
    history("/order/confirm");
  };

  return (
    <Fragment>
      <MetaData title={"Shipping Details"} />
      <CheckoutSteps activeStep={0} />
      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>
          <form
            className="shippingForm"
            encType="multiaprt/form-data"
            onSubmit={shippingSubmit}
          >
            <div>
              <FaHome />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <MdLocationCity />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div>
              <MdOutlinePinDrop />
              <input
                type="number"
                placeholder="Pin Code"
                required
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
            </div>

            <div>
              <FaPhone />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>

            <div>
              <MdPublic />
              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div>
                <MdOutlineTransferWithinAStation />
                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <input
              type="submit"
              value="Continue"
              className="shippingBtn"
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
