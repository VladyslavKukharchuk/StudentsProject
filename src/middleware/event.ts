class Event {
    static forOll([eventType, data], next) {
        switch (eventType) {
            case 'attack':
                console.log(data.userId)
                console.log(typeof (data.userId))
                if (typeof (data.userId) !== "number") {
                    throw new Error('Id must be a number');
                }
                break;
            case 'ability':
                if (typeof (data.userId) !== "number") {
                    throw new Error('Id must be a number');
                }
                break;
            case 'message':
                if (typeof (data.message) !== "string") {
                    throw new Error('Message must be a string');
                }
                break;
            case 'restore':
                if (JSON.stringify(data) !== '{}') {
                    throw new Error('Restore does not need data to work');
                }
                break;
            default:
                throw new Error('You are using an unknown function');
        }
        next()
    }
}

export {Event}