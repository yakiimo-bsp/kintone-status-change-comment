(function () {
    "use strict";

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
            await kintone.api('/k/v1/record/comment', 'POST', body);
            console.log(`Comment for ${condition} has been successfully posted.`);
        } catch (error) {
            console.error(`Error posting comment for ${condition}:`, error);
        }
    };

    kintone.events.on('app.record.detail.process.proceed', async function (event) {
        const appId = kintone.app.getId(); // Get App ID
        const recordId = event.record.$id.value; // Get Record ID

        const statusMapping = [
            {
                condition: 'To Accepted by TELEHOUSE Admin',
                toStatus: 'Accepted by TELEHOUSE Admin',
                commentText: 'The status has changed to \"Accepted by TELEHOUSE Admin\".'
            },
            {
                condition: 'To Closed',
                toStatus: 'Closed',
                commentText: 'The status has changed to \"Closed\".'
            }
        ];

        for (const mapping of statusMapping) {
            if (event.nextStatus.value === mapping.toStatus) {
                await postComment(appId, recordId, mapping.commentText, mapping.condition);
            }
        }

        return event; // Always return the event
    });
})();