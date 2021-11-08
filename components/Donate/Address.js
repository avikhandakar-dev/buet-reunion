import { useState, useEffect, useContext } from "react";
import { FaCheckCircle, FaGhost } from "react-icons/fa";
import { BiCircle } from "react-icons/bi";
import AuthContext from "@lib/authContext";
import { Country } from "country-state-city";

const BillingAddress = ({ address }) => {
  const [anonymous, setAnonymous] = useState(false);
  const { user } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName);
  const [email, setEmail] = useState(user?.email);
  const [uid, setUid] = useState(user?.uid);
  const [countryList, setCountryList] = useState(Country.getAllCountries());
  const [selectedCountry, setSelectedCountry] = useState("US");

  useEffect(() => {
    const unsubs = () => {
      address({
        uid,
        name,
        email,
        country: selectedCountry,
        anonymous,
      });
    };
    return unsubs();
  }, [name, email, selectedCountry, anonymous]);

  useEffect(() => {
    const unsubs = () => {
      setEmail(user?.email);
      setName(user?.displayName);
      setUid(user?.uid);
    };
    return unsubs();
  }, [user]);

  return (
    <div className="mt-8">
      <h1 className="font-bold font-serif lg:text-xl mb-4 text-gray-600 dark:text-gray-300">
        Address
      </h1>
      <div
        className={`relative ${anonymous && "opacity-30 pointer-events-none"}`}
      >
        {anonymous && (
          <FaGhost className="text-7xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10" />
        )}
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
              className="w-full outline-none placeholder-gray-300 dark:placeholder-gray-600 focus:border-gray-500 focus:ring-0 focus:outline-none border-gray-500 rounded border-2 dark:border-gray-700 dark:focus:border-gray-700 py-3 px-2 text-sm text-center bg-transparent"
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
              className="w-full outline-none placeholder-gray-300 dark:placeholder-gray-600 focus:border-gray-500 focus:ring-0 focus:outline-none border-gray-500 rounded border-2 dark:border-gray-700 dark:focus:border-gray-700 py-3 px-2 text-sm text-center bg-transparent"
            />
          </div>
        </div>
        <div className="w-full mt-2">
          <label className="text-sm block mb-2 text-gray-600 dark:text-gray-300">
            Country
          </label>
          <select
            className="w-full max-w-xl outline-none placeholder-gray-300 dark:placeholder-gray-600 focus:border-gray-500 focus:ring-0 focus:outline-none border-gray-500 rounded border-2 dark:border-gray-700 dark:focus:border-gray-700 py-3 px-4 text-sm text-center bg-transparent"
            required
            name="country"
            onChange={(event) => {
              setSelectedCountry(event.target.value);
            }}
          >
            <option disabled value="" selected={!selectedCountry}>
              None
            </option>
            {countryList?.map((country, idx) => (
              <option
                key={idx}
                value={country.isoCode}
                selected={country.isoCode == selectedCountry}
              >
                {country.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div
        onClick={() => setAnonymous(!anonymous)}
        className="flex mt-4 items-center cursor-pointer"
      >
        {!anonymous ? (
          <BiCircle className="text-xl" />
        ) : (
          <FaCheckCircle className="text-xl text-green-500" />
        )}
        <p className="ml-2 text-gray-600 dark:text-gray-300">
          Donate as Anonymous
        </p>
      </div>
    </div>
  );
};

export default BillingAddress;
