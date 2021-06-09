const Container = ({ children, maxWidth = "7xl", bgColor }) => {
  return (
    <div className={`${bgColor}  mx-auto`}>
      <div className={`mx-auto max-w-${maxWidth} px-4 sm:px-6 py-16 relative`}>
        {children}
      </div>
    </div>
  );
};

export default Container;
