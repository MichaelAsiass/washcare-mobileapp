import { type FunctionReference, anyApi } from "convex/server";
import { type GenericId as Id } from "convex/values";

export const api: PublicApiType = anyApi as unknown as PublicApiType;
export const internal: InternalApiType = anyApi as unknown as InternalApiType;

export type PublicApiType = {
  analytics: {
    getMRR: FunctionReference<"query", "public", Record<string, never>, any>;
    getCustomerMetrics: FunctionReference<
      "query",
      "public",
      Record<string, never>,
      any
    >;
    getRevenueTrend: FunctionReference<
      "query",
      "public",
      { months?: number },
      any
    >;
    getMembershipBreakdown: FunctionReference<
      "query",
      "public",
      Record<string, never>,
      any
    >;
    getPaymentHealth: FunctionReference<
      "query",
      "public",
      Record<string, never>,
      any
    >;
    getARPU: FunctionReference<"query", "public", Record<string, never>, any>;
  };
  businesses: {
    getForUser: FunctionReference<
      "query",
      "public",
      { userId: Id<"users"> },
      any
    >;
    getForCurrentUser: FunctionReference<
      "query",
      "public",
      Record<string, never>,
      any
    >;
    getBySlug: FunctionReference<"query", "public", { slug: string }, any>;
    getByDomain: FunctionReference<"query", "public", { domain: string }, any>;
    getBusinessLocations: FunctionReference<
      "query",
      "public",
      { businessId: Id<"businesses"> },
      any
    >;
    getBusinessById: FunctionReference<
      "query",
      "public",
      { id: Id<"businesses"> },
      any
    >;
    getAllBusinesses: FunctionReference<
      "query",
      "public",
      Record<string, never>,
      any
    >;
  };
  contactlists: {
    getContactLists: FunctionReference<
      "query",
      "public",
      { businessId: Id<"businesses"> },
      any
    >;
    getContactList: FunctionReference<
      "query",
      "public",
      { contactListId: Id<"contactLists"> },
      any
    >;
    getContactListStats: FunctionReference<
      "query",
      "public",
      { businessId: Id<"businesses"> },
      any
    >;
    createContactList: FunctionReference<
      "mutation",
      "public",
      {
        businessId: Id<"businesses">;
        customerIds: Array<Id<"customers">>;
        description?: string;
        name: string;
      },
      any
    >;
    updateContactList: FunctionReference<
      "mutation",
      "public",
      {
        contactListId: Id<"contactLists">;
        customerIds: Array<Id<"customers">>;
        description?: string;
        name: string;
      },
      any
    >;
    deleteContactList: FunctionReference<
      "mutation",
      "public",
      { contactListId: Id<"contactLists"> },
      any
    >;
    addCustomersToList: FunctionReference<
      "mutation",
      "public",
      {
        contactListId: Id<"contactLists">;
        customerIds: Array<Id<"customers">>;
      },
      any
    >;
    removeCustomersFromList: FunctionReference<
      "mutation",
      "public",
      {
        contactListId: Id<"contactLists">;
        customerIds: Array<Id<"customers">>;
      },
      any
    >;
  };
  customer: {
    getCustomer: FunctionReference<
      "query",
      "public",
      { id: Id<"customers"> },
      any
    >;
    listCustomers: FunctionReference<
      "query",
      "public",
      { businessId: Id<"businesses"> },
      any
    >;
    createCustomer: FunctionReference<
      "mutation",
      "public",
      {
        businessId: Id<"businesses">;
        clerkId: string;
        email: string;
        licensePlate: string;
        name: string;
        phone: string;
        stripeCustomerId: string;
      },
      any
    >;
    validateQRCode: FunctionReference<
      "query",
      "public",
      { qrCode: string },
      any
    >;
    logBayVisit: FunctionReference<
      "mutation",
      "public",
      {
        bayNumber?: number;
        businessId: Id<"businesses">;
        customerId: Id<"customers">;
        membershipId?: Id<"memberships">;
        wasActive: boolean;
      },
      any
    >;
    getRecentBayVisits: FunctionReference<
      "query",
      "public",
      { businessId: Id<"businesses">; limit?: number },
      any
    >;
    getBayVisitStats: FunctionReference<
      "query",
      "public",
      { businessId: Id<"businesses">; endDate?: number; startDate?: number },
      any
    >;
    updateCustomer: FunctionReference<
      "mutation",
      "public",
      { _id: Id<"customers">; email?: string; name?: string; phone?: string },
      any
    >;
    deleteCustomer: FunctionReference<
      "mutation",
      "public",
      { _id: Id<"customers"> },
      any
    >;
    updateNotificationPreferences: FunctionReference<
      "mutation",
      "public",
      {
        customerId: Id<"customers">;
        email: boolean;
        marketing: boolean;
        sms: boolean;
      },
      any
    >;
    getCustomersOptedInForSMS: FunctionReference<
      "query",
      "public",
      { businessId: Id<"businesses"> },
      any
    >;
    getCustomerWithSMSHistory: FunctionReference<
      "query",
      "public",
      { customerId: Id<"customers">; limit?: number },
      any
    >;
    exportCustomersForPOS: FunctionReference<
      "query",
      "public",
      { businessId: Id<"businesses"> },
      any
    >;
  };
  emailtemplates: {
    sendEmailBroadcast: FunctionReference<
      "action",
      "public",
      { recipients: Array<string>; subject: string; text: string },
      any
    >;
    getTemplates: FunctionReference<
      "query",
      "public",
      Record<string, never>,
      any
    >;
    createTemplate: FunctionReference<
      "mutation",
      "public",
      { html?: string; name: string; subject: string; text: string },
      any
    >;
    updateTemplate: FunctionReference<
      "mutation",
      "public",
      {
        html?: string;
        id: Id<"emailTemplates">;
        name: string;
        subject: string;
        text: string;
      },
      any
    >;
    deleteTemplate: FunctionReference<
      "mutation",
      "public",
      { id: Id<"emailTemplates"> },
      any
    >;
  };
  forms: {
    getForms: FunctionReference<"query", "public", Record<string, never>, any>;
    submitForm: FunctionReference<
      "mutation",
      "public",
      {
        businessSlug: string;
        email: string;
        ipAddress?: string;
        message: string;
        name: string;
        phone?: string;
        referrer?: string;
        subject?: string;
        userAgent?: string;
      },
      any
    >;
    updateFormStatus: FunctionReference<
      "mutation",
      "public",
      {
        formId: Id<"forms">;
        notes?: string;
        status: "submitted" | "reviewed" | "processed" | "archived";
      },
      any
    >;
    deleteForm: FunctionReference<
      "mutation",
      "public",
      { formId: Id<"forms"> },
      any
    >;
  };
  memberships: {
    getMembershipPlan: FunctionReference<
      "query",
      "public",
      { businessId: Id<"businesses">; planId: Id<"membershipPlans"> },
      any
    >;
    createMembershipPlan: FunctionReference<
      "mutation",
      "public",
      {
        billingInterval?: "monthly" | "quarterly" | "annual";
        businessId: Id<"businesses">;
        cancellationNotice?: number;
        description?: string;
        features?: Array<string>;
        isActive: boolean;
        maxVehicles?: number;
        name: string;
        price: number;
        recommendedPlan?: boolean;
        setupFee?: number;
        sortOrder?: number;
      },
      any
    >;
    getMembershipPlans: FunctionReference<
      "query",
      "public",
      { activeOnly?: boolean; businessId: Id<"businesses"> },
      any
    >;
    getMembershipPlanById: FunctionReference<
      "query",
      "public",
      { planId: Id<"membershipPlans"> },
      any
    >;
    getAuthenticatedMembershipPlans: FunctionReference<
      "query",
      "public",
      { businessId: Id<"businesses"> },
      any
    >;
    updateMembershipPlan: FunctionReference<
      "mutation",
      "public",
      {
        billingInterval?: "monthly" | "quarterly" | "annual";
        cancellationNotice?: number;
        description?: string;
        features?: Array<string>;
        isActive?: boolean;
        maxVehicles?: number;
        name?: string;
        planId: Id<"membershipPlans">;
        price?: number;
        recommendedPlan?: boolean;
        setupFee?: number;
        sortOrder?: number;
      },
      any
    >;
    deleteMembershipPlan: FunctionReference<
      "mutation",
      "public",
      { planId: Id<"membershipPlans"> },
      any
    >;
    getMembershipPlanStats: FunctionReference<
      "query",
      "public",
      { businessId: Id<"businesses"> },
      any
    >;
    createMembershipCheckout: FunctionReference<
      "action",
      "public",
      {
        cancelUrl: string;
        customerEmail: string;
        customerName: string;
        membershipId: Id<"membershipPlans">;
        successUrl: string;
      },
      any
    >;
  };
  orders: {
    createOrder: FunctionReference<
      "mutation",
      "public",
      {
        appliedGiftCardId?: Id<"giftCards">;
        appliedVoucherId?: Id<"vouchers">;
        businessId: Id<"businesses">;
        customerId: Id<"customers">;
        customerNotes?: string;
        discountCode?: string;
        items: Array<{
          addOns?: Array<{ name: string; price: number }>;
          quantity: number;
          serviceId: Id<"services">;
          specialInstructions?: string;
        }>;
        locationId?: Id<"locations">;
        orderType: "online" | "in_person" | "mobile_app";
        paymentMethod?:
          | "credit_card"
          | "debit_card"
          | "cash"
          | "gift_card"
          | "membership"
          | "fleet_account";
        scheduledTime?: number;
        vehicleInfo?: {
          color?: string;
          licensePlate: string;
          make?: string;
          model?: string;
        };
      },
      any
    >;
    getOrders: FunctionReference<
      "query",
      "public",
      {
        businessId: Id<"businesses">;
        limit?: number;
        status?:
          | "pending"
          | "confirmed"
          | "in_progress"
          | "ready"
          | "completed"
          | "cancelled"
          | "refunded";
      },
      any
    >;
    getOrderById: FunctionReference<
      "query",
      "public",
      { orderId: Id<"orders"> },
      any
    >;
    getCustomerOrders: FunctionReference<
      "query",
      "public",
      { customerId: Id<"customers">; limit?: number },
      any
    >;
    updateOrderStatus: FunctionReference<
      "mutation",
      "public",
      {
        changedBy?: Id<"users">;
        note?: string;
        orderId: Id<"orders">;
        status:
          | "pending"
          | "confirmed"
          | "in_progress"
          | "ready"
          | "completed"
          | "cancelled"
          | "refunded";
      },
      any
    >;
    updatePaymentStatus: FunctionReference<
      "mutation",
      "public",
      {
        orderId: Id<"orders">;
        paymentStatus:
          | "pending"
          | "paid"
          | "partially_paid"
          | "refunded"
          | "failed";
        stripePaymentIntentId?: string;
      },
      any
    >;
    getOrderStats: FunctionReference<
      "query",
      "public",
      { businessId: Id<"businesses">; endDate?: number; startDate?: number },
      any
    >;
    getRevenueOverTime: FunctionReference<
      "query",
      "public",
      { businessId: Id<"businesses">; days?: number },
      any
    >;
    cancelOrder: FunctionReference<
      "mutation",
      "public",
      { changedBy?: Id<"users">; orderId: Id<"orders">; reason?: string },
      any
    >;
    getTransactionEvents: FunctionReference<
      "query",
      "public",
      {
        businessId: Id<"businesses">;
        endDate?: number;
        limit?: number;
        startDate?: number;
        status?: "paid" | "failed" | "pending" | "refunded";
        type?: "subscription" | "one_time" | "upgrade" | "downgrade";
      },
      any
    >;
    getTransactionStats: FunctionReference<
      "query",
      "public",
      { businessId: Id<"businesses">; endDate?: number; startDate?: number },
      any
    >;
  };
  sendemails: {
    getCustomerEmailHistory: FunctionReference<
      "query",
      "public",
      { customerId: Id<"customers">; limit?: number },
      any
    >;
    getEmailHistory: FunctionReference<
      "query",
      "public",
      { businessId: Id<"businesses">; limit?: number },
      any
    >;
    sendBroadcast: FunctionReference<
      "action",
      "public",
      {
        campaignId?: Id<"campaigns">;
        html?: string;
        recipients: Array<string>;
        subject: string;
        text?: string;
      },
      any
    >;
    sendEmail: FunctionReference<
      "action",
      "public",
      {
        campaignId?: Id<"campaigns">;
        customerId?: Id<"customers">;
        html?: string;
        orderId?: Id<"orders">;
        subject: string;
        text?: string;
        to: string;
      },
      any
    >;
  };
  services: {
    createService: FunctionReference<
      "mutation",
      "public",
      {
        availableAddOns?: Array<{
          description?: string;
          name: string;
          price: number;
        }>;
        availableLocations?: Array<Id<"locations">>;
        businessId: Id<"businesses">;
        description?: string;
        features?: Array<string>;
        imageUrl?: string;
        isActive: boolean;
        isAvailableOnline: boolean;
        name: string;
        price: number;
        sortOrder?: number;
      },
      any
    >;
    getServices: FunctionReference<
      "query",
      "public",
      {
        activeOnly?: boolean;
        businessId: Id<"businesses">;
        onlineOnly?: boolean;
      },
      any
    >;
    getServiceById: FunctionReference<
      "query",
      "public",
      { serviceId: Id<"services"> },
      any
    >;
    getAuthenticatedServices: FunctionReference<
      "query",
      "public",
      { businessId: Id<"businesses">; locationId?: Id<"locations"> },
      any
    >;
    updateService: FunctionReference<
      "mutation",
      "public",
      {
        availableAddOns?: Array<{
          description?: string;
          name: string;
          price: number;
        }>;
        availableLocations?: Array<Id<"locations">>;
        description?: string;
        features?: Array<string>;
        imageUrl?: string;
        isActive?: boolean;
        isAvailableOnline?: boolean;
        name?: string;
        price?: number;
        serviceId: Id<"services">;
        sortOrder?: number;
      },
      any
    >;
    deleteService: FunctionReference<
      "mutation",
      "public",
      { serviceId: Id<"services"> },
      any
    >;
    createServiceCheckout: FunctionReference<
      "action",
      "public",
      {
        cancelUrl: string;
        customerEmail: string;
        customerName: string;
        quantity?: number;
        serviceId: Id<"services">;
        successUrl: string;
      },
      any
    >;
    getServicesByLocation: FunctionReference<
      "query",
      "public",
      { businessId: Id<"businesses">; locationId: Id<"locations"> },
      any
    >;
    bulkUpdatePrices: FunctionReference<
      "mutation",
      "public",
      {
        businessId: Id<"businesses">;
        updates: Array<{ newPrice: number; serviceId: Id<"services"> }>;
      },
      any
    >;
    reorderServices: FunctionReference<
      "mutation",
      "public",
      {
        serviceOrders: Array<{ serviceId: Id<"services">; sortOrder: number }>;
      },
      any
    >;
  };
  sms: {
    createTemplate: FunctionReference<
      "mutation",
      "public",
      { message: string; name: string },
      any
    >;
    deleteTemplate: FunctionReference<
      "mutation",
      "public",
      { id: Id<"smsTemplates"> },
      any
    >;
    getCustomerSMSHistory: FunctionReference<
      "query",
      "public",
      { customerId: Id<"customers">; limit?: number },
      any
    >;
    getSMSHistory: FunctionReference<
      "query",
      "public",
      { businessId: Id<"businesses">; limit?: number },
      any
    >;
    getSMSUsage: FunctionReference<
      "query",
      "public",
      { businessId: Id<"businesses"> },
      any
    >;
    getTemplates: FunctionReference<
      "query",
      "public",
      Record<string, never>,
      any
    >;
    listAllTwilioMessages: FunctionReference<
      "query",
      "public",
      Record<string, never>,
      any
    >;
    listIncomingMessages: FunctionReference<
      "query",
      "public",
      Record<string, never>,
      any
    >;
    listOutgoingMessages: FunctionReference<
      "query",
      "public",
      Record<string, never>,
      any
    >;
    sendSMS: FunctionReference<
      "action",
      "public",
      {
        campaignId?: Id<"campaigns">;
        customerId?: Id<"customers">;
        message: string;
        orderId?: Id<"orders">;
        to: string;
      },
      any
    >;
    updateSMSQuota: FunctionReference<
      "mutation",
      "public",
      { businessId: Id<"businesses">; newQuota: number },
      any
    >;
  };
  smstemplates: {
    getTemplates: FunctionReference<
      "query",
      "public",
      Record<string, never>,
      any
    >;
    createTemplate: FunctionReference<
      "mutation",
      "public",
      { message: string; name: string },
      any
    >;
    deleteTemplate: FunctionReference<
      "mutation",
      "public",
      { id: Id<"smsTemplates"> },
      any
    >;
  };
  stripe: {
    createCheckoutSession: FunctionReference<
      "action",
      "public",
      {
        businessId: Id<"businesses">;
        cancelUrl: string;
        email: string;
        successUrl: string;
      },
      any
    >;
    createMembershipCheckout: FunctionReference<
      "action",
      "public",
      {
        cancelUrl: string;
        customerEmail: string;
        customerName: string;
        membershipId: Id<"memberships">;
        successUrl: string;
      },
      any
    >;
    createMembershipPaymentIntent: FunctionReference<
      "action",
      "public",
      { customerEmail: string; membershipId: Id<"memberships"> },
      any
    >;
    createOrderCheckout: FunctionReference<
      "action",
      "public",
      {
        cancelUrl: string;
        customerEmail: string;
        customerName: string;
        orderId: Id<"orders">;
        successUrl: string;
      },
      any
    >;
    createOrderPaymentIntent: FunctionReference<
      "action",
      "public",
      { customerEmail: string; orderId: Id<"orders"> },
      any
    >;
    createPortalSession: FunctionReference<
      "action",
      "public",
      { stripeCustomerId: string },
      any
    >;
  };
  users: {
    getCurrent: FunctionReference<"query", "public", any, any>;
    getUserByClerkId: FunctionReference<
      "query",
      "public",
      { clerkId: string },
      any
    >;
  };
  vouchers: {
    createVoucher: FunctionReference<
      "action",
      "public",
      {
        businessId: Id<"businesses">;
        code: string;
        discountType: "percentage" | "fixed";
        discountValue: number;
        duration: "once" | "forever" | "repeating";
        durationInMonths?: number;
        maxRedemptions?: number;
      },
      any
    >;
    getVouchers: FunctionReference<
      "query",
      "public",
      { businessId: Id<"businesses"> },
      any
    >;
    deleteVoucher: FunctionReference<
      "mutation",
      "public",
      { voucherId: Id<"vouchers"> },
      any
    >;
    updateVoucherRedemptions: FunctionReference<
      "mutation",
      "public",
      { stripeCouponId: string; timesRedeemed: number },
      any
    >;
    updatePromotionCode: FunctionReference<
      "action",
      "public",
      { promotionCodeId: string; updates: { active?: boolean } },
      any
    >;
    getPromotionCode: FunctionReference<
      "action",
      "public",
      { promotionCodeId: string },
      any
    >;
    listPromotionCodes: FunctionReference<
      "action",
      "public",
      { couponId: string },
      any
    >;
  };
};
export type InternalApiType = {};
