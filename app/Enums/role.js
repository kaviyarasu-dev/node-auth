class Role {
    static ADMIN = 0;
    static USER = 1;

    static get values() {
        return [this.ADMIN, this.USER];
    }

    static get labels() {
        return {
            [this.ADMIN]: 'Admin',
            [this.USER]: 'User',
        };
    }

    static get(key) {
        return {key: key, value: this[key], label: this.labels[key]};
    }

    static getValue(key) {
        return this.get(key);
    }

    static getLabel(key) {
        return this.labels[key];
    }
}

export default Role;