export const FetchInterceptor = require("fetch-interceptor");

// Register interceptor hooks
const interceptor = FetchInterceptor.register({
  onBeforeRequest(request, controller) {
    // Hook before request
    console.log("request", request);
  },
  onRequestSuccess(response, request, controller) {
    // Hook on response success
  },
  onRequestFailure(response, request, controller) {
    // Hook on response failure
  }
});
