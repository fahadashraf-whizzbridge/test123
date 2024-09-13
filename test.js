`"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require("aws-sdk");
require("reflect-metadata");
const api_1 = require("./api");
const common_1 = require("./common");
const config_1 = require("./config");
const db_1 = require("./db");
const mail_service_1 = require("./service/mail-service");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        common_1.loggerSetup({
            level: config_1.config.logLevel,
        });
        common_1.logger.info('Server bootstrap started');
        AWS.config.update({
            credentials: {
                accessKeyId: config_1.config.aws.accessKey,
                secretAccessKey: config_1.config.aws.secretKey,
            },
            region: config_1.config.aws.region,
        });
        console.log(process.env);
        yield db_1.dbConnect();
        mail_service_1.init();
        yield api_1.init();
    });
}
bootstrap().then(() => common_1.logger.info('Server bootstrapped'));