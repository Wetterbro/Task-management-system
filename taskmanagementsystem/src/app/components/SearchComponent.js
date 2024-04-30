"use client"
import {doDBOperations} from './taskOperations';
import {useEffect, useState} from "react";
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { IoCloseOutline } from 'react-icons/io5';


export default function SearchComponent({ tasks, setButtonPressed }) {
    
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showInfoBox, setShowInfoBox] = useState(false);

    useEffect(() => {
        if (searchTerm === '') return setSearchResults(tasks);
        const results = search();
        setSearchResults(results);
        console.log("res", results);
    }, [tasks, searchTerm]);

    function search() {
        if (searchTerm.startsWith("done:")) {
            const value = searchTerm.split(":")[1].trim();
            const isDone = value === "true";
            return tasks.filter(item => item.completed === isDone);
        } else if (searchTerm.startsWith("prio:")) {
            const value = parseInt(searchTerm.split(":")[1].trim(), 10);
            return tasks.filter(item => parseInt(item.priority, 10) === value);
        } else if (searchTerm.startsWith("cat:")) {
            const value = searchTerm.split(":")[1].trim();
            return tasks.filter(item => item.category === value);
        }
        else {
            return tasks.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
        }
    }

    const handleDelete = (id) => {
        console.log('deleting task with id', id);
        doDBOperations({ id }, 'delete');
        setButtonPressed(true);
    }

    const handleCheckboxChange = (item) => (event) => {
        const updatedItem = { ...item, completed: event.target.checked };
        doDBOperations(updatedItem, 'update');
        setButtonPressed(true);
    };

    const toggleInfoBox = () => {
        setShowInfoBox(!showInfoBox);
    };
    
  return (

      <div>
          <button type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
              Search
          </button>

          {isModalOpen ? (
              
              
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur">
                  <div id="hs-basic-modal" className="bg-white  p-6 w-full max-w-md mx-auto max-h-[80vh] overflow-auto">
                      <IoCloseOutline size={32} onClick={() => {
                          setIsModalOpen(false);
                          setButtonPressed(true);
                      }} className="cursor-pointer float-end" />

                      <div className="p-4">
                          <h2 className="text-2xl font-semibold text-gray-900">Search</h2>
                          <input type="text"
                                 placeholder="Search"
                                 value={searchTerm}
                                 onChange={e => setSearchTerm(e.target.value)}
                                 className="w-full border border-gray-300 rounded-md px-4 py-2"/>

                          <IoIosInformationCircleOutline size={32} onClick={toggleInfoBox}/>
                          {showInfoBox && (
                              <div className="info-box outline outline-2 outline-gray-800 p-5">
                                  <p>
                                      search for a title or use one of following search terms:
                                      <br/>
                                      <strong>done: </strong>Search by done status (true or false)
                                      <br/>
                                      <strong>prio: </strong>Search by priority (1-5)
                                      <br/>
                                      <strong>cat: </strong>Search by category
                                      <br/>

                                  </p>
                              </div>
                          )}


                          <p className="mt-2 text-gray-600">Search results:</p>
                          {searchResults.length === 0 && <p>No results found.</p>}

                          <ul className="mt-4">
                              {searchResults.map(item => (
                                  <li key={item.id} className={"outline  outline-2 outline-gray-100 p-5 rounded mt-4"}>
                                      <h3 className={"text-xl font-semibold"}>{item.title}</h3>
                                      <p>{item.message}</p>
                                      <p className={"text-sm"}>{item.category}</p>
                                      <p className={"text-sm"}>Priority: {item.priority}</p>

                                      <button
                                          onClick={() => handleDelete(item.id)}
                                          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">
                                          Delete
                                      </button>

                                      <input checked={item.completed} onChange={handleCheckboxChange(item)}
                                             id="green-checkbox" type="checkbox" value=""
                                             className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"/>
                                      <label className="ms-2 text-sm font-medium text-gray-900">Done!</label>
                                  </li>

                              ))}
                          </ul>
                      </div>

                  </div>

              </div>
          ) : null}
      </div>
  );
}