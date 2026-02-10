import React from 'react';

const UserDetails = ({ userDetails, setUserDetails }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="px-6 -mt-16 relative z-20">
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1)] border border-white/40 flex flex-col gap-5">

                <div className="relative group">
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={userDetails.name}
                        onChange={handleChange}
                        placeholder=" "
                        className="block py-2.5 px-0 w-full text-base text-coffee bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-coffee peer transition-colors"
                    />
                    <label
                        htmlFor="name"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-coffee peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Your Name
                    </label>
                </div>

                <div className="relative group">
                    <input
                        type="number"
                        name="table"
                        id="table"
                        value={userDetails.table}
                        onChange={handleChange}
                        placeholder=" "
                        className="block py-2.5 px-0 w-full text-base text-coffee bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-coffee peer transition-colors"
                    />
                    <label
                        htmlFor="table"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-coffee peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Table Number
                    </label>
                </div>

            </div>
        </div>
    );
};

export default UserDetails;
