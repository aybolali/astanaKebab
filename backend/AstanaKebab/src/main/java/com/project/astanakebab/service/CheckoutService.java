package com.project.astanakebab.service;

import com.project.astanakebab.dto.PaymentInfo;
import com.project.astanakebab.dto.Purchase;
import com.project.astanakebab.dto.PurchaseResponse;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;


public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);

    PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException;
}
