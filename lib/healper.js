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
