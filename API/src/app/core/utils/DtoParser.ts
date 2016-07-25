var _ = require("lodash");

module DtoParser {
    export function JsonToClass(json, classDto) {
        if (typeof classDto === 'function') classDto = new classDto();
        for (var prop in json) {
            if (!classDto.hasOwnProperty(prop)) {
                continue;
            }

            if (typeof json[prop] === 'object' && !_.isArray(json[prop])) {
                classDto[prop] = JsonToClass(json[prop], classDto[prop]);
            } else {
                classDto[prop] = json[prop];
            }
        }
        
        // Remove fields on class that doesn't exist in JSON object
        var dtoKeys = _.keys(classDto);
        for( var key of dtoKeys) {
            if(!json.hasOwnProperty(key)) {
                delete classDto[key];
            }
        }

        return classDto;
    }

    // Remove properties doesn't existed in DTO
    export function parse(req, dto): void {
        var result = deepPick(req.body.data, dto);
        dto.parseFromJSON(result);
        req.body.data = dto;
    }

    /**
     * Filter DTO: just get fields specified in DTO, if field is embedded field, this method filters inside the embedded filed
     * @param object
     * @param dto
     * @returns {any}
     */
    export function deepPick(object, dto) {
        object = _.pick(object, _.keys(dto));
        _.each(_.keys(dto),  (key)=> {
            if (_.isObject(dto[key]) && !_.isArray(dto[key]) && _.isObject(object[key])) {
                object[key] = deepPick(object[key], dto[key]);
            }
        });
        return object;
    }
}
export = DtoParser;
