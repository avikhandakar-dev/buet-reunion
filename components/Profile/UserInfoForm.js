import Avatar from "@components/Avatar";
import AuthContext from "@lib/authContext";
import { fetchGetJSON } from "@lib/healper";
import { Country, State } from "country-state-city";
import { useState, useEffect, useRef, useContext } from "react";
import { CgSpinner } from "react-icons/cg";
import toast from "react-hot-toast";
import { firestore } from "@lib/firebase";
import ChangeProfilePicture from "./ChangeProfilePicture";

const validCountries = ["US", "CA", "MX"];
const UserInfoForm = ({ userData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState(userData.email || user.email || "");
  const [name, setName] = useState(
    userData.displayName || user.displayName || ""
  );
  const [bio, setBio] = useState(userData.bio || "");
  const [phone, setPhone] = useState(userData.phone || "");
  const [hall, setHall] = useState(userData.hall || "");
  const [department, setDepartment] = useState(userData.department || "");
  const [countryList, setCountryList] = useState(Country.getAllCountries());
  const [stateList, setStateList] = useState(
    State.getStatesOfCountry(userData.country) || []
  );
  const [selectedCountry, setSelectedCountry] = useState(
    userData.country || ""
  );
  const [selectedState, setSelectedState] = useState(userData.state || null);
  const [selectedClass, setSelectedClass] = useState(userData.CBB || null);
  const stateRef = useRef();
  const [dataChange, setDataChange] = useState(false);

  const handelSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (!name || !selectedCountry || !selectedClass || !phone || !hall) {
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
        phone,
        hall,
        department,
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

  return (
    <form className="lg:-mt-8" onSubmit={handelSubmit}>
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
        <div className="sm:grid grid-cols-12 gap-8">
          <div className="col-span-3 mb-1 sm:mb-0 sm:text-right">
            Name<span className="text-sm align-top">*</span>
          </div>
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
        <div className="sm:grid grid-cols-12 gap-8">
          <div className="mb-1 sm:mb-0 col-span-3 sm:text-right">
            Phone<span className="text-sm align-top">*</span>
          </div>
          <input
            onChange={(event) => {
              setPhone(event.target.value);
              setDataChange(true);
            }}
            value={phone}
            required
            type="tel"
            name="phone"
            className="block col-span-9 dark:placeholder-gray-400 rounded w-full border bg-transparent border-gray-200 dark:border-gray-700 px-2 py-1"
          />
        </div>
        <div className="sm:grid grid-cols-12 gap-8">
          <div className="mb-1 sm:mb-0 col-span-3 sm:text-right">
            Email Address
          </div>
          <input
            value={email}
            name="email"
            readonly
            type="email"
            className="block col-span-9 dark:placeholder-gray-400 rounded w-full border bg-transparent border-gray-200 dark:border-gray-700 px-2 py-1"
          />
        </div>
        <div className="sm:grid grid-cols-12 gap-8">
          <div className="mb-1 sm:mb-0 col-span-3 sm:text-right"></div>
          <button
            type="button"
            disabled={isLoading}
            className="inline-flex w-max items-center justify-center px-16 py-1 font-semibold text-white transition duration-500 ease-in-out transform bg-yellow-500 rounded hover:bg-yellow-400 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 "
          >
            Confirm Email
          </button>
        </div>
        <div className="sm:grid grid-cols-12 gap-8">
          <div className="mb-1 sm:mb-0 col-span-3 sm:text-right">
            Country<span className="text-sm align-top">*</span>
          </div>
          <select
            required
            name="country"
            onChange={(event) => {
              setSelectedCountry(event.target.value);
              setStateList(State.getStatesOfCountry(event.target.value));
              setSelectedState(null);
              if (selectedCountry != "MX") {
                stateRef.current.selectedIndex = 0;
              }
              setDataChange(true);
            }}
            className="block invalid:text-gray-500 col-span-9 dark:placeholder-gray-400 rounded w-full border bg-transparent border-gray-200 dark:border-gray-700 px-2 py-1"
          >
            <option
              disabled
              value=""
              selected={
                !selectedCountry || !validCountries.includes(selectedCountry)
              }
            >
              Choose your country...
            </option>
            {countryList?.map(
              (country) =>
                validCountries.includes(country.isoCode) && (
                  <option
                    selected={country.isoCode == selectedCountry}
                    value={country.isoCode}
                  >
                    {country.name}
                  </option>
                )
            )}
          </select>
        </div>
        {selectedCountry != "MX" && (
          <div className="sm:grid grid-cols-12 gap-8">
            <div className="mb-1 sm:mb-0 col-span-3 sm:text-right">
              State/Province<span className="text-sm align-top">*</span>
            </div>
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
                <option
                  selected={state.name == selectedState}
                  value={state.name}
                >
                  {state.name.replace("District", "")}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="sm:grid grid-cols-12 gap-8">
          <div className="mb-1 sm:mb-0 col-span-3 sm:text-right">
            Session<span className="text-sm align-top">*</span>
          </div>
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
        <div className="sm:grid grid-cols-12 gap-8">
          <div className="mb-1 sm:mb-0 col-span-3 sm:text-right">
            Department<span className="text-sm align-top">*</span>
          </div>
          <select
            className="block invalid:text-gray-500 col-span-9 dark:placeholder-gray-400 rounded w-full border bg-transparent border-gray-200 dark:border-gray-700 px-2 py-1"
            required
            name="department"
            onChange={(event) => {
              setDepartment(event.target.value);
              setDataChange(true);
            }}
          >
            <option disabled value="" selected>
              Buet Department
            </option>
            <option selected={department == "Arch"} value="Arch">
              Arch
            </option>
            <option selected={department == "ChE"} value="ChE">
              ChE
            </option>
            <option selected={department == "CE"} value="CE">
              CE
            </option>
            <option selected={department == "CSE"} value="CSE">
              CSE
            </option>
            <option selected={department == "EE"} value="EE">
              EE
            </option>
            <option selected={department == "ME"} value="ME">
              ME
            </option>
            <option selected={department == "NAME"} value="NAME">
              NAME
            </option>
            <option selected={department == "MET"} value="MET">
              MET
            </option>
          </select>
        </div>
        <div className="sm:grid grid-cols-12 gap-8">
          <div className="mb-1 sm:mb-0 col-span-3 sm:text-right">
            Hall<span className="text-sm align-top">*</span>
          </div>
          <select
            className="block invalid:text-gray-500 col-span-9 dark:placeholder-gray-400 rounded w-full border bg-transparent border-gray-200 dark:border-gray-700 px-2 py-1"
            required
            name="hall"
            onChange={(event) => {
              setHall(event.target.value);
              setDataChange(true);
            }}
          >
            <option disabled value="" selected>
              Buet Hall
            </option>
            <option
              selected={hall == "Ahsanullah Hall"}
              value="Ahsanullah Hall"
            >
              Ahsanullah Hall
            </option>
            <option selected={hall == "Titumir Hall"} value="Titumir Hall">
              Titumir Hall
            </option>
            <option selected={hall == "Chatri Hall"} value="Chatri Hall">
              Chatri Hall
            </option>
            <option
              selected={hall == "Dr. M. A. Rashid Hall"}
              value="Dr. M. A. Rashid Hall"
            >
              Dr. M. A. Rashid Hall
            </option>
            <option
              selected={hall == "Kazi Nazrul Islam Hall"}
              value="Kazi Nazrul Islam Hall"
            >
              Kazi Nazrul Islam Hall
            </option>
            <option
              selected={hall == "Sher-e-Bangla Hall"}
              value="Sher-e-Bangla Hall"
            >
              Sher-e-Bangla Hall
            </option>
            <option
              selected={hall == "Suhrawardy Hall"}
              value="Suhrawardy Hall"
            >
              Suhrawardy Hall
            </option>
            <option
              selected={hall == "Shahid Smriti Hall"}
              value="Shahid Smriti Hall"
            >
              Shahid Smriti Hall
            </option>
          </select>
        </div>
        <div className="sm:grid grid-cols-12 gap-8">
          <div className="mb-1 sm:mb-0 col-span-3 sm:text-right">Bio</div>
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
        <div className="sm:grid grid-cols-12 gap-8">
          <div className="mb-1 sm:mb-0 col-span-3 sm:text-right" />
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
