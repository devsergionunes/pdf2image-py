"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const getUser = (id) => {
    return {
        "id": id,
        name: 'John Doe',
        email: 'fulano@teste.com',
    };
};
exports.getUser = getUser;
console.log((0, exports.getUser)(1));
