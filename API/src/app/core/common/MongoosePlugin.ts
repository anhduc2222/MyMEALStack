/**
 * Created by datrong on 4/16/2016.
 */

module MongoosePlugin {
    export function JsonParser(schema, options) {
        //TODO: implement another functionality
        // schema.set('toJSON', { virtuals: true })
        // schema.pre('save', (next) => {
        //     // var self = this;
        //     // // schema = schema.toJSON
        //     // // schema = (JSON.parse(JSON.stringify(schema)));
        //     // var jsonObject = JSON.parse(JSON.stringify(self));
        //     // jsonObject['access'] = '01293';
        //     next();
        // });
    }
}

export = MongoosePlugin;