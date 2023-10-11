import React, { useEffect, useState } from "react";
import Model from "../Model";
import { useForm } from "react-hook-form";
import supabase from "../../lib/supabase";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import useDarkMode from "use-dark-mode";

const NoteInputForm = ({ isOpen, onClose, title, body, setChangeHappen }) => {

  // const darkMode = useDarkMode(true, {
  //   classNameDark: "dark",
  //   classNameLight: "light",
  //   storageKey: "DarkModeKey",
  //   minify: true,
  // });

  
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(null);
  
  useEffect(()=> {
    setValue("<h1>" + body + "</h1>")
  }, [body])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleOnSubmit = async (data) => {
    setIsLoading(true);

    try {
      const { data: getSession, error: err } = await supabase.auth.getSession();

      const { error } = await supabase.from("Note").insert({
        title: data.title,
        body: value,
        userId: getSession.session.user.id,
      });

      if (error) throw new Error(error);
      setChangeHappen((prev) => !prev);
      onClose();
    } catch (err) {
      console.err(err);
    } finally {
      setIsLoading(false);
    }
  };

  const Loading = () => {
    return (
      <div role="status">
        <svg
          aria-hidden="true"
          class="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
    );
  };

  return (
    <Model isOpen={isOpen} onClose={onClose}>
      <form className="mt-4" onSubmit={handleSubmit(handleOnSubmit)}>
        <div className="mb-6">
          <label for="title" className="sr-only">
            Title
          </label>
          <input
            {...register("title")}
            type="text"
            id="title"
            placeholder="Title"
            defaultValue={title || ""}
            className="text-gray-900 bg-white border border-gray-200 dark:border-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 focus:ring-0 text-sm rounded-lg block w-full p-2.5 outline-none"
          />
        </div>
        <div className="no-scroll-bar w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
            <label for="body" className="sr-only">
              Your Note
            </label>
            <ReactQuill theme="snow" defaultValue={body} value={value} onChange={setValue} style={{
              // height: "150px",
              backgroundColor: 'transparent',
              color:  '#000'
              }} />
          </div>
          <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            >
              {isLoading ? Loading() : "Save"}
            </button>
          </div>
        </div>
      </form>
    </Model>
  );
};

export default NoteInputForm;
