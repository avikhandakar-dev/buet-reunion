import { useState, useEffect, useContext } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { BiCircle } from "react-icons/bi";
import AuthContext from "@lib/authContext";
import { Country } from "country-state-city";

const BillingAddress = ({ address }) => {
  const [anonymous, setAnonymous] = useState(false);
  const { user } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName);
  const [email, setEmail] = useState(user?.email);
  const [countryList, setCountryList] = useState(Country.getAllCountries());
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const unsubs = () => {
      address({
        name,
        email,
        country: selectedCountry,
        anonymous,
      });
    };
    return unsubs();
  }, [name, email, selectedCountry, anonymous]);

  return (
    <div className="mt-8">
      <h1 className="font-medium lg:text-xl uppercase mb-4 text-gray-600 dark:text-gray-300">
        Address
      </h1>
      <div className="flex space-x-4 w-full relative">
        <div className="w-full">
          <label className="text-sm block mb-2 text-gray-600 dark:text-gray-300">
            Name
          </label>
          <input
            value={name}
            placeholder="Your name"
            onChange={(event) => {
              setName(event.target.value);
            }}
            type="text"
            className="w-full outline-none placeholder-gray-300 dark:placeholder-gray-600 focus:border-gray-200 focus:ring-0 focus:outline-none border-gray-200 rounded-r border-2 dark:border-gray-700 dark:focus:border-gray-700 py-3 px-2 text-sm text-center bg-transparent"
          />
        </div>
        <div className="w-full">
          <label className="text-sm block mb-2 text-gray-600 dark:text-gray-300">
            Email
          </label>
          <input
            value={email}
            placeholder="Email address"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            type="text"
            className="w-full outline-none placeholder-gray-300 dark:placeholder-gray-600 focus:border-gray-200 focus:ring-0 focus:outline-none border-gray-200 rounded-r border-2 dark:border-gray-700 dark:focus:border-gray-700 py-3 px-2 text-sm text-center bg-transparent"
          />
        </div>
      </div>
      <div className="w-full mt-2">
        <label className="text-sm block mb-2 text-gray-600 dark:text-gray-300">
          Country
        </label>
        <select
          className="w-full outline-none placeholder-gray-300 dark:placeholder-gray-600 focus:border-gray-200 focus:ring-0 focus:outline-none border-gray-200 rounded-r border-2 dark:border-gray-700 dark:focus:border-gray-700 py-3 px-4 text-sm text-center bg-transparent"
          required
          name="country"
          onChange={(event) => {
            setSelectedCountry(event.target.value);
          }}
        >
          <option disabled value="" selected>
            None
          </option>
          {countryList?.map((country) => (
            <option value={country.isoCode}>{country.name}</option>
          ))}
        </select>
      </div>
      <div
        onClick={() => setAnonymous(!anonymous)}
        className="flex mt-4 items-center cursor-pointer"
      >
        {!anonymous ? (
          <BiCircle className="text-xl" />
        ) : (
          <FaCheckCircle className="text-xl text-primary" />
        )}
        <p className="ml-2 text-gray-600 dark:text-gray-300">
          Donate as Anonymous
        </p>
      </div>
    </div>
  );
};

export default BillingAddress;
