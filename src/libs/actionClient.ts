import { createSafeActionClient } from "next-safe-action";

export const actionClient = createSafeActionClient({
    defaultValidationErrorsShape: "flattened",

    handleServerError(e) {
        console.log(e.message);

        return e.message || 'Something went wrong';
    }
});