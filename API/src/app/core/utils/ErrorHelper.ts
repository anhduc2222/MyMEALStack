module ErrorHelper {
    export function validationError(resource:string, field:string, code:number, message:string, details?:string):any {
        return {
            name: 'Validation',
            resource: resource,
            field: field,
            code: code,
            message: message,
            details: details,
        }
    }
   
}


export  = ErrorHelper;