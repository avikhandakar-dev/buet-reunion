const GMap = () => {
  return (
    <div className="w-full h-screen relative">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12686.73431846735!2d-121.98877622468528!3d37.349999175838896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fca6d3808fcd1%3A0xe4eded4330a64e36!2sSanta%20Clara%2C%20CA%2095055%2C%20USA!5e0!3m2!1sen!2sbd!4v1636297025114!5m2!1sen!2sbd"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowfullscreen=""
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default GMap;
