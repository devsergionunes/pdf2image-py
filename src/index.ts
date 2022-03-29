export const getUser = (id: number) => {
    return {
        "id": id,
        name: 'John Doe',
        email: 'fulano@teste.com',
    };
};
console.log(getUser(1));