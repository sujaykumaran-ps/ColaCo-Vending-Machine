import adminCollection from "../models/admin.js";

export const update = (admin) => {
    admin._id = admin.id;
    const promise = adminCollection.findByIdAndUpdate(admin.id, admin, { new: true }).exec();
    return promise;
};

// Implemented the function to get and display a task collection
export const get = (params = {}) =>{
    const promise = adminCollection.find(params).exec();
    return promise;
};

export const create = (admin) => {
    const newAdmin = new adminCollection(admin);
    return newAdmin.save();
}; 

export const remove = (id) => {
    const promise = adminCollection.findByIdAndRemove(id).exec();
    return promise;
};