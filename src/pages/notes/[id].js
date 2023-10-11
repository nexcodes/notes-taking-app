import React, { useEffect, useState } from "react";
// import Header from "../../components/notes/header";
import Tab from "../../components/notes/Tab";
import Note from "../../components/notes/Note";
import NoteInputForm from "../../components/notes/NoteInputForm";
import supabase from "../../lib/supabase";
import { AiOutlinePlus } from "react-icons/ai";
import { navigate } from "gatsby";
import { BiLogOutCircle } from "react-icons/bi";
// import { BsFillMoonStarsFill, BsSunFill } from "react-icons/bs";

const Page = ({ params }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [saveNotes, setSaveNotes] = useState([]);
  const [tab, setTab] = useState("ALL");
  const [changeHappen, setChangeHappen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    (async () => {
      try {
        const { data: getSession, error: err } =
          await supabase.auth.getSession();

        if (!getSession?.session?.user?.id) navigate("/");
        if (getSession.session.user.id !== params.id)
          navigate(`/notes/${getSession.session.user.id}`);

        const { data, error } = await supabase
          .from("Note")
          .select()
          .eq("userId", getSession.session.user.id);

        setNotes(data || []);

        const savedNotes = data.filter((data) => {
          if (data.saved === true) {
            return data;
          }
        });

        setSaveNotes(savedNotes || []);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [changeHappen]);

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
        {/* <div>
          <Header />
        </div> */}

        <div>
          <Tab tab={tab} setTab={setTab} />
        </div>

        <div>
          <NoteInputForm
            isOpen={isOpen}
            onClose={onClose}
            setChangeHappen={setChangeHappen}
          />
        </div>

        <div className="sm:p-4">
          <span className="font-medium text-sm text-gray-700 dark:text-gray-200 block mb-2">
            List notes
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tab === "ALL"
              ? notes.map((note) => <Note key={note.id} note={note} />)
              : saveNotes.map((note) => <Note key={note.id} note={note} />)}
          </div>
        </div>
      </div>

      {/* <div className="p-2 bg-gray-600 fixed bottom-[8.5rem] right-8 inline rounded-full cursor-pointer">
        {darkMode.value ? (
          <BsSunFill
            onClick={darkMode.disable}
            size={30}
            className="text-white"
          />
        ) : (
          <BsFillMoonStarsFill
            onClick={darkMode.enable}
            size={30}
            className="text-white"
          />
        )}
      </div> */}

      {/* Sign out ICON */}
      <div className="p-2 bg-gray-600 fixed bottom-[5.25rem] right-8 inline rounded-full cursor-pointer">
        <BiLogOutCircle
          onClick={async () => {
            await supabase.auth.signOut()
            navigate("/")
          }}
          size={30}
          className="text-white"
        />
      </div>
      {/* ADD NOTE ICON */}
      <div className="p-2 bg-gray-600 fixed bottom-8 right-8 inline rounded-full cursor-pointer">
        <AiOutlinePlus
          onClick={() => setIsOpen(true)}
          size={30}
          className="text-white"
        />
      </div>
    </div>
  );
};

export default Page;

export const Head = () => {
  return <title>Notes / Page</title>;
};
