/**
 * Created by vaduc on 7/19/2016.
 */
/// <reference path="../../../../node_modules/inversify/type_definitions/inversify/inversify.d.ts" />
import { Kernel } from "inversify";

class IocConfig {
    static init() {
        var kernel = new Kernel();

        return kernel;
    }
}

export default IocConfig.init();