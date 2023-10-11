import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import supabase from "../lib/supabase";
import { navigate } from "gatsby";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Auth = () => {

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();

      if (data?.session?.user?.aud) {
        navigate(`/notes/${data.session.user.id}`);
      }
    })();
  }, []);

  const [variant, setVariant] = useState("Sign In");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleOnSubmit = async (props) => {
    if (variant === "Sign Up") {
      try {
        setIsLoading(true);
        const { data, error } = await supabase.auth.signUp({
          email: props.email,
          password: props.password,
          options: {
            data: {
              name: props.name,
            },
          },
        });

        if (error) {
          toast.error("Sign up failed");
          return;
        }
        if (data) {
          toast.success("Sign up successfully");
          navigate(`/notes/${data.user.id}`);
        }
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    }

    if (variant === "Sign In") {
      try {
        setIsLoading(true);
        const { data, error } = await supabase.auth.signInWithPassword({
          email: props.email,
          password: props.password,
        });

        if (error) {
          toast.error("Sign In failed");
          return;
        }
        if (data) {
          toast.success("Sign In successfully");
          navigate(`/notes/${data.user.id}`);
        }
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
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
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <ToastContainer />

      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            {variant} to your account
          </h1>
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={handleSubmit(handleOnSubmit)}
          >
            {variant === "Sign Up" && (
              <div>
                <label
                  for="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Name
                </label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none dark:focus:border-blue-500"
                  placeholder="Your Name"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs font-light">
                    Please enter your name.
                  </p>
                )}
              </div>
            )}
            <div>
              <label
                for="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none dark:focus:border-blue-500"
                placeholder="Your Email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs font-light">
                  Please enter your email.
                </p>
              )}
            </div>
            <div>
              <label
                for="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                {...register("password", { required: true })}
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                maxLength={24}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none dark:focus:border-blue-500"
              />
              {errors.name && (
                <p className="text-red-500 text-xs font-light">
                  Please enter your password.
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              {isLoading ? Loading() : variant}
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              {variant === "Sign Up"
                ? "Already have an account?"
                : "Don’t have an account yet?"}{" "}
              <span
                onClick={() =>
                  setVariant((prev) =>
                    prev === "Sign Up" ? "Sign In" : "Sign Up"
                  )
                }
                className="font-medium text-blue-600 hover:underline dark:text-blue-500 cursor-pointer"
              >
                {variant === "Sign Up" ? "Sign In" : "Sign Up"}
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;

export const Head = () => {
  return <title>Welcome to Authentication Page</title>;
};
