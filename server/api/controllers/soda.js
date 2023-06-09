import * as sodaService from '../services/soda.js';

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

// Implemented the function to get a soda
export const index = async (request,response) => {
    try{
    const sodaCollection =  await sodaService.get();
    console.log(sodaCollection);
    setSuccessResponse(sodaCollection, response);
    } catch(e){
        errorhandler(e.message, response);
    }
};

// Implemented the function to update a soda quantities
export const update = async(request, response) => {
    try {
        const id = request.params.id;
        const soda = {...request.body, id};
        const updateSoda = await sodaService.update(soda);
        setSuccessResponse(updateSoda, response);
    } catch(e) {
        errorhandler(e.message, response);
    }
};

export const save = async (request, response) => {
    try{
        const soda = {...request.body};
        const newSoda = await sodaService.create(soda);
        setSuccessResponse(newSoda, response);
    } catch(e) {
        errorhandler(e.message, response);
    }
};

export const remove = async(request, response) => {
    try {
        const id = request.params.id;
        const soda = await sodaService.remove(id);
        setSuccessResponse({ message: `Soda Removed Successfully. id: ${id}`}, response);
    } catch(e) {
        errorhandler(e.message, response);
    }
};