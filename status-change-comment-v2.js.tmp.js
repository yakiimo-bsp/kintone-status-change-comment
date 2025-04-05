
(function () {
    "use strict";

    // Constants
    const API_URL = '/k/v1/record/comment'; // Kintone API endpoint for posting comments
    const HTTP_METHOD = 'POST'; // HTTP method for API request
    const STATUS_CONDITIONS = {
        // Mapping of status transitions to comments
        // To add new conditions, insert a new object into this array
        ACCEPTED: {
            condition: 'To Accepted', // Description of the condition
            toStatusContains: 'accepted', // Checks if "accepted" is present in the new status (case insensitive)
            commentText: 'The status has changed to "Accepted".' // Comment to be posted
        },
        CLOSED: {
            condition: 'To Closed', // Description of the condition
            toStatusContains: 'closed', // Checks if "accepted" is present in the new status (case insensitive)
            commentText: 'The status has changed to "Closed".' // Comment to be posted
        }
    };

    // Utility function to post a comment
    const postComment = async (appId, recordId, commentText, condition) => {
        const body = {
            app: appId, // App ID
            record: recordId, // Record ID
            comment: {
                text: commentText
            }
        };

        try {
            await kintone.api(API_URL, HTTP_METHOD, body);
            console.log(`Comment for ${condition} has been successfully posted.`);
        } catch (error) {
            console.error(`Error posting comment for ${condition}:`, error);
        }
    };

    kintone.events.on('app.record.detail.process.proceed', async function (event) {
        const appId = kintone.app.getId(); // Get App ID
        const recordId = event.record.$id.value; // Get Record ID

        // Iterate over the defined status conditions
        for (const key in STATUS_CONDITIONS) {
            const { condition, toStatusContains, commentText } = STATUS_CONDITIONS[key];

            if (event.nextStatus.value.toLowerCase().includes(toStatusContains)) {
                await postComment(appId, recordId, commentText, condition);
            }
        }

        return event; // Always return the event
    });

})();