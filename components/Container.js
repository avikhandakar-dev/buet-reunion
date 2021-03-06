const Container = ({ children, maxWidth = "max-w-7xl", bgColor }) => {
  return (
    <div className={`${bgColor}  mx-auto`}>
      <div className={`mx-auto ${maxWidth} px-4 sm:px-6 py-16 relative`}>
        {children}
      </div>
    </div>
  );
};

export default Container;
