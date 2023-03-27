import sodaCollection from "../models/soda.js";

export const update = (soda) => {
    soda._id = soda.id;
    const promise = sodaCollection.findByIdAndUpdate(soda.id, soda, { new: true }).exec();
    return promise;
}

// Implemented the function to search and display a task collection
export const search = (params = {}) =>{
    const promise = sodaCollection.find(params).exec();
    return promise;
};