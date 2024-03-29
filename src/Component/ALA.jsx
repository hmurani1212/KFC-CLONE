import React, { forwardRef, useEffect, useState } from "react";
import axios from 'axios';
import { addToCart } from '../redux/features/cartSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
const ALA = forwardRef((props, ref) => {
   const [products, setProducts] = useState([]);
   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await axios.get('https://fakestoreapi.com/products');
            setProducts(response.data);
         } catch (error) {
            console.error('Error fetching data:', error);
         }
      };

      fetchData();
   }, []);
   const dispatch = useDispatch();
   const send = (e) => {
      dispatch(addToCart(e))
      toast.success('successifuly Add product in your buckect', {
         position: "top-right",
         autoClose: 3000, // 3 seconds
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
     });
   }
   return (
      <div ref={ref} className="relative">
         <h1 className="text-2xl mt-48 md:mt-36 my-10 font-bold">ALA VALUE</h1>
         {products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
               {products.map((element) => {
                  return (
                     <div key={element.id}>
                        <div className="max-w-sm border border-black shadow-slate-600 bg-black rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 my-6">
                           <h1 className="float-right top-0 right-0 bottom-0 relative">Haert</h1>
                           <div className="text-center justify-center">
                              <div className="flex items-center justify-center mt-3">
                                 <img className="rounded-t-lg h-72" src={element.image} alt="" />
                              </div>
                           </div>
                           <div className="p-5">
                              <p>
                                 <h5 className="mb-2 text-2xl font-bold text-white tracking-tight dark:text-white">
                                    {element.title.slice(0, 20)}
                                 </h5>
                              </p>
                              <p className="mb-3 text-white font-normal dark:text-gray-400">
                                 {element.description.slice(0, 30)}.....
                                 <p className="text-xl font-bold">RS {element.price}</p>
                              </p>
                              <div className="text-center relative top-9">
                                 <button
                                    className="inline-flex cursor-pointer items-center px-3 py-2 text-sm font-medium text-center text-white bg-zinc-700 rounded-lg dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    onClick={() => send(element)}
                                 >
                                    Add to Bucket
                                 </button>
                              </div>
                           </div>
                        </div>
                     </div>
                  );
               })}
            </div>
         ) : (
            <div class="flex items-center justify-center h-screen">
               <div role="status" class="text-center">
                  <svg
                     aria-hidden="true"
                     class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                     viewBox="0 0 100 101"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                     <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                  </svg>
                  <span class="sr-only">Loading...</span>
               </div>
            </div>
         )}
      </div>
   );
});

export default ALA;

