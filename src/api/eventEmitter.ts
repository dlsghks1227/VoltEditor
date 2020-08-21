type Callback = (data?: any) => void;

class EventEmitter
{
    callbacks: Record<string, Callback[]> = {};

    on(event: string, callback: Callback)
    {
        if (!this.callbacks[event])
        {
            this.callbacks[event] = [];
        }
        this.callbacks[event].push(callback);
    }

    emit(event: string, data?: any)
    {
        const cbs = this.callbacks[event];
        if (cbs)
        {
            cbs.forEach((callback) => {
                return callback(data);
            })
        }
    }
}

export const eventEmitter = new EventEmitter();