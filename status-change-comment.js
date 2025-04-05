/**
 * @fileoverview Automatically posts comments when record status changes in Kintone
 * @author yakiimo-bsp
 * @license MIT
 */

(function () {
    "use strict";

    /**
     * @typedef {Object} StatusCondition
     * @property {string} condition - Description of the status change condition
     * @property {string} toStatusContains - String to match in the new status (case insensitive)
     * @property {string} commentText - Text to be posted as a comment
     */

    // API Configuration
    const CONFIG = {
        API: {
            ENDPOINT: '/k/v1/record/comment',
            METHOD: 'POST'
        }
    };

    /**
     * Status transition conditions and their corresponding comments
     * @type {Object.<string, StatusCondition>}
     */
    const STATUS_CONDITIONS = {
        ACCEPTED: {
            condition: 'To Accepted',
            toStatusContains: 'accepted',
            commentText: 'The status has changed to "Accepted".'
        },
        CLOSED: {
            condition: 'To Closed',
            toStatusContains: 'closed',
            commentText: 'The status has changed to "Closed".'
        }
    };

    /**
     * Posts a comment to a Kintone record
     * @param {number} appId - The ID of the Kintone app
     * @param {number} recordId - The ID of the record
     * @param {string} commentText - The text to post as a comment
     * @param {string} condition - The condition that triggered the comment
     * @returns {Promise<void>}
     * @throws {Error} When the API request fails
     */
    const postComment = async (appId, recordId, commentText, condition) => {
        const body = {
            app: appId,
            record: recordId,
            comment: {
                text: commentText
            }
        };

        try {
            await kintone.api(CONFIG.API.ENDPOINT, CONFIG.API.METHOD, body);
            console.log(`[Status Change Comment] Successfully posted comment for "${condition}"`);
        } catch (error) {
            console.error(`[Status Change Comment] Error posting comment for "${condition}":`, error);
            throw new Error(`Failed to post comment: ${error.message}`);
        }
    };

    /**
     * Event handler for status changes
     * @param {Object} event - The Kintone event object
     * @returns {Object} The event object
     */
    const handleStatusChange = async (event) => {
        const appId = kintone.app.getId();
        const recordId = event.record.$id.value;
        const newStatus = event.nextStatus.value.toLowerCase();

        try {
            await Promise.all(
                Object.entries(STATUS_CONDITIONS)
                    .filter(([_, condition]) => newStatus.includes(condition.toStatusContains))
                    .map(([_, condition]) => 
                        postComment(appId, recordId, condition.commentText, condition.condition)
                    )
            );
        } catch (error) {
            console.error('[Status Change Comment] Failed to process status change:', error);
        }

        return event;
    };

    // Register event handler
    kintone.events.on('app.record.detail.process.proceed', handleStatusChange);

})();
