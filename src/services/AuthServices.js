import httpInstance from "../http-client";

class AddressBookServices {

    getAll() {
        return httpInstance.get(`address-book`);
    }

    create(address_book) {
        return httpInstance.post(`address-book`, address_book);
    }

    getById(id) {
        return httpInstance.get(`address-book/${id}`);
    }

    update(id, address_book) {
        return httpInstance.put(`address-book/${id}`, address_book);
    }

    delete(id) {
        return httpInstance.delete(`address-book/${id}`);
    }
}

export default new AddressBookServices()
