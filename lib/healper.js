import Resizer from "react-image-file-resizer";

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
