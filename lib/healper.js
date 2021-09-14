import Resizer from "react-image-file-resizer";
import date from "date-and-time";

export const GetUsersStatus = (users) => {
  const isAdmin = users.filter((user) => {
    if (user.customClaims?.admin) {
      return user;
    }
  });
  const isPremium = users.filter((user) => {
    if (user.customClaims?.premium) {
      return user;
    }
  });
  const isMember = users.filter((user) => {
    if (user.customClaims?.member) {
      return user;
    }
  });
  const isRegistered = users.filter((user) => {
    if (
      !user.customClaims?.member &&
      !user.customClaims?.premium &&
      !user.customClaims?.admin
    ) {
      return user;
    }
  });

  return { isAdmin, isPremium, isMember, isRegistered };
};

export const getFileEx = (fname) => {
  return fname.slice(((fname.lastIndexOf(".") - 1) >>> 0) + 2);
};

export const getFileNameWithoutExt = (fname) => {
  return fname.substring(0, fname.lastIndexOf("."));
};

export const resizeImage = ({
  file,
  width = 1600,
  height = 1600,
  format = "JPEG",
  quality = 70,
}) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      width,
      height,
      format,
      quality,
      0,
      (uri) => {
        resolve(uri);
      },
      "blob"
    );
  });

export async function fetchPostJSON(url, data) {
  try {
    const response = await fetch(url, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data || {}),
    });
    return await response.json();
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function fetchGetJSON(url) {
  try {
    const data = await fetch(url).then((res) => res.json());
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export function formatAmountForStripe(amount, currency) {
  let numberFormat = new Intl.NumberFormat(["en-US"], {
    style: "currency",
    currency: currency,
    currencyDisplay: "symbol",
  });
  const parts = numberFormat.formatToParts(amount);
  let zeroDecimalCurrency = true;
  for (let part of parts) {
    if (part.type === "decimal") {
      zeroDecimalCurrency = false;
    }
  }
  return zeroDecimalCurrency ? amount : Math.round(amount * 100);
}

export const PrintObject = ({ content }) => {
  const formattedContent = JSON.stringify(content, null, 2);
  return <pre>{formattedContent}</pre>;
};

export const getFundingProgress = (raised, goal) => {
  if (!raised || !goal) return 0;
  const percent = Math.round((Number(raised) / Number(goal)) * 100);
  if (percent >= 100) return 100;
  return percent;
};

export const serverTimestampToString = (timestamp, format) => {
  try {
    const dt = new Date(timestamp.toDate().toDateString());
    return date.format(dt, "ddd, MMM DD YYYY");
  } catch (err) {
    const dt = new Date(timestamp._seconds * 1000);
    return date.format(dt, "ddd, MMM DD YYYY");
  }
};

export const timestampToString = (timestamp, format) => {
  try {
    const dt = new Date(timestamp);
    return date.format(dt, "ddd, MMM DD YYYY");
  } catch (err) {
    const dt = new Date(timestamp._seconds * 1000);
    return date.format(dt, "ddd, MMM DD YYYY");
  }
};

export const Truncate = (str, length = 17, ending = "...") => {
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending;
  } else {
    return str;
  }
};

export const randomColor = () => {
  const colors = [
    {
      text: "text-yellow-900",
      bg: "bg-yellow-400 dark:bg-yellow-300",
    },
    {
      text: "text-green-900",
      bg: "bg-green-400 dark:bg-green-300",
    },
    {
      text: "text-red-900",
      bg: "bg-red-400 dark:bg-red-300",
    },
    {
      text: "text-blue-900",
      bg: "bg-blue-400 dark:bg-blue-300",
    },
    {
      text: "text-purple-900",
      bg: "bg-purple-400 dark:bg-purple-300",
    },
    {
      text: "text-pink-900",
      bg: "bg-pink-400 dark:bg-pink-300",
    },
    {
      text: "text-indigo-900",
      bg: "bg-indigo-400 dark:bg-indigo-300",
    },
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};
