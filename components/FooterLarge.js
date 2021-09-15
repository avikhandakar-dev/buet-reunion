import { BiRadioCircleMarked } from "react-icons/bi";

const { default: Container } = require("./Container");

const FooterLarge = () => {
  return (
    <footer className="pt-12">
      <Container
        maxWidth="max-w-5xl"
        bgColor="bg-gradient-to-r from-gradient-dark-1-start to-gradient-dark-1-stop"
      >
        <div className="grid grid-cols-4 gap-8">
          <div>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center">
                <div className="mr-2 flex justify-center items-center w-7 h-7 rounded-full border border-pink-400">
                  <BiRadioCircleMarked className="text-2xl text-pink-500" />
                </div>
                <p className="font-semibold">About</p>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center">
                  <div className="mr-2 flex justify-center items-center w-7 h-7 rounded-full border border-pink-400">
                    <BiRadioCircleMarked className="text-2xl text-pink-500" />
                  </div>
                  <p className="font-semibold">Latest News</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center">
                  <div className="mr-2 flex justify-center items-center w-7 h-7 rounded-full border border-pink-400">
                    <BiRadioCircleMarked className="text-2xl text-pink-500" />
                  </div>
                  <p className="font-semibold">Legal</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center">
                  <div className="mr-2 flex justify-center items-center w-7 h-7 rounded-full border border-pink-400">
                    <BiRadioCircleMarked className="text-2xl text-pink-500" />
                  </div>
                  <p className="font-semibold">Projects</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default FooterLarge;
