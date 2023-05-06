const ApiError = require("../api-error");
const AccountService = require("../services/account.service");
const MongoDB = require("../utils/mongodb.util");

//Account
exports.create = async (req, res, next) =>{
    if(!req.body?.name){
        return next(new ApiError(400, "Name can not be empty"));
    }

    try{
        const accountService = new AccountService(MongoDB.client);
        const document = await accountService.create(req.body);
        if(document=== undefined){
            // return next(new ApiError(400, "phone registered!"));
            return res.send(false);
        }
        return res.send(true);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occurred while creating the account")
        );
    }
};
exports.checkLogin = async(req, res, next) => {
    try{
        const accountService = new AccountService(MongoDB.client);
        const document = await accountService.check(req.body);
        // if(document=== undefined){
        //     return res.send("Successful")
        // }
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "Err name or password incorrect")
        );
    }
};
exports.update = async(req, res, next) => {
    try{
        const accountService = new AccountService(MongoDB.client);
        const document = await accountService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Account not found"));
        }
        return res.send({ message: "Account was updated successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating account with id=${req.params.id}`)
        );
    }
};

exports.delete= async (req, res, next) => {
    try {
        const accountService = new AccountService(MongoDB.client);
        const document = await accountService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Account not found"));
        }
        return res.send({ message: "Account was deleted successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Could not delete account with id=${req.params.id}`)
        );
    }
};
