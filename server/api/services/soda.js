import sodaCollection from "../models/soda.js";

export const update = (soda) => {
    soda._id = soda.id;
    const promise = sodaCollection.findByIdAndUpdate(soda.id, soda, { new: true }).exec();
    return promise;
};

// Implemented the function to get and display a task collection
export const get = (params = {}) =>{
    const promise = sodaCollection.find(params).exec();
    return promise;
};

export const create = (soda) => {
    const newSoda = new sodaCollection(soda);
    return newSoda.save();
}; 

export const remove = (id) => {
    const promise = sodaCollection.findByIdAndRemove(id).exec();
    return promise;
};