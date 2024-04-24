import React, { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Dictonary = () => {
  const [word, setWord] = useState("");
  const [search, setSearch] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  const DictionaryApi = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  const FetchApi = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data, "test");
      setSearch(data);
    } catch (error) {
      console.log(error);
      setSearch([]);
    }
  };

  useEffect(() => {
    setIsLoading(false);
    if (word) {
      FetchApi(DictionaryApi);
    }
  }, []);

  const searchHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (word) {
        FetchApi(DictionaryApi);
        console.log(DictionaryApi, "fffff");
        setWord("");
      }
    },
    [word, DictionaryApi]
  );

  if (isloading) {
    return <h4>Loading....</h4>;
  }

  return (
    <div className="h-screen bg-black">
      <div className="bg-blue-500 text-white p-14">
        <h1 className="text-3xl text-center">Rohit's Dictionary</h1>
        <form className="md:w-2/5 sm:w-7/12 m-auto mt-5">
          <label
            htmlFor="search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FontAwesomeIcon
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                icon={faMagnifyingGlass}
              />
            </div>
            <input
              value={word}
              type="search"
              id="search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              required
              onChange={(e) => setWord(e.target.value)}
            />
            <button
              onClick={searchHandler}
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      {isloading ? (
        <div> Loading...</div>
      ) : search.length ? (
        <div className="p-10 bg-black text-white">
          <h2 className="text-4xl capitalize text-center font-bold pb-10">
            {search[0]?.word}
          </h2>
          {search[0]?.meanings.map((meaning, index) => (
            <div key={index} className="mt-4">
              <h3 className="text-3xl capitalize font-semibold pb-4">
                {meaning.partOfSpeech}
              </h3>
              {meaning.definitions.map((definition, index) => (
                <p key={index} className="mt-2">
                  <span>{index + 1}.&nbsp;</span> {definition.definition}
                </p>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-black text-white sm:text-3xl text-xl text-center md:p-44 p-20">
          <h1 className="pb-10">{search.title}</h1>
          {search.message || "Type a Word In The Box"}
        </div>
      )}
    </div>
  );
};

export default Dictonary;
