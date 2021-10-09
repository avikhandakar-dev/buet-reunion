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

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [hall, setHall] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameIsChecking, setUsernameIsChecking] = useState(false);
  const [usernameIsValid, setUsernameIsValid] = useState(false);
  const [countryList, setCountryList] = useState(Country.getAllCountries());
  const [stateList, setStateList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
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
    setIsLoading(true);
    setErrorMessage(null);
    if (
      !name ||
      !email ||
      !selectedCountry ||
      !selectedState ||
      !selectedClass ||
      !hall ||
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

  useEffect(async () => {
    // const geoInfo = await fetchGetJSON("https://extreme-ip-lookup.com/json/");
    const geoInfo = await fetchGetJSON("https://freegeoip.app/json/");
    const countryCode = geoInfo?.country_code || "US";
    const regionName = geoInfo?.region_name;
    console.log(geoInfo);
    if (countryCode) {
      setSelectedCountry(countryCode);
      setSelectedState(regionName);
      setStateList(State.getStatesOfCountry(countryCode));
    }
  }, []);

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
        <div className="w-full max-w-sm ">
          <div className="px-8 py-10 bg-gray-50 border border-gray-200 dark:border-gray-700 dark:bg-gray-900 rounded">
            <div className="font-cursive mb-8 text-2xl uppercase text-center">
              BUETian{" "}
              <span className="bg-primary rounded px-2 py-1 pb-0 text-white inline-block">
                89
              </span>
            </div>
            <form onSubmit={onSubmit}>
              <div className="block mb-2">
                <input
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  value={email}
                  name="email"
                  required
                  type="email"
                  className="block rounded w-full border bg-white dark:bg-black border-gray-200 dark:border-gray-700 text-sm"
                  placeholder="Email"
                />
              </div>
              <div className="block mb-2">
                <input
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                  value={name}
                  required
                  type="text"
                  name="name"
                  className="block rounded w-full border bg-white dark:bg-black border-gray-200 dark:border-gray-700 text-sm"
                  placeholder="Full Name"
                />
              </div>
              <div className="block mb-2">
                <input
                  onChange={(event) => {
                    setPhone(event.target.value);
                  }}
                  value={phone}
                  required
                  type="tel"
                  name="phone"
                  className="block rounded w-full border bg-white dark:bg-black border-gray-200 dark:border-gray-700 text-sm"
                  placeholder="Phone Number"
                />
              </div>
              <div className="block mb-2">
                <select
                  className="block rounded invalid:text-gray-500 w-full border bg-white dark:bg-black border-gray-200 dark:border-gray-700 text-sm"
                  required
                  name="country"
                  onChange={(event) => {
                    setSelectedCountry(event.target.value);
                    setStateList(State.getStatesOfCountry(event.target.value));
                    setSelectedState(null);
                    stateRef.current.selectedIndex = 0;
                  }}
                >
                  <option disabled value="" selected={!selectedCountry}>
                    Country
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
              <div className="block mb-2">
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
              <div className="block mb-2">
                <select
                  className="block invalid:text-gray-500 rounded w-full border bg-white dark:bg-black border-gray-200 dark:border-gray-700 text-sm"
                  required
                  name="class"
                  onChange={(event) => {
                    setSelectedClass(event.target.value);
                  }}
                >
                  <option disabled value="" selected>
                    Class Begins at BUET
                  </option>
                  <option value="1989">1989</option>
                  <option value="1990">1990</option>
                  <option value="1991">1991</option>
                </select>
              </div>
              <div className="block mb-2">
                <input
                  onChange={(event) => {
                    setHall(event.target.value);
                  }}
                  value={hall}
                  required
                  type="text"
                  name="hall"
                  className="block rounded w-full border bg-white dark:bg-black border-gray-200 dark:border-gray-700 text-sm"
                  placeholder="Buet Hall"
                />
              </div>

              {/* <div className="block mb-2">
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
              <div className="block mb-4">
                <input
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  value={password}
                  required
                  type="password"
                  name="password"
                  className="block rounded w-full border bg-white dark:bg-black border-gray-200 dark:border-gray-700 text-sm"
                  placeholder="Password"
                />
              </div>
              <button
                disabled={isLoading}
                type="submit"
                className="inline-flex items-center justify-center w-full px-10 py-2 font-semibold text-white transition duration-500 ease-in-out transform bg-primary rounded hover:bg-sky focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 "
              >
                {isLoading ? (
                  <span className="inline-flex text-2xl animate-spin text-white">
                    <CgSpinner />
                  </span>
                ) : (
                  "Sign up"
                )}
              </button>
              <div className="text-center py-2 text-gray-400 text-sm">
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
              </div>
              {errorMessage ? (
                <div className=" text-red-500 py-2 text-sm font-medium w-full text-center">
                  {errorMessage}
                </div>
              ) : null}
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
