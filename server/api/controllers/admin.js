import * as adminService from '../services/admin.js';

//Setting the response to error message if the status code is 500
const errorhandler = (message, response) =>{
    response.status(500);
    response.json({ error:message });
};

//Setting the response to fetch data if the status code is 200
const setSuccessResponse = (data, response) =>{
    response.status(200);
    response.json(data);
};

// Implemented the function to get admins
export const index = async (request,response) => {
    try{
    const adminCollection =  await adminService.get();
    console.log(adminCollection);
    setSuccessResponse(adminCollection, response);
    } catch(e){
        errorhandler(e.message, response);
    }
};

export const update = async(request, response) => {
    try {
        const id = request.params.id;
        const admin = {...request.body, id};
        const updateAdmin = await adminService.update(admin);
        setSuccessResponse(updateAdmin, response);
    } catch(e) {
        errorhandler(e.message, response);
    }
};

export const save = async (request, response) => {
    try{
        const admin = {...request.body};
        const newAdmin = await adminService.create(admin);
        setSuccessResponse(newAdmin, response);
    } catch(e) {
        errorhandler(e.message, response);
    }
};

export const remove = async(request, response) => {
    try {
        const id = request.params.id;
        const admin = await adminService.remove(id);
        setSuccessResponse({ message: `Admin Removed Successfully. id: ${id}`}, response);
    } catch(e) {
        errorhandler(e.message, response);
    }
};