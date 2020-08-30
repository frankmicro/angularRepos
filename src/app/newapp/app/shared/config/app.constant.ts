export const Endpoints = {
    "systemCheck": "systemcheck",
    /**
     * auth
     */
    "signIn": "login",
    "refreshToken": "refresh",
    "authenticateMe": "authenticate/me",
    "logout": "logout",
    "loginOtp": 'login-otp',
    "verifyOtp": 'verify-otp',

    /**
     * auth by collection gateway
     */
    "signInGateway": "subusers/login",
    "refreshTokenGateway": "subusers/refresh",
    "authenticateMeGateway": "subusers/authenticate/me",
    "loginOtpGateway": 'subusers/send-otp',
    "verifyOtpGateway": 'subusers/login',
    "logoutGateway": "subusers/logout",

    /**
     * collections
     */
    "collection": "collections",
    "collection_crn": "collection-crn/",
    "loansDetailByUserRefNo": "collections/loan-details/",
    "collectionHistoryByCollectionRefNo": "collections/loan-history/",
    "dispositionAdd": "collections/disposition/add",
    "nextAction": "collections/next-action",
    "fetchCallComments": "comments/list-all/",
    "addCollectionComment": "collections/comments/add",
    "addAdditionalContactInfo": "additional/contact-info",
    "getAdditionalInfo": "additional/contact-info/list/",
    /**
     * download documents
     */
    "downloadCollectionCsv": "download/collection-call",
    "uploadCallerDocument": "upload/caller-document",
    "uploadAgencyCasesDocument": "upload/agency-cases-document",
    "uploadKoinoCallerDocument": "upload/caller-koino-document",
    "uploadEfaCallerDocument": "upload/efa-caller-document",
    "downloadCallerDocument": "download/caller-document",
    "download_collection_callers": "download/collection-callers",
    "download_collection_fos_callers": "download/collection-fos-callers",
    "download_collection_tl_callers": "download/collection-tl-callers",
    "download_collection_fos_tl_callers": "download/collection-fos-tl-callers",
    "download_collection_cases": "download/collection-cases",
    "download_agency_collection_cases": "download/agency-collection-cases",
    "download_efa_collection_cases": "download/efa-collection-cases",
    "download_collection_call": "download/collection-call",
    "downloadFlipkartReport": "download/efa-users-missing-sku-data",
    "download_koino_collection_cases": "download/koino-collection-cases",
    "myagentslist": "my-agents-list",
    /**
     * users data
     */
    "exotel_call": "kaleyra/call",
    "customerDocuments": "documents/list-all/",
    "cibilAddress": "cibil-address/",
    "send_payment_link": "send-payment-link_new",
    "send_bank_details": "send-bank-details",
    "ptp_fails": "collections/ptp/fails",
    "user_contact_list": "user/contact-list/",
    "customerAddress": "addresses-all",
    "alternate_contact": "user/add-alternate-contact",
    "getUserAlternateContact": "user/alt_contact_list/",
    /**
     * Allocation Mapping
     */
    "allocation_dashboard_data": "collections/mapping/list",
    "send_allocation_data": "collections/mapping",
    "allocation_users_list": "collections/mapping/list-all",
    "send_collection_allocation": "collections/update/mapping",
    "send_collection_deallocation": "collections/deallocate/mapping",
    "disposition_history_list": "collections/disposition/agent-history",
    "dailyDispositionHistory": "collections/disposition/daily-agent-history-panel",
    "efaDispositionHistory": "collections/disposition/efa-daily-agent-history",
    "allocationConfig": "collections/allocation/config",
    "updateAllocationconfig": "allocation_config/update/",
    "addAllocationconfig":"allocation_config/add",

    /**
     * Subuser management
     */
    "subusers": "subusers",
    "addsubuser": "subusers/create",
    "editsubuser": "subusers/update/",
    "subuserDetails": "subusers/details/",
    "subuserSetAuto": "subusers/set-auto-flag",
    "agencylist": "agencylist",
    "tllist": "tllist",
    "unlinkIMEI": "subusers/unlink-imei",
    "allroles": "allroles",
    "userImeiList": "user/imei-dedupe-tree",
    "userCallLog": "user_call_log",
    "subUserPerformance": "subusers/performance/",
    "userPerformance": "subusers/dashboard/",
    "changeAvailability": "subusers/change-availability-status",
    "changeLanguage": "collections/change_language",
    "my_agents":"subusers/my-agents",
    "block_agent":"subusers/block-agent",
    "get_sub_user_name":"sub-user/get-user-name",
    "get_loan_ref_number":"get-loan-reference-number",
    "get_loan_ref_number_export":"export-allocated-cases",
    "reallocate_loan_cases":"reallocate-loan-cases/",

    "subuserBucketList": "sub-user-buckets-list",


    /**
     * Collection v2 endpoints
     */
    "collection_v2": "v2/collections",
    "download_collections": "v2/download-collections",
    "send_efa_payment_link": "send-efa-payment-link",
    "loansDetailByUserRefNo_v2": "collections_v2/loan-details/",
    "collectionHistoryByCollectionRefNo_v2": "collections_v2/loan-history/",
    "dispositionAdd_v2": "collections_v2/disposition/add",
    "nextaction_v2": "collections_v2/next-action",
    "addAdditionalContactInfo_v2": "additional/contact-info_v2",
    "getAdditionalInfo_v2": "additional/contact-info_v2/list/",
    "customerAddressefa": "addresses-all-efa",
    "ptp_fails_v2": "v2/collections/ptp/fails",
    "addCollectionComment_v2": "collections/comments/createGeneralComment",

    /**
     * REPORTS
     */
    "data_reports": "reports/data/", //api/reports/data/subuser_id 
    "downloadReports": "reports/download/", // {{COLLECTION_URL}}/api/reports/download/42
    "downloadReportsPost": "reports/download_with_filters",


    /**
     * FORECLOSURE endpoints
     */
    "foreclosure_get_details": "collections/foreclosure/get-details",
    "foreclosure_send_link": "collections/foreclosure/send-payment-link_new",

    /**
     * Invoice Repayments
     */
    "loanRepaymentsDetails": 'collections/loan/monthly_invoice',
    "sendEmailInvoice": "collections/loan/send_invoice",

    /**
     * @author Ashish yadav
     * fetch token from redis 
     */
    "getRedisInfo": 'getRedisInfo',
    "sendSnoozePaymentLink": "send-snooze-payment-link_new",
    "downloadkoinotemplate": "download/koino-template",
    "downloadQuickLoantemplate": "download/quick-loan-template",
    "downloadAgencyCaseAllocationTemplate": "download/agency-case-allocation-template",
    "getStarContactOfCutomer": 'get_star_contact/',
    "updateStarStatus": 'star_unstar_contact',
    "uploaddisposition": 'upload/addDisposition',
    "uploadPaceCaller": 'collections/assign-pacecaller-case',
    "downloadDispositiontemplate": 'download/disposition-template',
    "vendorAllocation": 'upload/vendorAllocation',
    "downloadVendorAllocationtemplate": 'download/vendor-allocation-template',
    "campaignCasesUpload": 'upload/campaign-upload-cases',
    "downloadCampaignCasesUploadTemplate": 'download/campaign-cases-upload-template',
    "downloadPredictiveCasesUploadTemplate": 'download/predictive-cases-upload-template',
    "prdictiveCasesUpload": 'upload/predictive-upload-cases',

    /**
    * Autodialer
    */
    "autoDialerLogin": "v1/autodialer/login",
    "autoDialerSync": "v1/autodialer/sync-process",
    "clickToCall": "v1/autodialer/click-to-call",
    "resync_to_dialer":"v1/autodialer/resync-leads",

    /**
    * Voitekk info
    */
    "getVoitekkInfo":"v2/collections_v2/get-voitekk-info",
    "getDialerInfo":"v1/autodiler/get-dialer-info",

    /**
     * Skip search
     */
     "getUserDataByReferenceNo":"skip-search/get-userdata/",
     "getSelfSearchList":"skip-search/self-list",
     "getRelativeSearchList":"skip-search/relative-list",
     "getLocationList":"skip-search/location-list",

    /** 
    * User Contact List
    */
    "fetchContacts":"getcontactlist",
    "downloadContactListTemplate":"download/Contact-list-template",

    /**
     * Seemless Agents
     */
     "getPreCreateAgents":"v1/autodiler/agent-precreate-details/",
     "postAutoDialerRegister":"v1/autodiler/register",


     "sendCampaignPaymentLink": "loans/campaign-payment-link",
     "sendGooglePaymentLink":"payments/gpay-request",
     "getOffers": "users/get-offers",

     "restructe_detail" :"/restructuring-details",
     "settlement_detail":"/settlement-details",
     "emaiHoliday_detail":"/emi-holiday",

     "upload_ivr_report" : "upload/ivr_response_data",
     "ivr_data":"users/ivr_response/",

     "dues_waiver_v2": "collections_v2/dues_waiver",

}