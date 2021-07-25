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
  const dt = new Date(timestamp.toDate().toDateString());
  return date.format(dt, "ddd, MMM DD YYYY");
};
