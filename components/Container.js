const Container = ({ children, maxWidth = "6xl", bgColor }) => {
  return (
    <div className={`${bgColor} max-w-screen-xl mx-auto`}>
      <div className={`mx-auto max-w-${maxWidth} px-4 sm:px-6 relative`}>
        {children}
      </div>
    </div>
  );
};

export default Container;
