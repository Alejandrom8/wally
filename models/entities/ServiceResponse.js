class ServiceResponse{
    constructor({
        success = false,
        message = '',
        errors = '',
        data = []
    } = {}){
        this.success = success;
        this.message = message;
        this.errors = errors;
        this.data = data;
    }
}

module.exports = ServiceResponse;