"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const routesUser_1 = __importDefault(require("./routesUser"));
const routesPortugal_1 = __importDefault(require("./routesPortugal"));
const routesEngland_1 = __importDefault(require("./routesEngland"));
const routesEquipas_1 = __importDefault(require("./routesEquipas"));
const routesItaly_1 = __importDefault(require("./routesItaly"));
const routesGermany_1 = __importDefault(require("./routesGermany"));
const routesFrance_1 = __importDefault(require("./routesFrance"));
const routesSpain_1 = __importDefault(require("./routesSpain"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
app.use("/", express_1.default.static(path_1.default.join(__dirname, "../../client/build")));
mongoose_1.default.connect(process.env.MONGODB_URI).then(() => {
    console.log("DB connected");
}).catch(err => {
    console.log(err);
});
app.use(function (inRequest, inResponse, inNext) {
    inResponse.header("Access-Control-Allow-Origin", "*");
    inResponse.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
    inResponse.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
    inNext();
});
app.use('/user', routesUser_1.default);
app.use('/portugal', routesPortugal_1.default);
app.use('/inglaterra', routesEngland_1.default);
app.use('/equipa', routesEquipas_1.default);
app.use('/italia', routesItaly_1.default);
app.use('/alemanha', routesGermany_1.default);
app.use('/franca', routesFrance_1.default);
app.use('/espanha', routesSpain_1.default);
app.listen(8080);
