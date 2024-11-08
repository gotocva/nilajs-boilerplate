import Events from "../common/Events";
import EventPolicy from "../policies/EventPolicy";

/**
 * 
 */
EventPolicy.onEvent(Events.USER_ACCOUNT_REGISTER_EVENT, (data) => {
    // TODO: send welcome email to the user from data
});