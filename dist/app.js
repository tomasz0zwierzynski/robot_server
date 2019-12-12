"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const app = express_1.default();
const server = http_1.default.createServer(app);
const port = 3000;
app.get('/', (req, res) => {
    res.send('The sedulous hyena ate the antelope!');
});
socket_io_1.default(http_1.default).on('connection', function (socket) {
    console.log('a user connected');
});
server.listen(port, function () {
    return console.log(`server is listening on ${port}`);
});
//# sourceMappingURL=app.js.map