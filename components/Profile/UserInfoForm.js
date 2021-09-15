import Avatar from "@components/Avatar";
import AuthContext from "@lib/authContext";
import { fetchGetJSON } from "@lib/healper";
import { Country, State } from "country-state-city";
import { useState, useEffect, useRef, useContext } from "react";
import { CgSpinner } from "react-icons/cg";
import toast from "react-hot-toast";
import { firestore } from "@lib/firebase";
import ChangeProfilePicture from "./ChangeProfilePicture";

const UserInfoForm = ({ userData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState(userData.email || user.email || "");
  const [name, setName] = useState(
    userData.displayName || user.displayName || ""
  );
  const [bio, setBio] = useState(userData.bio || "");
  const [countryList, setCountryList] = useState(Country.getAllCountries());
  const [stateList, setStateList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(
    userData.country || null
  );
  const [selectedState, setSelectedState] = useState(userData.state || null);
  const [selectedClass, setSelectedClass] = useState(userData.CBB || null);
  const stateRef = useRef();
  const [dataChange, setDataChange] = useState(false);

  const handelSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (!name || !selectedCountry || !selectedState || !selectedClass) {
      return toast.error("Please fill in all the required fields!");
    }
    if (name != user.displayName) {
      try {
        await user.updateProfile({
          displayName: name,
        });
      } catch (error) {
        setIsLoading(false);
        return toast.error(error.message);
      }
    }
    try {
      await firestore.collection("users").doc(user?.uid).update({
        displayName: name,
        country: selectedCountry,
        state: selectedState,
        CBB: selectedClass,
        bio: bio,
      });
    } catch (error) {
      setIsLoading(false);
      return toast.error(error.message);
    }
    toast.success("Your profile updated successfully!");
    setIsLoading(false);
  };

  useEffect(() => {
    const unsubs = async () => {
      if (userData.country && userData.state) {
        setStateList(State.getStatesOfCountry(userData.country));
        return;
      }
      // const geoInfo = await fetchGetJSON("https://extreme-ip-lookup.com/json/");
      const geoInfo = await fetchGetJSON("https://freegeoip.app/json/");
      const countryCode = geoInfo?.country_code || "US";
      const regionName = geoInfo?.region_name;
      if (countryCode) {
        setSelectedCountry(countryCode);
        setSelectedState(regionName);
        setStateList(State.getStatesOfCountry(countryCode));
      }
    };
    return unsubs();
  }, []);
  return (
    <form onSubmit={handelSubmit}>
      <p className="uppercase text-sm font-semibold text-blue-700 dark:text-blue-300">
        User Information
      </p>
      <div className="pl-6 mt-4 flex flex-col space-y-4">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-3 text-right">
            <Avatar
              user={user}
              extraClasses="border-2 border-gray-200 dark:border-gray-700"
            />
          </div>
          <div className="col-span-9">
            <p>{user?.displayName}</p>
            <ChangeProfilePicture className="cursor-pointer font-semibold text-primary text-sm duration-300 hover:text-sky" />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-3 text-right">Name</div>
          <input
            onChange={(event) => {
              setName(event.target.value);
              setDataChange(true);
            }}
            value={name}
            required
            type="text"
            name="name"
            className="block col-span-9 dark:placeholder-gray-400 rounded w-full border bg-transparent border-gray-200 dark:border-gray-700 px-2 py-1"
          />
        </div>
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-3 text-right">Email Address</div>
          <input
            value={email}
            name="email"
            readonly
            type="email"
            className="block col-span-9 dark:placeholder-gray-400 rounded w-full border bg-transparent border-gray-200 dark:border-gray-700 px-2 py-1"
          />
        </div>
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-3 text-right"></div>
          <button
            type="button"
            disabled={isLoading}
            className="inline-flex w-max items-center justify-center px-16 py-1 font-semibold text-white transition duration-500 ease-in-out transform bg-yellow-500 rounded hover:bg-yellow-400 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 "
          >
            Confirm Email
          </button>
        </div>
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-3 text-right">Country</div>
          <select
            required
            name="country"
            onChange={(event) => {
              setSelectedCountry(event.target.value);
              setStateList(State.getStatesOfCountry(event.target.value));
              setSelectedState(null);
              stateRef.current.selectedIndex = 0;
              setDataChange(true);
            }}
            className="block invalid:text-gray-500 col-span-9 dark:placeholder-gray-400 rounded w-full border bg-transparent border-gray-200 dark:border-gray-700 px-2 py-1"
          >
            <option disabled value="" selected={!selectedCountry}>
              Choose your country...
            </option>
            {countryList?.map((country) => (
              <option
                selected={country.isoCode == selectedCountry}
                value={country.isoCode}
              >
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-3 text-right">State/Province</div>
          <select
            className="block invalid:text-gray-500 col-span-9 dark:placeholder-gray-400 rounded w-full border bg-transparent border-gray-200 dark:border-gray-700 px-2 py-1"
            required
            ref={stateRef}
            name="state"
            onChange={(event) => {
              setSelectedState(event.target.value);
              setDataChange(true);
            }}
          >
            <option disabled value="" selected={!selectedState}>
              Your state...
            </option>
            {stateList.map((state) => (
              <option selected={state.name == selectedState} value={state.name}>
                {state.name.replace("District", "")}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-3 text-right">Session</div>
          <select
            className="block invalid:text-gray-500 col-span-9 dark:placeholder-gray-400 rounded w-full border bg-transparent border-gray-200 dark:border-gray-700 px-2 py-1"
            required
            name="class"
            onChange={(event) => {
              setSelectedClass(event.target.value);
              setDataChange(true);
            }}
          >
            <option disabled value="" selected>
              Class Begins at BUET
            </option>
            <option value="1989" selected={selectedClass == "1989"}>
              1989
            </option>
            <option value="1990" selected={selectedClass == "1990"}>
              1990
            </option>
            <option value="1991" selected={selectedClass == "1991"}>
              1991
            </option>
          </select>
        </div>
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-3 text-right">Bio</div>
          <textarea
            onChange={(event) => {
              setBio(event.target.value);
              setDataChange(true);
            }}
            rows="4"
            value={bio}
            placeholder={"A little bit about yourself..."}
            className="block col-span-9 dark:placeholder-gray-500 rounded w-full border bg-transparent border-gray-200 dark:border-gray-700 px-2 py-1"
          />
        </div>
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-3 text-right" />
          <button
            disabled={isLoading || !dataChange}
            type="submit"
            className="inline-flex items-center justify-center w-full px-16 py-1 font-semibold text-white transition duration-500 ease-in-out transform bg-primary rounded hover:bg-sky focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 disabled:bg-gray-500 disabled:text-gray-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="inline-flex text-2xl animate-spin text-white">
                <CgSpinner />
              </span>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default UserInfoForm;
