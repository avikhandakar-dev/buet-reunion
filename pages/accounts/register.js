import { useState, useCallback, useEffect, useRef } from "react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { CgSpinner } from "react-icons/cg";
import debounce from "lodash.debounce";
import AuthLayout from "layouts/auth";
import Footer from "@components/Footer";
import { Country, State } from "country-state-city";
import {
  auth,
  firestore,
  googleAuthProvider,
  serverTimestamp,
} from "@lib/firebase";
import { fetchGetJSON } from "@lib/healper";
import toast from "react-hot-toast";
import { MdHelp } from "react-icons/md";
import { Popover } from "@headlessui/react";

const validCountries = ["US", "CA", "MX"];
const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [hall, setHall] = useState("");
  const [department, setDepartment] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [usernameIsChecking, setUsernameIsChecking] = useState(false);
  const [usernameIsValid, setUsernameIsValid] = useState(false);
  const [countryList, setCountryList] = useState(Country.getAllCountries());
  const [stateList, setStateList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedClass, setSelectedClass] = useState("1991");
  const stateRef = useRef();
  const restrictedName = ["admin", "api"];

  const signInWithGoogle = () => {
    setErrorMessage(null);
    setIsLoading(true);
    auth
      .signInWithPopup(googleAuthProvider)
      .then((result) => {
        return setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        return setErrorMessage(error.message);
      });
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (password != conPassword) {
      return toast.error("The password confirmation does not match!");
    }
    setIsLoading(true);
    setErrorMessage(null);
    if (
      !name ||
      !email ||
      !selectedCountry ||
      !selectedClass ||
      !hall ||
      !department ||
      !phone
    ) {
      setIsLoading(false);
      return toast.error("Please provide all the information!");
    }
    // if (!usernameIsValid) {
    //   setIsLoading(false);
    //   return toast.error("Invalid username!");
    // }
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        userCredential.user.updateProfile({
          displayName: name,
        });
        const userDoc = firestore.doc(`users/${userCredential.user.uid}`);
        // const usernameDoc = firestore.doc(`usernames/${username}`);
        const batch = firestore.batch();
        batch.set(userDoc, {
          // username: username,
          email,
          hall,
          department,
          phone,
          displayName: name,
          country: selectedCountry,
          state: selectedState,
          CBB: selectedClass,
          createdAt: serverTimestamp(),
        });
        // batch.set(usernameDoc, { uid: userCredential.user.uid });
        await batch.commit();
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        return setErrorMessage(error.message);
      });
  };
  const onChange = (event) => {
    const val = event.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if (val.length < 3) {
      setUsername(val);
      setUsernameIsChecking(false);
      setUsernameIsValid(false);
    }

    if (re.test(val)) {
      setUsername(val);
      setUsernameIsChecking(true);
      setUsernameIsValid(false);
    }
  };

  useEffect(() => {
    if (!restrictedName.includes(username)) {
      checkUsername(username);
    } else {
      setUsernameIsChecking(false);
      setUsernameIsValid(false);
    }
  }, [username]);

  // useEffect(async () => {
  //   const geoInfo = await fetchGetJSON("https://freegeoip.app/json/");
  //   // const countryCode = geoInfo?.country_code || "US";
  //   const countryCode = geoInfo?.country_code;
  //   const regionName = geoInfo?.region_name;
  //   if (countryCode && validCountries.includes(countryCode)) {
  //     setSelectedCountry(countryCode);
  //     setSelectedState(regionName);
  //     setStateList(State.getStatesOfCountry(countryCode));
  //   } else {
  //     setStateList(State.getStatesOfCountry("US"));
  //   }
  // }, []);

  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const ref = firestore.doc(`usernames/${username}`);
        const { exists } = await ref.get();
        console.log("Firestore read executed!");
        setUsernameIsValid(!exists);
        setUsernameIsChecking(false);
      }
    }, 500),
    []
  );

  function UsernameMessage({ username, isValid, loading }) {
    if (loading) {
      return <p className="text-sm mt-1">Checking...</p>;
    } else if (isValid) {
      return (
        <p className="text-green-400 text-sm mt-1">{username} is available!</p>
      );
    } else if (username && !isValid) {
      return (
        <p className="text-red-500 text-sm mt-1">That username is taken!</p>
      );
    } else {
      return <p></p>;
    }
  }
  return (
    <div className="flex mt-6 relative min-h-screen flex-col justify-between">
      <div className="flex-grow flex justify-center items-center">
        <div className="w-full max-w-2xl ">
          <div className="px-8 py-10 bg-gray-50 border border-gray-200 dark:border-gray-700 dark:bg-gray-900 rounded">
            <Link href="/">
              <a className="font-cursive text-2xl flex flex-col items-center mb-8">
                <span className="block dark:hidden">
                  <img src="/logo_wot.svg" width={50} />
                </span>
                <span className="hidden dark:block">
                  <img src="/logo_wot_white.svg" width={50} />
                </span>
                <p className="mt-[6px]">
                  BUETian <span className="text-primary">89</span> NA
                </p>
              </a>
            </Link>
            <form
              onSubmit={onSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="block">
                <input
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                  autoComplete="off"
                  value={name}
                  required
                  type="text"
                  name="name"
                  className="block rounded w-full border bg-white dark:bg-black border-gray-200 dark:border-gray-700 text-sm"
                  placeholder="Full Name"
                />
              </div>
              <div className="block">
                <input
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  autoComplete="off"
                  value={email}
                  name="email"
                  required
                  type="email"
                  className="block rounded w-full border bg-white dark:bg-black border-gray-200 dark:border-gray-700 text-sm"
                  placeholder="Email"
                />
              </div>
              <div className="block">
                <input
                  onChange={(event) => {
                    setPhone(event.target.value);
                  }}
                  autoComplete="off"
                  value={phone}
                  required
                  type="tel"
                  name="phone"
                  className="block rounded w-full border bg-white dark:bg-black border-gray-200 dark:border-gray-700 text-sm"
                  placeholder="Phone Number"
                />
              </div>
              <div className="block">
                <select
                  className="block rounded invalid:text-gray-500 w-full border bg-white dark:bg-black border-gray-200 dark:border-gray-700 text-sm"
                  required
                  name="country"
                  onChange={(event) => {
                    setSelectedCountry(event.target.value);
                    setStateList(State.getStatesOfCountry(event.target.value));
                    setSelectedState(null);
                    if (selectedCountry != "MX") {
                      stateRef.current.selectedIndex = 0;
                    }
                  }}
                >
                  <option disabled value="" selected={!selectedCountry}>
                    Country
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
                <div className="block">
                  <select
                    className="block invalid:text-gray-500 rounded w-full border bg-white dark:bg-black border-gray-200 dark:border-gray-700 text-sm"
                    required
                    ref={stateRef}
                    name="state"
                    onChange={(event) => {
                      setSelectedState(event.target.value);
                    }}
                  >
                    <option disabled value="" selected={!selectedState}>
                      State/Province
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
              <div className="block">
                <div className="flex items-center space-x-2">
                  <select
                    className="block flex-1 invalid:text-gray-500 rounded w-full border bg-white dark:bg-black border-gray-200 dark:border-gray-700 text-sm"
                    required
                    name="class"
                    onChange={(event) => {
                      setSelectedClass(event.target.value);
                    }}
                  >
                    {/* <option disabled value="">
                      Actual Class Begins at BUET
                    </option> */}
                    <option value="1989">Class started on - 1989</option>
                    <option value="1990">Class started on - 1990</option>
                    <option selected value="1991">
                      Class started on - 1991
                    </option>
                  </select>
                  <Popover className="relative">
                    <Popover.Button className="text-2xl text-green-500 duration-300 hover:text-green-400">
                      <MdHelp />
                    </Popover.Button>
                    <Popover.Panel className="absolute min-w-[370px] shadow-md p-4 rounded-md left-0 translate-x-[-90%] z-10 bg-green-50">
                      <div className="flex flex-col ">
                        <p className="text-xs text-green-900 font-semibold">
                          1989 - For HSC batch ‘87, class started on May 18,
                          1989
                        </p>
                        <p className="text-xs text-green-900 font-semibold">
                          1990 - For HSC batch ‘88, class started on May 18,
                          1990
                        </p>
                        <p className="text-xs text-green-900 font-semibold">
                          1991 - For HSC batch ‘89, class started on May 18,
                          1991
                        </p>
                      </div>
                    </Popover.Panel>
                  </Popover>
                </div>
              </div>
              <div className="block">
                <select
                  className="block invalid:text-gray-500 rounded w-full border bg-white dark:bg-black border-gray-200 dark:border-gray-700 text-sm"
                  required
                  name="department"
                  onChange={(event) => {
                    setDepartment(event.target.value);
                  }}
                >
                  <option disabled value="" selected>
                    Buet Department
                  </option>
                  <option value="Arch">Arch</option>
                  <option value="ChE">ChE</option>
                  <option value="CE">CE</option>
                  <option value="CSE">CSE</option>
                  <option value="EE">EE</option>
                  <option value="ME">ME</option>
                  <option value="NAME">NAME</option>
                  <option value="MET">MET</option>
                </select>
              </div>

              <div className="block">
                <select
                  className="block invalid:text-gray-500 rounded w-full border bg-white dark:bg-black border-gray-200 dark:border-gray-700 text-sm"
                  required
                  name="hall"
                  onChange={(event) => {
                    setHall(event.target.value);
                  }}
                >
                  <option disabled value="" selected>
                    Buet Hall
                  </option>
                  <option value="Ahsanullah Hall">Ahsanullah Hall</option>
                  <option value="Titumir Hall">Titumir Hall</option>
                  <option value="Chatri Hall">Chatri Hall</option>
                  <option value="Dr. M. A. Rashid Hall">
                    Dr. M. A. Rashid Hall
                  </option>
                  <option value="Kazi Nazrul Islam Hall">
                    Kazi Nazrul Islam Hall
                  </option>
                  <option value="Sher-e-Bangla Hall">Sher-e-Bangla Hall</option>
                  <option value="Suhrawardy Hall">Suhrawardy Hall</option>
                  <option value="Shahid Smriti Hall">Shahid Smriti Hall</option>
                </select>
              </div>

              {/* <div className="block">
                <input
                  onChange={onChange}
                  value={username}
                  required
                  type="text"
                  name="username"
                  className="block rounded w-full border bg-white dark:bg-black border-gray-200 dark:border-gray-700 text-sm"
                  placeholder="Username"
                />
                <UsernameMessage
                  username={username}
                  isValid={usernameIsValid}
                  loading={usernameIsChecking}
                />
              </div> */}
              <div className="block">
                <input
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  autoComplete="off"
                  value={password}
                  required
                  type="password"
                  name="password"
                  className="block rounded w-full border bg-white dark:bg-black border-gray-200 dark:border-gray-700 text-sm"
                  placeholder="Password"
                />
              </div>
              <div className="block">
                <input
                  onChange={(event) => {
                    setConPassword(event.target.value);
                  }}
                  value={conPassword}
                  autoComplete="off"
                  required
                  type="password"
                  name="confirm-password"
                  className="block rounded w-full border bg-white dark:bg-black border-gray-200 dark:border-gray-700 text-sm"
                  placeholder="Confirm Password"
                />
              </div>
              <button
                disabled={isLoading}
                type="submit"
                className="inline-flex md:col-span-2 items-center justify-center w-full px-10 py-2 font-semibold text-white transition duration-500 ease-in-out transform bg-primary rounded hover:bg-sky focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 "
              >
                {isLoading ? (
                  <span className="inline-flex text-2xl animate-spin text-white">
                    <CgSpinner />
                  </span>
                ) : (
                  "Sign up"
                )}
              </button>
              <div className="text-center py-2 md:col-span-2 text-gray-400 text-sm">
                By signing up, you agree to our{" "}
                <Link href="/legal/terms">
                  <a className="font-medium text-gray-500 dark:text-gray-300 transition-colors duration-300 hover:text-primary">
                    Terms
                  </a>
                </Link>{" "}
                ,{" "}
                <Link href="/legal/privacy">
                  <a className="font-medium text-gray-500 dark:text-gray-300 transition-colors duration-300 hover:text-primary">
                    Privacy Policy
                  </a>
                </Link>{" "}
                and{" "}
                <Link href="/legal/cookies">
                  <a className="font-medium text-gray-500 dark:text-gray-300 transition-colors duration-300 hover:text-primary">
                    Cookies Policy
                  </a>
                </Link>{" "}
                .
                {errorMessage ? (
                  <div className="text-red-500 py-2 text-sm font-medium w-full text-center mt-4">
                    {errorMessage}
                  </div>
                ) : null}
              </div>
            </form>
            <div className="relative w-full border-b-2 my-8 border-gray-200 dark:border-gray-700">
              <span className="font-medium text-sm absolute transform left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400 bg-gray-50 px-5 dark:bg-gray-900">
                OR
              </span>
            </div>
            <div>
              <button
                onClick={() => signInWithGoogle()}
                disabled={isLoading}
                className="flex mx-auto font-medium justify-center text-center items-center focus:outline-none outline-none transition-colors hover:text-red-500 duration-300"
              >
                <FcGoogle /> <span className="ml-2">Login with Google</span>
              </button>
            </div>
          </div>
          <div className="text-center mt-4 flex-none">
            Already a member?
            <Link href="/accounts/login">
              <a className="ml-1 text-primary">Sign in</a>
            </Link>
          </div>
        </div>
      </div>
      <Footer variant="small" />
    </div>
  );
};

RegisterPage.layout = AuthLayout;
export default RegisterPage;
