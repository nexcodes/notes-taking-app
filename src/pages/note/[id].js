import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { RiEdit2Line } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import supabase from "../../lib/supabase";
import { navigate } from "gatsby";
import NoteInputForm from "../../components/notes/NoteInputForm";
import { format } from "date-fns";
import { Interweave } from "interweave";

const Note = ({ params }) => {

  const [note, setNote] = useState([]);
  const [changeHappen, setChangeHappen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase
          .from("Note")
          .select()
          .eq("id", params.id);

        setNote(data[0]);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [changeHappen]);

  const SaveNote = async () => {
    const { error } = await supabase
      .from("Note")
      .update({ saved: true })
      .eq("id", params.id);
    setChangeHappen((prev) => !prev);
  };

  const UnSaveNote = async () => {
    const { error } = await supabase
      .from("Note")
      .update({ saved: false })
      .eq("id", params.id);
    setChangeHappen((prev) => !prev);
  };
  const onDelete = async () => {
    const { error } = await supabase.from("Note").delete().eq("id", params.id);
    navigate(`/notes/${note.userId}`);
  };
  const onClose = () => setIsOpen(false);

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <NoteInputForm
        isOpen={isOpen}
        onClose={onClose}
        title={note.title}
        body={note.body}
      />
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="flex items-center justify-between ">
          <div className="flex items-center space-x-4">
            <IoIosArrowBack
              onClick={() => navigate(`/notes/${note.userId}`)}
              className="text-gray-400 border-gray-400 dark:text-gray-200 dark:border-gray-200 border p-1 rounded-lg cursor-pointer"
              size={34}
            />
          </div>
          <div className="flex items-center space-x-4">
            {note.saved ? (
              <AiTwotoneHeart
                onClick={() => UnSaveNote()}
                className="text-gray-400 border-gray-400 dark:text-gray-200 dark:border-gray-200 border p-1 rounded-lg cursor-pointer"
                size={34}
              />
            ) : (
              <AiOutlineHeart
                onClick={() => SaveNote()}
                className="text-gray-400 border-gray-400 dark:text-gray-200 dark:border-gray-200 border p-1 rounded-lg cursor-pointer"
                size={34}
              />
            )}
            <RiEdit2Line
              onClick={() => setIsOpen(true)}
              className="text-gray-400 border-gray-400 dark:text-gray-200 dark:border-gray-200 border p-1 rounded-lg cursor-pointer"
              size={34}
            />
            <MdDelete
              onClick={() => onDelete()}
              className="text-gray-400 border-gray-400 dark:text-gray-200 dark:border-gray-200 border p-1 rounded-lg cursor-pointer"
              size={34}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-gray-600 marker:dark:text-white text-xl font-bold leading-6">
            {note.title}
          </h3>
          <span className="text-xs font-normal text-gray-400 dark:text-gray-300">
            {note.created_at && format(new Date(note.created_at), "PPP")}
          </span>
          <div className="note">
            <Interweave content={note.body} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Note;

export const Head = () => {
  return <title>Notes / Detail</title>;
};
