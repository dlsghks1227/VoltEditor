export class AsyncObject {
    value: Record<string, any> = {};
  
    loadingCallbacks: any = [];
  
    loadedCount: number = 0;
  
    onLoad() {
      this.loadedCount += 1;
      if (this.loadedCount === this.targetCount()) {
        this.loadingCallbacks.forEach((callback: any) => {
          callback(this.value);
        });
        this.loadingCallbacks = [];
      }
    }
  
    targetCount() {
      return Object.keys(this.value).length;
    }
  
    getAsyncValue(callback: any) {
      if (this.loadedCount === this.targetCount()) {
        callback(this.value);
        return true; // returns whether the value was returned immediately
      }
      this.loadingCallbacks.push(callback);
      return false;
    }
  }
  
  export function objectMap(object: Record<string, any>, mapFn: any) {
    return Object.keys(object).reduce((result: any, key) => {
      const value = mapFn(object[key], key);
      if (value !== null) {
        result[key] = value;
      }
      return result;
    }, {});
  }
  