import Recording from "../Models/record.js";


export const addRecord = async (request, response) => {
    
    //    console.log(request.body)
    try {
        // console.log(request.body)
        const newRecord = new Recording(request.body);
        // console.log(newRecord)
        await newRecord.save();
        // console.log("hello")
        
        response.status(200).json(newRecord);
    } catch (error) {

        return response.status(500).json(error.message);

    }
}


export const getRecord=async(request,response)=>{
    try{
        const record= await Recording.find();
        // console.log(record)
        return response.status(200).json(record);
    } catch(error){
        return response.status(500).json(error.message);
    }
 }
