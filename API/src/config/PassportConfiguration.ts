/**
 * Created by vaduc on 7/19/2016.
 */
import BearerStrategies = require("./strategies/Bearer");
class PassportConfig {
    static register() {
        BearerStrategies.bearerRegister();
    }
}

Object.seal(PassportConfig);
export = PassportConfig;