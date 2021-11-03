import AdminLayout from "layouts/admin";
import { Fragment } from "react";
import AdminPageTitle from "@components/Admin/PageTitle";
import { useState } from "react";
import { Tab } from "@headlessui/react";
import OurTeam from "@components/Settings/Team";
import EventsAdmin from "@components/Settings/Events";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const SettingsAdmin = () => {
  let [categories] = useState({
    [`Our Team`]: [
      {
        id: 1,
        content: <OurTeam />,
      },
    ],
    [`Events`]: [
      {
        id: 1,
        content: <EventsAdmin />,
      },
    ],
    [`Slider`]: [
      {
        id: 1,
        content: <EventsAdmin />,
      },
    ],
  });

  return (
    <Fragment>
      <AdminPageTitle title="Settings" />
      <div className="px-6 lg:px-10 -mt-52">
        <div className="w-full mx-auto px-2 py-16 sm:px-0">
          <Tab.Group>
            <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
              {Object.keys(categories).map((category) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    classNames(
                      "w-full py-2.5 text-sm leading-5 font-medium text-primary rounded-lg",
                      "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
                      selected
                        ? "bg-white shadow font-semibold"
                        : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                    )
                  }
                >
                  {category}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-2">
              {Object.values(categories).map((posts, idx) => (
                <Tab.Panel
                  key={idx}
                  className={classNames(
                    "bg-white dark:bg-gray-700 rounded-xl p-3",
                    "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60"
                  )}
                >
                  {posts.map((post) => (
                    <div>{post.content}</div>
                  ))}
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </Fragment>
  );
};

SettingsAdmin.layout = AdminLayout;
export default SettingsAdmin;
